import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';

@Module({
  providers: [EventService],
  controllers: [EventController],
  exports:[EventService]
})
export class EventModule {}
