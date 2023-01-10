import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AccountService } from 'src/app/lib/account.service';
import { EventService } from 'src/app/lib/event.service';
import { MembershipService } from 'src/app/lib/membership.service';
import { ProjectPipe } from 'src/app/lib/pipes/project-pipe';
import { ProjectService } from 'src/app/lib/project.service';
import { SharedService } from 'src/app/lib/shared.service';
import { TaskService } from 'src/app/lib/task.service';
import { ManagementComponent } from '../management.component';
import { SummaryCardComponent } from '../shared/summary-card/summary-card.component';
import { Membership } from 'src/app/entities/membership';
import { AccountPipe } from 'src/app/lib/pipes/account-pipe';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { TaskInfoComponent } from '../projects/project-info/task-info/task-info.component';
import { EventInfoComponent } from '../events/event-info/event-info.component';
import { NiceDatePipe } from 'src/app/lib/pipes/niceDate-pipe';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  standalone:true,
  imports:[ManagementComponent,IonicModule,SummaryCardComponent,HttpClientModule, CommonModule,RouterModule,ProjectPipe,AccountPipe,MatSidenavModule,TaskInfoComponent,EventInfoComponent,NiceDatePipe,DatePipe],
  selector: 'app-dashboard',
  providers:[AccountService,ProjectService,TaskService,EventService,MembershipService,NiceDatePipe,DatePipe],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  loaded = false
  memberships: any[];
  tasks:any[] = [];
  account_id:Number;
  taskSelected=false;
  selectedTask=null;
  events:any[] = [];
  selectedEvent:any= [];
  selectedEventId:any = 0;
  isSelected = false;
  newCount = 0;
  ipCount = 0;
  doneCount = 0;
  totalCount = 0;
  newTasks = 0;
  ipTasks = 0;
  doneTasks = 0;
  totalTasks = 0;
  stateObject = null;
  tasksNotDone:any[] = [];
  selectedTaskProjectTasks:any = [];
  constructor(
    private eventService:EventService,
    private _sharedService:SharedService,
    private membershipService:MembershipService,
    private router:Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
  ) { 
    try {
      let object:any = this.router.getCurrentNavigation()?.extras.state
      this.stateObject = object.id
    } catch (error) {
      
    }
  }

  async ngOnInit() {
    this.account_id = await this._sharedService.getAccountID();
    this.memberships = [];
    await this.membershipService.readMemberships(this.account_id).then((result:any)=>{
      this.memberships = result.filter(x=>x.project_status != "Done");
      this.setProjects(result)
      this._sharedService.setProjects(result)
    }).catch((err) => { 
      this._snackBar.open("Database Error", 'OK', {
        duration: 3000
      })
    });
    await this.eventService.readInvitedEvents(this.account_id).then((result:any)=>{
      this.events = result.filter(x => new Date(x.event_end) > new Date()).sort((a, b) => -a.event_date.localeCompare(b.event_date) || b.event_id - a.event_id);
    }).catch((err) => { 
      this._snackBar.open("Database Error", 'OK', {
        duration: 3000
      })
    });
    this.newCount = this.memberships.filter(x=> x.project_status == "New").length
    this.ipCount = this.memberships.filter(x=> x.project_status == "In Progress").length
    this.doneCount = this.memberships.filter(x=> x.project_status == "Done").length
    this.totalCount = this.memberships.length
    setTimeout(()=> {
      this.loaded = true;
    },500)
  }
  async setTasks(){
    this.memberships.forEach(element => {
      this.tasks = this.tasks.concat(element.project_tasks.filter(x => x.assigned_to == this.account_id))
    });
    this.ipTasks = this.tasks.filter(x=>x.task_status == "In Progress").length
    this.newTasks = this.tasks.filter(x=>x.task_status == "New").length
    this.doneTasks = this.tasks.filter(x=>x.task_status == "Done").length
    this.totalTasks = this.tasks.length
    this.tasksNotDone = this.tasks.filter(x=>x.task_status !="Done");
  }
  async setProjects(projects:any[]){
    await this.setTasks()
  }
  openTask(task:any,drawer:MatDrawer){
    this.isSelected = false
    this.selectedEvent = [];
    this.taskSelected = true;
    this.selectedTask = task;
    this.selectedTaskProjectTasks = this.memberships.filter(x=>x.project_id == task.project_id)
    this.selectedTaskProjectTasks = this.selectedTaskProjectTasks[0].project_tasks
    drawer.open()
  }

  openEvent(event:any,drawer:MatDrawer){
    this.taskSelected = false;
    this.selectedTask = null;
    this.selectedEvent = event
    this.isSelected = true;
    drawer.open()
  }

  async setNoSelected(){
    this.taskSelected = false;
    this.selectedTask = null;
    this.isSelected = false;
    let isEventDeleted = await this._sharedService.getIsEventDeleted();
    let isTaskDeleted = await this._sharedService.getIsTaskDeleted();
    if(isEventDeleted){
      let deletedEvent = await this._sharedService.getIsEventDeletedID();
      this.events = this.events.filter(x=>x.event_id !=deletedEvent)
      this._sharedService.setIsEventDeleted(false,null);
      this._sharedService.setIsEventUpdated(false)
    }
    if(isTaskDeleted){
      let deletedTask = await this._sharedService.getIsTaskDeletedID();
      this.tasks = this.tasks.filter(x=>x.task_id !=deletedTask);
      this.ipTasks = this.tasks.filter(x=>x.task_status == "In Progress").length
      this.newTasks = this.tasks.filter(x=>x.task_status == "New").length
      this.doneTasks = this.tasks.filter(x=>x.task_status == "Done").length
      this.totalTasks = this.tasks.length
      this.tasksNotDone = this.tasks.filter(x=>x.task_status !="Done");
      this._sharedService.setIsTaskDeleted(false,null);
      this._sharedService.setIsTaskUpdated(false);
    }
  }
  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  } 
}
