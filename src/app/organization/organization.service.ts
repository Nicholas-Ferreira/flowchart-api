import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Organization } from 'src/shared/entities/organization.entity';
import { User } from 'src/shared/entities/user.entity';
import { Repository } from 'typeorm';
import { AddUserDto } from './dto/add-user.dto';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';

@Injectable()
export class OrganizationService {
  constructor(
    @InjectRepository(Organization)
    private readonly organizationRepository: Repository<Organization>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createOrganizationForAdmin(
    user: User,
    createOrganizationDto: CreateOrganizationDto,
  ): Promise<Organization> {
    const organization = this.organizationRepository.create({
      ...createOrganizationDto,
      ownerUser: user,
      members: [user],
    });

    return this.organizationRepository.save(organization);
  }

  async findAll(user: User): Promise<Organization[]> {
    return this.organizationRepository
      .createQueryBuilder('organization')
      .innerJoin('organization.members', 'members', 'members.id = :userId', { userId: user.id })
      .getMany();
  }

  async findOne(id: string): Promise<Organization> {
    const organization = await this.organizationRepository.findOne({
      where: { id },
      relations: ['members'],
    });

    return organization;
  }

  async update(
    user: User,
    id: string,
    updateOrganizationDto: UpdateOrganizationDto,
  ): Promise<Organization> {
    const organization = await this.organizationRepository.findOne({
      where: { id },
      relations: ['ownerUser'],
    });
    if (!organization) throw new NotFoundException('Organization not found');

    if (organization.ownerUser.id !== user.id)
      throw new UnauthorizedException('Only the owner can update the organization');

    Object.assign(organization, updateOrganizationDto);
    return this.organizationRepository.save(organization);
  }

  async deleteOrganization(user: User, id: string): Promise<void> {
    const organization = await this.organizationRepository.findOne({
      where: { id },
      relations: ['ownerUser'],
    });

    if (!organization) throw new NotFoundException('Organization not found');

    if (organization.ownerUser.id !== user.id)
      throw new UnauthorizedException('Only the owner can delete the organization');

    await this.organizationRepository.remove(organization);
  }

  async addUserToOrganization(
    organizationId: string,
    addUserDto: AddUserDto,
  ): Promise<Organization> {
    const organization = await this.organizationRepository.findOne({
      where: { id: organizationId },
      relations: ['members', 'ownerUser'],
    });
    if (!organization) throw new NotFoundException('Organization not found');

    const user = await this.userRepository.findOne({ where: { email: addUserDto.email } });
    if (!user) throw new NotFoundException('User not found');

    const isMember = organization.members.some((orgUser) => orgUser.id === user.id);
    if (isMember) throw new UnauthorizedException('User is already a member of the organization');

    organization.members.push(user);
    return this.organizationRepository.save(organization);
  }

  async leaveOrganization(user: User, organizationId: string): Promise<void> {
    const organization = await this.organizationRepository.findOne({
      where: { id: organizationId },
      relations: ['members', 'ownerUser'],
    });
    if (!organization) throw new NotFoundException('Organization not found');

    if (organization.ownerUser.id === user.id)
      throw new UnauthorizedException('Admin cannot leave the organization');

    organization.members = organization.members.filter((orgUser) => orgUser.id !== user.id);
    await this.organizationRepository.save(organization);
  }
}
