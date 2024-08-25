import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FlowchartModule } from './flowchart/flowchart.module';
import { ProjectModule } from './project/project.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: ':memory:',
      dropSchema: true,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    ProjectModule,
    FlowchartModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
