import { Module } from '@nestjs/common';
import { CommentTaskService } from './commenttask.service';
import { CommenttaskController } from './commenttask.controller';

@Module({
  providers: [CommentTaskService],
  controllers: [CommenttaskController],
  exports:[CommentTaskService]
})
export class CommenttaskModule {}
