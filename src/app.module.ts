import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FirebaseModule } from 'nestjs-firebase';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './app/auth/auth.module';
import { GuardAuthModule } from './app/auth/guards/guard-auth.module';
import { FlowchartModule } from './app/flowchart/flowchart.module';
import { OrganizationModule } from './app/organization/organization.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    FirebaseModule.forRoot({
      googleApplicationCredential: 'firebase.config.json',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.PMA_HOST,
      port: 3306,
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      logging: process.argv.includes('--log-db'),
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    GuardAuthModule,
    FlowchartModule,
    OrganizationModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
