import { CommonModule } from '@angular/common';
import { Component, OnInit,Input,ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedService } from 'src/app/lib/shared.service';
import {CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { EventService } from 'src/app/lib/event.service';
import { MembershipService } from 'src/app/lib/membership.service';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar'; 
import * as dayjs from 'dayjs'
import { MatDrawer } from '@angular/material/sidenav';
@Component({
  selector: 'event-info',
  templateUrl: './event-info.component.html',
  styleUrls: ['./event-info.component.scss'],
  standalone:true,
  imports:[IonicModule,CommonModule,FormsModule,ReactiveFormsModule,DragDropModule,MatSnackBarModule]
})
export class EventInfoComponent implements OnInit {
  @Input() event:any;
  @Input() projectId:any;
  projectMembers:any[] =[];
  invited:any[] =[];
  comments:any[] =[];
  isOpen = false;
  @Input()account_id:any;
  @Input() drawer:MatDrawer;
  @ViewChild('eventconfirmation') confirmation;
  you:any=[];
  allowEventEdit = false;
  comment= {
    event_id:null,
    account_id: null,
    comment_content:null,
    comment_date:dayjs().toISOString()
  }
  constructor(private _sharedService: SharedService,private eventService:EventService,private membershipService:MembershipService,private _snackBar: MatSnackBar) { }

  async ngOnInit() {
    await this.eventService.readInvited(this.event.event_id).then((result:any)=>{
      this.invited = result
    })
    await this.membershipService.getMembers(this.event.project_id).then((result:any)=>{
      this.projectMembers = result;
      this.you = this.projectMembers.filter(x=> x.account_id == this._sharedService.getAccountID())
    }).catch((err) => { 
      this._snackBar.open("Database Error", 'OK', {
        duration: 3000
      })
    });
    if(this.you[0].add_del_event || this.you[0].account_id == this.event.event_owner){
      this.allowEventEdit = true;
    }
    this.projectMembers =  this.projectMembers.filter(x => this.invited.every(y => x.account_id !== y.account_id))
    this.invited = this.invited.filter(x => x.account_id != this.event.event_owner)
    await this.eventService.readEventComments(this.event.event_id).then((result:any)=>{
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
    this.comments.sort((a, b) => -a.comment_date.localeCompare(b.comment_date) || b.event_comment_id - a.event_comment_id);
    this.comment= {
      event_id:this.event.event_id,
      account_id: this.account_id,
      comment_content:null,
      comment_date:new Date().toISOString()
    }
  }

  async updateEvent(){
    await this.eventService.updateEvent(this.event).then((result:any)=>{
    }).catch((err) => { 
      this._snackBar.open("Database Error", 'OK', {
        duration: 3000
      })
    });
  }

  async drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      if(event.container.id == "all"){
        await transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex,
        );
        await this.eventService.deleteInvite(event.container.data[event.currentIndex]['invite_id']).then((result)=>{
        });
      }else{
        await transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex,
        );
        let invite = {
          invite_id: null,
          event_id: this.event.event_id,
          is_accepted: null,
          account_id: event.container.data[event.currentIndex]['account_id']
        }
        await this.eventService.createInvite(invite).then((result:any)=>{
          event.container.data[event.currentIndex].invite_id = result.invite_id
        }).catch((err) => { 
          this._snackBar.open("Database Error", 'OK', {
            duration: 3000
          })
        });
      }
    }
  }
  async postComment(){
    this.comment.comment_date = dayjs().toISOString();
    if(this.comment.comment_content != null && this.comment.comment_content != ""){
      await this.eventService.createComment(this.comment).then((result:any)=>{
        this.comments=result;
      }).catch((err) => { 
        this._snackBar.open("Database Error", 'OK', {
          duration: 3000
        })
      });
      this.comment.comment_content = null;
    }else{
      this._snackBar.open("No comment content...", 'OK', {
        duration: 3000
      })
    }
  }
  async deleteEvent(event){
    await this.eventService.eventDestroy(event).then((result:any)=>{
    }).catch((err) => { 
      this._snackBar.open("Database Error", 'OK', {
        duration: 3000
      })
    });
    await this._sharedService.setIsEventUpdated(true);
    await this._sharedService.setIsEventDeleted(true,event);
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
