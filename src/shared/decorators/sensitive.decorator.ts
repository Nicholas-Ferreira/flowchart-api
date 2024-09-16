import 'reflect-metadata';

export const SENSITIVE_METADATA_KEY = 'sensitiveFields';

export function Sensitive(): PropertyDecorator {
  return (target: object, propertyKey: string | symbol) => {
    const existingSensitiveFields = Reflect.getMetadata(SENSITIVE_METADATA_KEY, target) || [];

    Reflect.defineMetadata(
      SENSITIVE_METADATA_KEY,
      [...existingSensitiveFields, propertyKey],
      target,
    );
  };
}
