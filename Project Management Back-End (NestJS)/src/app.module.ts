import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { AccountModule } from './account/account.module';
import { AccountService } from './account/account.service';
import { AccountController } from './account/account.controller';
import { ProjectModule } from './project/project.module';
import { ProjectService } from './project/project.service';
import { Project } from './entities/project.entity';
import { ProjectController } from './project/project.controller';
import { TaskModule } from './task/task.module';
import { TaskController } from './task/task.controller';
import { TaskService } from './task/task.service';
import { Task } from './entities/task.entity';
import { EventModule } from './event/event.module';
import { Invite } from './entities/invite.entity';
import { Event } from './entities/event.entity';
import { EventController } from './event/event.controller';
import { EventService } from './event/event.service';
import { InviteModule } from './invite/invite.module';
import { InviteController } from './invite/invite.controller';
import { InviteService } from './invite/invite.service';
import { MembershipModule } from './membership/membership.module';
import { MembershipService } from './membership/membership.service';
import { MembershipController } from './membership/membership.controller';
import { Membership } from './entities/membership.entity';
import { CommenteventModule } from './commentevent/commentevent.module';
import { Commentevent } from './entities/commentevent.entity';
import { CommenteventController } from './commentevent/commentevent.controller';
import { CommentEventService } from './commentevent/commentevent.service';
import { CommenttaskModule } from './commenttask/commenttask.module';
import { Commenttask } from './entities/commenttask.entity';
import { CommenttaskController } from './commenttask/commenttask.controller';
import { CommentTaskService } from './commenttask/commenttask.service';
import { FileModule } from './file/file.module';
import { File } from './entities/file.entity';
import { FileController } from './file/file.controller';
import { FileService } from './file/file.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type:"postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "admin",
      database: "management-db",
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
      keepConnectionAlive:false
    }),
    TypeOrmModule.forFeature([Account,Project,Task,Event,Invite,Membership,Commentevent,Commenttask,File])
  ],
  controllers: [AppController,AccountController,ProjectController,TaskController,EventController,InviteController,MembershipController,CommenteventController,CommenttaskController,FileController],
  providers: [AppService,AccountService,ProjectService,TaskService,EventService,InviteService,MembershipService,CommentEventService,CommentTaskService,FileService],
})
export class AppModule {}
