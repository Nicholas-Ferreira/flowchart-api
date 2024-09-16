import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/shared/entities/user.entity';
import { IsMemberOfOrganizationGuard } from 'src/shared/guards/is-member.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { AddUserDto } from './dto/add-user.dto';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { OrganizationService } from './organization.service';

@UseGuards(AuthGuard(), IsMemberOfOrganizationGuard)
@Controller('organization')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @Post()
  async create(
    @GetUser() user: User,
    @Body() createOrganizationDto: CreateOrganizationDto,
  ): Promise<any> {
    return this.organizationService.createOrganizationForAdmin(user, createOrganizationDto);
  }

  @Get()
  findAll(@GetUser() user: User) {
    return this.organizationService.findAll(user);
  }

  @Get(':organizationId')
  findOne(@Param('organizationId') organizationId: string) {
    return this.organizationService.findOne(organizationId);
  }

  @Patch(':organizationId')
  update(
    @GetUser() user: User,
    @Param('organizationId') organizationId: string,
    @Body() updateOrganizationDto: UpdateOrganizationDto,
  ) {
    return this.organizationService.update(user, organizationId, updateOrganizationDto);
  }

  @Delete(':organizationId')
  async delete(
    @GetUser() user: User,
    @Param('organizationId') organizationId: string,
  ): Promise<void> {
    return this.organizationService.deleteOrganization(user, organizationId);
  }

  @Post(':organizationId/leave')
  async leave(
    @GetUser() user: User,
    @Param('organizationId') organizationId: string,
  ): Promise<void> {
    return this.organizationService.leaveOrganization(user, organizationId);
  }

  @Post(':organizationId/member')
  async addUserToOrganization(
    @Param('organizationId') organizationId: string,
    @Body() addUserDto: AddUserDto,
  ): Promise<any> {
    return this.organizationService.addUserToOrganization(organizationId, addUserDto);
  }
}
