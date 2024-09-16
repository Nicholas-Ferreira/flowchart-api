import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FirebaseAuthService } from 'src/provider/firebase/firebase-auth.service';
import { User } from 'src/shared/entities/user.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [FirebaseAuthService, AuthService],
})
export class AuthModule {}
