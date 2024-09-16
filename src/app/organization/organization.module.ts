import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organization } from 'src/shared/entities/organization.entity';
import { User } from 'src/shared/entities/user.entity';
import { OrganizationController } from './organization.controller';
import { OrganizationService } from './organization.service';

@Module({
  imports: [TypeOrmModule.forFeature([Organization, User])],
  providers: [OrganizationService],
  controllers: [OrganizationController],
})
export class OrganizationModule {}
