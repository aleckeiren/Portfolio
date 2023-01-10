import { CommonModule, DatePipe } from '@angular/common';
import { Component, Input, OnInit,ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { IonicModule, IonInput, IonPopover } from '@ionic/angular';
import { EventService } from 'src/app/lib/event.service';
import { MembershipService } from 'src/app/lib/membership.service';
import { NiceDatePipe } from 'src/app/lib/pipes/niceDate-pipe';
import { ProjectService } from 'src/app/lib/project.service';
import { SharedService } from 'src/app/lib/shared.service';
import { TaskService } from 'src/app/lib/task.service';
import { EventInfoComponent } from '../../events/event-info/event-info.component';
import { TaskInfoComponent } from './task-info/task-info.component';
import * as dayjs from 'dayjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatCheckboxModule} from '@angular/material/checkbox'; 
import { Router } from '@angular/router';
import * as FileSaver from 'file-saver';
import { FileService } from 'src/app/lib/file.service';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
@Component({
  selector: 'project-info',
  templateUrl: './project-info.component.html',
  styleUrls: ['./project-info.component.scss'],
  imports:[DatePipe,IonicModule,CommonModule,MatSidenavModule,TaskInfoComponent,NiceDatePipe,EventInfoComponent,FormsModule,ReactiveFormsModule,MatCheckboxModule],
  providers:[TaskService,DatePipe,EventService,SharedService,NiceDatePipe,FileService],
  standalone: true
})
export class ProjectInfoComponent implements OnInit {
  @Input() selectedProject: any;
  @Input() account_id:any;
  @ViewChild('confirmation') confirmation;
  @ViewChild('membershipConfirmation') membershipConfirmation;
  @ViewChild('fileconfirmation') filepConfirmation:IonPopover;
  @ViewChild('membershipConfirmation') membershipPConfirmation:IonPopover;
  pages;
  isOpen = false;
  drawerWidth = "40%";
  showForm = true;
  tasksIP:any[] = [];
  tasksNew:any[] = [];
  tasksDone:any[] = [];
  taskSelected = false;
  eventSelected =false;
  selectedEvent:any;
  events:any[] = []
  selectedTask:any;
  showTaskForm = true;
  members:any[] = [];
  showEventForm = false;
  addMember = false;
  isAllowed = false;
  allowProjectEdit = false;
  isOwner = false;
  owner:any[] = [];
  isMemOpen =false;
  isFileOpen = false;
  taskForm = {
    project_id: null,
    task_owner:null,
    assigned_to:null,
    parent_task:null,
    task_name:null,
    task_description:null,
    task_status:'New',
    task_creation:dayjs().toISOString(),
    task_target:null
  }
  FormData:FormGroup
  memberForm = {
    email:null,
    project_id:null,
    add_del_task:false,
    add_del_event:false,
    edit_project:false,
    add_del_member:false
  }
  eventForm = {
    project_id: null,
    event_owner: null,
    event_date: dayjs().toISOString(),
    event_name: null,
    event_description: null,
    event_end:dayjs().toISOString(),
  }
  projectFiles:any[]=[];
  newFileUpload:any;
  you:any = [];
  membersFormList:any[]=[];
  file:File;
  showUpload = false;
  @ViewChild('popover') popover:IonPopover;
  constructor(
    private formBuilder: FormBuilder,
    private taskService:TaskService,
    private membershipService:MembershipService,
    private router:Router,
    date:DatePipe,
    private eventService:EventService,
    private sharedService:SharedService,
    private projectService:ProjectService,
    private _snackBar: MatSnackBar,
    private fileService:FileService,
    private datePipe:DatePipe) {
    this.you[0] = {account_id:this.account_id}
  }

  async ngOnInit() {
    this.FormData = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.email
      ])),
      project_id:this.selectedProject.project_id,
      add_del_task:new FormControl(false, Validators.required),
      add_del_event:new FormControl(false, Validators.required),
      edit_project:new FormControl(false, Validators.required),
      add_del_member:new FormControl(false, Validators.required),
    });
    this.selectedProject.project_tasks.sort((a,b)=> 
      (Number(a.assigned_to == this.account_id) - Number(b.assigned_to == this.account_id) || new Date(a.task_creation) > new Date(b.task_creation) )
    );
    this.tasksIP = this.selectedProject.project_tasks.filter(x=> x.task_status == "In Progress")
    this.tasksNew = this.selectedProject.project_tasks.filter(x=> x.task_status == "New")
    this.tasksDone = this.selectedProject.project_tasks.filter(x=> x.task_status == "Done")
    await this.eventService.readProjectEvents(this.selectedProject.project_id).then((result:any)=>{
      this.events = result.filter(x => new Date(x.event_end) > new Date()).sort((a, b) => -a.event_date.localeCompare(b.event_date) || b.event_id - a.event_id);
    }).catch((err) => { 
      this._snackBar.open("Database Error", 'OK', {
        duration: 3000
      })
    });
    await this.membershipService.getMembers(this.selectedProject.project_id).then((result:any)=>{
      this.members = result
      this.membersFormList = result.filter(x=> x.account_id != this.account_id && x.account_id != this.selectedProject.project_owner);
      this.you = result.filter(x=> x.account_id == this.account_id)
    }).catch((err) => { 
      this._snackBar.open("Database Error", 'OK', {
        duration: 3000
      })
    });
    this.fileService.readFiles(this.selectedProject.project_id).then((result:any)=>{
      this.projectFiles = result;
    })
    this.membersFormList =this.membersFormList.filter(x=> x.account_id != this.selectedProject.project_owner)
    await this.sharedService.setSelectedMembers(this.members);
    await this.sharedService.setAccountID(this.you[0].account_id)
    await this.checkPermissions();
    this.taskForm = {
      project_id: this.selectedProject.project_id,
      task_owner: this.account_id,
      assigned_to:null,
      parent_task:null,
      task_name:null,
      task_description:null,
      task_status:'New',
      task_creation:dayjs().toISOString(),
      task_target:null
    }
    this.memberForm = {
      email:null,
      project_id:this.selectedProject.project_id,
      add_del_task:false,
      add_del_event:false,
      edit_project:false,
      add_del_member:false
    }
    this.eventForm.event_owner = this.account_id;
    this.eventForm.project_id = this.selectedProject.project_id
  }

  async saveProject(project,popover?:IonPopover){
    let projectToSave = {
      project_id:this.selectedProject.project_id,
      project_description:this.selectedProject.project_description,
      project_owner:this.selectedProject.project_owner,
      project_name:this.selectedProject.project_name,
      project_start:this.selectedProject.project_start,
      project_target:this.selectedProject.project_target,
      project_status:this.selectedProject.project_status
    }
    try{
      await this.projectService.updateProject(projectToSave).then((result)=>{
      }).catch((err) => { 
        this._snackBar.open("Database Error", 'OK', {
          duration: 3000
        })
      });;
    }catch(error){
      console.log("Cannot connect to the Database")
    }
  }

  async dismissPopover(){
    this.popover.dismiss()
  }

  async dismissConfirmation(){
    this.isOpen =false;
  }
  async openConfirmation(event){
    this.confirmation.event = event;
    this.isOpen = true;
  } 
  async submitNewTask(drawer:MatDrawer){
    if(this.taskForm.task_name != "" && this.taskForm.task_name != null){
      this.taskForm.task_creation = dayjs().toISOString();
      await this.taskService.createTask(this.taskForm).then((result:any)=>{
        this.taskForm = {
          project_id: this.selectedProject.project_id,
          task_owner: this.account_id,
          assigned_to:null,
          parent_task:null,
          task_name:null,
          task_description:null,
          task_status:'New',
          task_creation:dayjs().toISOString(),
          task_target:null
        }
      }).catch((err) => { 
        this._snackBar.open("Database Error", 'OK', {
          duration: 3000
        })
      });
      await this.projectService.getProject(this.selectedProject.project_id).then((result:any)=> {
        this.selectedProject = result;
        this.selectedProject.project_tasks.sort((a,b)=> 
          (Number(a.assigned_to == this.account_id) - Number(b.assigned_to == this.account_id) || new Date(a.task_creation) > new Date(b.task_creation) )
        );
        this.tasksIP = this.selectedProject.project_tasks.filter(x=> x.task_status == "In Progress")
        this.tasksNew = this.selectedProject.project_tasks.filter(x=> x.task_status == "New")
        this.tasksDone = this.selectedProject.project_tasks.filter(x=> x.task_status == "Done")
      })
    }
    drawer.close()
  }
  
  async submitNewEvent(drawer:MatDrawer){
    if(this.eventForm.event_name != "" && this.eventForm.event_name != null){
      await this.eventService.createEvent(this.eventForm).then((result:any)=>{
        let invite = {
          invite_id: null,
          event_id: result.event_id,
          is_accepted: null,
          account_id: this.you[0].account_id
        }
        this.afterNewEvent(invite,result,drawer)
      }).catch((err) => { 
        this._snackBar.open("Database Error", 'OK', {
          duration: 3000
        })
      });
    }
  }
  async afterNewEvent(invite,event,drawer:MatDrawer){
    let newInvite = {
      invite_id: null,
      event_id: invite.event_id,
      is_accepted: null,
      account_id: this.you[0].account_id
    }
    await this.eventService.createInvite(newInvite);
    await this.eventService.readProjectEvents(this.selectedProject.project_id).then((result:any)=>{
      this.events = result.filter(x => new Date(x.event_end) > new Date()).sort((a, b) => -a.event_date.localeCompare(b.event_date) || b.event_id - a.event_id);
    }).catch((err) => { 
      this._snackBar.open("Database Error", 'OK', {
        duration: 3000
      })
    });
    event = this.events.filter(x => x.event_id == event.event_id);
    this.openEvent(event[0],drawer);
  }
  async submitNewMember(drawer:MatDrawer){
    let formData = this.FormData.getRawValue();
    await this.membershipService.createMembership(formData).then((result)=>{
      if(result instanceof Array){
        this.members = result
        this.membersFormList = result.filter(x=> x.account_id != this.account_id);
        this.you = result.filter(x=> x.account_id == this.account_id);
        drawer.open()
        this.openMembers(drawer)
      }else{
        this._snackBar.open(result.result, 'OK', {
          duration: 3000
        })
      }
    }).catch((err) => { 
      this._snackBar.open("Database Error", 'OK', {
        duration: 3000
      })
    });
    await this.sharedService.setSelectedMembers(this.members)
  }

  openTask(task:any,drawer:MatDrawer){
    this.drawerWidth = "40%";
    this.showForm = false;
    this.eventSelected = false
    this.taskSelected = true;
    this.selectedTask = task;
    this.selectedEvent = null;
    drawer.open()
  }

  openEvent(event:any,drawer:MatDrawer){
    this.drawerWidth = "40%";
    this.showForm = false;
    this.selectedEvent = event;
    this.eventSelected = true;
    this.taskSelected = false;
    this.selectedTask = null
    drawer.open()
  }

  openForm(drawer:MatDrawer,type:string){
    this.drawerWidth = "20%";
    this.showForm = true;
    if(type == "task"){
      this.showTaskForm =true
      this.showEventForm = false;
      this.addMember = false
      this.taskForm = {
        project_id: this.selectedProject.project_id,
        task_owner: this.account_id,
        assigned_to:null,
        parent_task:null,
        task_name:null,
        task_description:null,
        task_status:'New',
        task_creation:dayjs().toISOString(),
        task_target:null
      }
    }else if(type == "event"){
      this.showEventForm = true;
      this.showTaskForm = false;
      this.eventForm = {
        project_id: this.selectedProject.project_id,
        event_owner: this.account_id,
        event_date: dayjs().toISOString(),
        event_name: null,
        event_description: null,
        event_end:dayjs().toISOString(),
      }
    }else{
      this.showEventForm = false;
      this.showTaskForm = false;
      this.addMember = true
      this.FormData = this.formBuilder.group({
        email: new FormControl('', Validators.compose([
          Validators.required,
          Validators.email
        ])),
        project_id:this.selectedProject.project_id,
        add_del_task:new FormControl(false, Validators.required),
        add_del_event:new FormControl(false, Validators.required),
        edit_project:new FormControl(false, Validators.required),
        add_del_member:new FormControl(false, Validators.required),
      });
    }
    drawer.open()
  }

  async openMembers(drawer:MatDrawer){
    this.drawerWidth = "40%";
    this.showForm = true;
    this.showEventForm = false;
    this.showTaskForm = false;
    this.addMember = false
    await this.membershipService.getMembers(this.selectedProject.project_id).then((result:any)=>{
      this.members = result
      this.membersFormList = result.filter(x=> x.account_id != this.account_id);
      this.you = result.filter(x=> x.account_id == this.account_id)
    }).catch((err) => { 
      this._snackBar.open("Database Error", 'OK', {
        duration: 3000
      })
    });
    this.FormData = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.email
      ])),
      project_id:this.selectedProject.project_id,
      add_del_task:new FormControl(false, Validators.required),
      add_del_event:new FormControl(false, Validators.required),
      edit_project:new FormControl(false, Validators.required),
      add_del_member:new FormControl(false, Validators.required),
    });
    drawer.open()
  }
  async setNoSelected(){
    this.showForm = false;
    this.taskSelected = false;
    this.eventSelected = false;
    this.selectedEvent = null;
    this.selectedTask = null;
    this.showEventForm = false;
    this.showTaskForm = false;
    this.addMember = false;
    let isTaskUpdated = await this.sharedService.getIsTaskUpdated()
    if(isTaskUpdated){
      await this.projectService.getProject(this.selectedProject.project_id).then((result:any)=>{
        this.selectedProject = result
      }).catch((err) => { 
        this._snackBar.open("Database Error", 'OK', {
          duration: 3000
        })
      });
      this.selectedProject.project_tasks.sort((a,b)=> 
        (Number(a.assigned_to == this.account_id) - Number(b.assigned_to == this.account_id) || new Date(a.task_creation) > new Date(b.task_creation) )
      );
      this.tasksIP = this.selectedProject.project_tasks.filter(x=> x.task_status == "In Progress")
      this.tasksNew = this.selectedProject.project_tasks.filter(x=> x.task_status == "New")
      this.tasksDone = this.selectedProject.project_tasks.filter(x=> x.task_status == "Done")
      this.sharedService.setIsTaskUpdated(false);
      this.sharedService.setIsTaskDeleted(false,null);
    }
    let isEventUpdated = await this.sharedService.getIsEventUpdated();
    if(isEventUpdated){
      await this.eventService.readProjectEvents(this.selectedProject.project_id).then((result:any)=>{
        this.events = result.filter(x => new Date(x.event_end) > new Date()).sort((a, b) => -a.event_date.localeCompare(b.event_date) || b.event_id - a.event_id);
      })
      this.sharedService.setIsEventUpdated(false);
      this.sharedService.setIsEventDeleted(false,null);
    }
  }
  async checkPermissions(){
    if(this.you[0].account_id == this.selectedProject.project_owner || this.you[0].edit_project){
      this.allowProjectEdit = true;
    }else{
      this.allowProjectEdit = false;
    }
    if(this.you[0].account_id == this.selectedProject.project_owner){
      this.isOwner = true;
    }else{
      this.owner = this.members.filter(x=> x.account_id == this.selectedProject.project_owner);
      this.isOwner = false;
    }
  }
  async updatePermissions(memberUp) {
    await this.membershipService.updateMembership(memberUp.membership_id,memberUp).then((result)=>{
    }).catch((err) => { 
      this._snackBar.open("Database Error", 'OK', {
        duration: 3000
      })
    });
    await this.sharedService.setSelectedMembers(this.members);
    await this.checkPermissions();
  }
  async deleteProject(project){
    await this.membershipService.deleteAll(project).then((result:any)=>{
    }).catch((err) => { 
      this._snackBar.open("Database Error", 'OK', {
        duration: 3000
      })
    });
    this.router.navigate(['../../manage/dashboard'],{state:{"id":"all"},skipLocationChange:true});
  }
  async deleteMembership(membership,confirmDiag:IonPopover){
    this.membershipService.deleteMembership(membership.membership_id,membership).then((result:any)=>{
      this.members = result
      this.membersFormList = result.filter(x=> x.account_id != this.account_id && x.account_id != this.selectedProject.project_owner);
      this.you = result.filter(x=> x.account_id == this.account_id)
    }).catch((err) => { 
      this._snackBar.open("Database Error", 'OK', {
        duration: 3000
      })
    });
    this.membershipPConfirmation = confirmDiag;
    this.membershipPConfirmation.dismiss()
    this.isMemOpen = false;
  }
  async openMemConfirmation(event,confirmDiag:IonPopover){
    this.membershipPConfirmation = confirmDiag;
    this.membershipPConfirmation.present()
    this.isMemOpen = true;
  }
  async dismissMemConfirmation(confirmDiag:IonPopover){
    this.membershipPConfirmation = confirmDiag;
    this.membershipPConfirmation.dismiss();
    this.isMemOpen =false;
  }
  
  private readBase64(file): Promise<any> {
    const reader = new FileReader();
    const base64 = new Promise((resolve, reject) => {
      reader.addEventListener('load', function () {
        resolve(reader.result);
      }, false);
      reader.addEventListener('error', function (event) {
        reject(event);
      }, false);
    
      reader.readAsDataURL(file);
    });
    return base64;
  }
  async changeListener($event) {
    this.file = $event.target.files[0];
    let fileType = this.file.type;
    let fileName = this.file.name;
    let base64File:any;
    await this.readBase64(this.file)
    .then((data) => {
        base64File = data
    });
    this.newFileUpload = {
      project_id: this.selectedProject.project_id,
      file_name: fileName,
      file_data: base64File,
      file_uploader: this.account_id,
      file_type: fileType
    }
    this.showUpload = true;
  }
  async uploadFile(input:IonInput){
    await this.fileService.createFile(this.newFileUpload).then((result)=>{
      this.projectFiles.push(result)
    })
    this.newFileUpload = null;
    input.value = null;
    this.showUpload = false;
  }
  async downloadFile(file,file_type,file_name){
    var byteString = atob(file.split(',')[1]);
    var arrayBuffer = new ArrayBuffer(byteString.length);
    var intArray = new Uint8Array(arrayBuffer);
    for (var i = 0; i < byteString.length; i++) {
      intArray[i] = byteString.charCodeAt(i);
    }
    let blob = new Blob([arrayBuffer], { type: file_type });
    FileSaver.saveAs(blob,file_name)
  }
  async dismissFileConfirmation(confirmDiag:IonPopover){
    this.filepConfirmation = confirmDiag;
    this.filepConfirmation.dismiss()
    this.isFileOpen =false;
  }
  async openFileConfirmation(event,confirmDiag:IonPopover){
    this.filepConfirmation = confirmDiag;
    this.filepConfirmation.present()
    this.isFileOpen = true;
  }
  async deleteFile(file,confirmDiag:IonPopover){
    this.fileService.deleteFile(file).then((result:any)=>{
      this.projectFiles = this.projectFiles.filter(x=>x.file_id != file);
    })
    this.filepConfirmation = confirmDiag;
    this.filepConfirmation.dismiss()
    this.isFileOpen =false;
  }
  async downloadAsPDF(tasks) {
    let tableData = JSON.parse(JSON.stringify(tasks));
    tableData.sort((a, b) => -a.task_creation.localeCompare(b.task_creation) || b.task_target - a.task_target);
    let pdfTable:any = []
    let header:any = [["Task","Status","Created By","Assigned To","Parent Task","Task Description","Creation Date","Target Date"]]
    tableData.forEach(element => {
      let parent = tasks.filter(x=>x.task_id = element.task_id)
      let data:any = [element.task_name,element.task_status,element.owner_info,element.assigned_info,parent[0].task_name,element.task_description,this.datePipe.transform(element.task_creation,'yyyy-MM-dd'),this.datePipe.transform(element.task_target,'yyyy-MM-dd')];
      pdfTable.push(data)
    });
    let date = new Date().toLocaleString()
    var pdf = new jsPDF('l', 'mm',[279.4, 215])
    autoTable(pdf,{
        head: [["Task","Status","Created By","Assigned To","Parent Task","Task Description","Creation Date","Target Date"]],
        body: pdfTable,
        foot:[[{content:this.selectedProject.project_name+ " Project Report ("+ this.datePipe.transform(new Date(),'yyyy-MM-dd, h:mm a') +")"+":\nCompleted Tasks: "+this.tasksDone.length+"\nIn Progress Tasks: "+this.tasksIP.length+"\nNew Tasks: "+this.tasksNew.length,styles:{fillColor:'white',textColor:'black',fontSize:12}}]],
        showHead: 'everyPage',
        showFoot:'everyPage',
        theme:'grid',
        footStyles:{fillColor:'white',textColor:'black',fontSize:12},
        tableWidth: 'auto',
        horizontalPageBreak: true,
        styles:{overflow:'linebreak'},
        margin: 20,
    })
    let string = "report_" + this.datePipe.transform(new Date(),'yyyy-MM-dd')+".pdf"
    pdf.save(string);
}
}
