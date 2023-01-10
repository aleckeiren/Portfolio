import { Module } from '@nestjs/common';
import { MembershipService } from './membership.service';
import { MembershipController } from './membership.controller';
import { ProjectModule } from 'src/project/project.module';
import { AccountModule } from 'src/account/account.module';

@Module({
  providers: [MembershipService],
  controllers: [MembershipController],
  imports:[ProjectModule,AccountModule]
})
export class MembershipModule {}
