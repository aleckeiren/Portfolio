import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { AccountModule } from 'src/account/account.module';

@Module({
  providers: [TaskService],
  controllers: [TaskController],
  exports:[TaskService],
  imports:[AccountModule]
})
export class TaskModule {}
