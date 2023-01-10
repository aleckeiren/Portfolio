import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AccountService } from 'src/app/lib/account.service';
import { EventService } from 'src/app/lib/event.service';
import { MembershipService } from 'src/app/lib/membership.service';
import { AccountPipe } from 'src/app/lib/pipes/account-pipe';
import { NiceDatePipe } from 'src/app/lib/pipes/niceDate-pipe';
import { ProjectPipe } from 'src/app/lib/pipes/project-pipe';
import { ProjectService } from 'src/app/lib/project.service';
import { SharedService } from 'src/app/lib/shared.service';
import { TaskService } from 'src/app/lib/task.service';
import { EventInfoComponent } from '../events/event-info/event-info.component';
import { ManagementComponent } from '../management.component';
import { TaskInfoComponent } from '../projects/project-info/task-info/task-info.component';

@Component({
  standalone:true,
  imports:[ManagementComponent,IonicModule,HttpClientModule, CommonModule,RouterModule,ProjectPipe,AccountPipe,MatSidenavModule,TaskInfoComponent,EventInfoComponent,NiceDatePipe,DatePipe],
  providers:[AccountService,ProjectService,TaskService,EventService,MembershipService,NiceDatePipe,DatePipe],
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  account_id:Number;
  events:any[] = [];
  events_ongoing:any[] =[];
  events_upcoming:any[] = [];
  events_done:any[] = [];
  loaded = false;
  selectedEvent:any= [];
  isSelected = false;
  constructor(
    private eventService:EventService,
    private _sharedService:SharedService,
    private membershipService:MembershipService,
    private _snackBar: MatSnackBar
  ) { }

  async ngOnInit() {
    this.account_id = await this._sharedService.getAccountID();
    await this.eventService.readInvitedEvents(this.account_id).then((result:any)=>{
      this.events = result;
      this.events_ongoing = result.filter(x => new Date(x.event_end) > new Date() && new Date(x.event_date) < new Date()).sort((a, b) => -a.event_end.localeCompare(b.event_end) || b.event_id - a.event_id);
      this.events_upcoming = result.filter(x => new Date(x.event_date) > new Date()).sort((a, b) => -a.event_date.localeCompare(b.event_date) || b.event_id - a.event_id);
      this.events_done = result.filter(x => new Date(x.event_end) < new Date()).sort((a, b) => -a.event_end.localeCompare(b.event_end) || b.event_id - a.event_id);
    }).catch((err) => { 
      this._snackBar.open("Database Error", 'OK', {
        duration: 3000
      })
    });
    setTimeout(()=> {
      this.loaded = true;
    },500)
  }
  openEvent(event:any,drawer:MatDrawer){
    this.selectedEvent = event
    this.isSelected = true;
    drawer.open()
  }
  setNoSelected(){
    this.isSelected = false;
  }
}
