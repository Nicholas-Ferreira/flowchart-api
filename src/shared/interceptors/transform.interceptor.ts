import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SENSITIVE_METADATA_KEY } from '../decorators/sensitive.decorator';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(map((data) => this.filterSensitiveFields(data)));
  }

  private filterSensitiveFields(data: any) {
    if (Array.isArray(data)) {
      // Se for um array, aplica o filtro em cada objeto do array
      return data.map((item) => this.filterSensitiveObject(item));
    } else if (typeof data === 'object' && data !== null) {
      // Se for um objeto, aplica o filtro diretamente
      return this.filterSensitiveObject(data);
    }
    // Se não for um objeto ou array, retorna o dado como está
    return data;
  }

  private filterSensitiveObject(obj: any) {
    const objPrototype = Object.getPrototypeOf(obj);
    const sensitiveFields: (string | symbol)[] =
      Reflect.getMetadata(SENSITIVE_METADATA_KEY, objPrototype) || [];

    // Verificar se obj é uma instância de uma classe ou não
    const filteredObj = plainToInstance(objPrototype.constructor, obj);

    // Remover campos sensíveis
    sensitiveFields.forEach((field) => {
      delete filteredObj[field];
    });

    // Verificar e filtrar campos aninhados (como `members`)
    Object.keys(filteredObj).forEach((key) => {
      if (Array.isArray(filteredObj[key])) {
        filteredObj[key] = this.filterSensitiveFields(filteredObj[key]);
      } else if (typeof filteredObj[key] === 'object' && filteredObj[key] !== null) {
        filteredObj[key] = this.filterSensitiveObject(filteredObj[key]);
      }
    });

    return filteredObj;
  }
}
