import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Organization } from '../entities/organization.entity';
import { User } from '../entities/user.entity';

@Injectable()
export class IsMemberOfOrganizationGuard implements CanActivate {
  private logger: Logger = new Logger(IsMemberOfOrganizationGuard.name);

  constructor(
    @InjectRepository(Organization)
    private readonly organizationRepository: Repository<Organization>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user: User = request.user;
    const organizationId = request.params.organizationId;
    if (!organizationId) {
      this.logger.warn('Organization param undefined');
      return true;
    }

    const organization = await this.organizationRepository.findOne({
      where: { id: organizationId },
      relations: ['ownerUser', 'members'],
    });
    if (!organization) throw new NotFoundException('Organization not found');

    const isMember =
      organization.members.some((orgUser) => orgUser.id === user.id) ||
      organization.ownerUser.id === user.id;

    if (!isMember) {
      throw new UnauthorizedException('User does not belong to this organization');
    }

    return true;
  }
}
