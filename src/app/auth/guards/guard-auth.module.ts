import { Global, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/shared/entities/user.entity';
import { FirebaseAuthStrategy } from './firebase.strategy';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'firebase-jwt' }),
  ],
  providers: [FirebaseAuthStrategy],
  exports: [PassportModule],
})
export class GuardAuthModule {}
