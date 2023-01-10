import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
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
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  loaded = false
  memberships: any[];
  taskSelected=false;
  selectedTask=null;
  events:any[] = [];
  selectedEvent:any= [];
  selectedEventId:any = 0;
  isSelected = false;
  tasks:any = [];
  doneTasks:any[] = [];
  account_id:Number;
  doneProjects:any[]=[]
  constructor(
    private eventService:EventService,
    private _sharedService:SharedService,
    private membershipService:MembershipService,
    private router:Router,
    private route: ActivatedRoute,
    private _snackBar:MatSnackBar
  ) { }

  async ngOnInit() {
    this.account_id = await this._sharedService.getAccountID();
    await this.membershipService.readMemberships(this.account_id).then((result:any)=>{
      this.memberships = result.filter(x=>x.project_status == "Done")
      this.setTasks(result)
    }).catch((err) => { 
      this._snackBar.open("Database Error", 'OK', {
        duration: 3000
      })
    });
    await this.eventService.readInvitedEvents(this.account_id).then((result:any)=>{
      this.events = result.filter(x => new Date(x.event_end) < new Date()).sort((a, b) => -a.event_date.localeCompare(b.event_date) || b.event_id - a.event_id);
    }).catch((err) => { 
      this._snackBar.open("Database Error", 'OK', {
        duration: 3000
      })
    });
    setTimeout(()=> {
      this.loaded = true;
    },500)
  }
  openTask(task:any,drawer:MatDrawer){
    this.isSelected = false
    this.selectedEvent = [];
    this.taskSelected = true;
    this.selectedTask = task;
    drawer.open()
  }

  openEvent(event:any,drawer:MatDrawer){
    this.taskSelected = false;
    this.selectedTask = null;
    this.selectedEvent = event
    this.isSelected = true;
    drawer.open()
  }

  async setTasks(projects){
    this.tasks = [];
    projects.forEach(element => {
      this.tasks = this.tasks.concat(element.project_tasks.filter(x => x.assigned_to == this.account_id && x.task_status == "Done"))
    });
  }
  setNoSelected(){
    this.taskSelected = false;
    this.selectedTask = null;
  }
}
