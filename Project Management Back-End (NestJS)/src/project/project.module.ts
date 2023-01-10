import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { TaskModule } from 'src/task/task.module';
import { AccountModule } from 'src/account/account.module';

@Module({
  providers: [ProjectService],
  controllers: [ProjectController],
  exports:[ProjectService],
  imports:[TaskModule,AccountModule]
})
export class ProjectModule {}
