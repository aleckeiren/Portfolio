import { Module } from '@nestjs/common';
import { CommentEventService } from './commentevent.service';
import { CommenteventController } from './commentevent.controller';

@Module({
  providers: [CommentEventService],
  controllers: [CommenteventController],
  exports:[CommentEventService]
})
export class CommenteventModule {}
