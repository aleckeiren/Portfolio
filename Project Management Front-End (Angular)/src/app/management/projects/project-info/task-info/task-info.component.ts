import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit,Input,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Task } from 'src/app/entities/task';
import { AccountService } from 'src/app/lib/account.service';
import { MembershipService } from 'src/app/lib/membership.service';
import { AccountPipe } from 'src/app/lib/pipes/account-pipe';
import * as dayjs from 'dayjs';
import { TaskService } from 'src/app/lib/task.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { SharedService } from 'src/app/lib/shared.service';
import { MatDrawer } from '@angular/material/sidenav';
@Component({
  selector: 'task-info',
  templateUrl: './task-info.component.html',
  styleUrls: ['./task-info.component.scss'],
  imports:[IonicModule,CommonModule,FormsModule,ReactiveFormsModule,AccountPipe,MatSnackBarModule],
  providers:[DatePipe,AccountService],
  standalone:true
})
export class TaskInfoComponent implements OnInit {
  @Input() task:any;
  @Input() account_id:any;
  @Input() drawer:MatDrawer;
  @Input() allTasks:any;
  @ViewChild('taskconfirmation') confirmation;
  taskForm:FormGroup;
  isOpen = false;
  members:any[] =[]
  membersFormList: any[] = []
  comments:any[] =[];
  comment= {
    task_id:null,
    account_id: null,
    comment_content:null,
    comment_date:dayjs().toISOString()
  }
  you:any=[];
  loaded = false;
  allowTaskEdit = false;
  constructor(public sharedService:SharedService,public formBuilder: FormBuilder,private datePipe: DatePipe,private membershipService:MembershipService,private taskService:TaskService,private _snackBar: MatSnackBar) {
  }

  async ngOnInit() {
    await this.membershipService.getMembers(this.task.project_id).then((result:any)=>{
      this.members = result
      this.membersFormList = result.filter(x=> x.account_id != this.account_id);
      this.you = result.filter(x=> x.account_id == this.account_id)
    }).catch((err) => { 
      this._snackBar.open("Database Error", 'OK', {
        duration: 3000
      })
    });
    if(this.you[0].add_del_task || this.you[0].account_id == this.task.task_owner){
      this.allowTaskEdit = true;
    }
    await this.taskService.readTaskComments(this.task.task_id).then((result:any)=>{
      this.comments = result
      for (let index = 0; index < result.length; index++) {
        if(result[index].account_id == this.account_id){
          result[index]['allow_delete'] = true;
        }else{
          result[index]['allow_delete'] = false;
        }
      }
      this.comments = result
    }).catch((err) => { 
      this._snackBar.open("Database Error", 'OK', {
        duration: 3000
      })
    });
    if(this.allTasks == null){
      await this.taskService.getProjectTasks(this.task.project_id).then((result:any)=>{
        this.allTasks = result
        this.allTasks = this.allTasks.filter(x=>x.task_id != this.task.task_id);
      })
    }else{
      this.allTasks = this.allTasks.filter(x=>x.task_id != this.task.task_id);
    }
    this.loaded = true
    this.comment= {
      task_id:this.task.task_id,
      account_id: this.account_id,
      comment_content:null,
      comment_date:new Date().toISOString()
    }
  }

  async updateTask(){
    await this.taskService.updateTask(this.task).then((result)=>{
    }).catch((err) => { 
      this._snackBar.open("Database Error", 'OK', {
        duration: 3000
      })
    });
    this.sharedService.setIsTaskUpdated(true);
  }
  async postComment(){
    this.comment.comment_date = dayjs().toISOString();
    if(this.comment.comment_content != null && this.comment.comment_content != ""){
      this.taskService.createComment(this.comment).then((result:any)=>{
        this.comments = result
      }).catch((err) => { 
        this._snackBar.open("Database Error", 'OK', {
          duration: 3000
        })
      });
    }else{
      this._snackBar.open("No comment content...", 'OK', {
        duration: 3000
      })
    }
  }
  async deleteTask(task){
    await this.taskService.deleteTask(task).then((result:any)=>{
    }).catch((err) => { 
      this._snackBar.open("Database Error", 'OK', {
        duration: 3000
      })
    });
    this.sharedService.setIsTaskUpdated(true);
    this.sharedService.setIsTaskDeleted(true,task);
    this.drawer.close()
  }
  async dismissConfirmation(){
    this.isOpen =false;
  }
  async openConfirmation(event){
    this.confirmation.event = event;
    this.isOpen = true;
  } 
}
