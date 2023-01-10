import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Project } from 'src/app/entities/project';
import { MembershipService } from 'src/app/lib/membership.service';
import { ProjectService } from 'src/app/lib/project.service';
import { SharedService } from 'src/app/lib/shared.service';
import { TaskService } from 'src/app/lib/task.service';
import { ManagementComponent } from '../management.component';
import { ProjectInfoComponent } from './project-info/project-info.component';

@Component({
  standalone:true,
  imports:[ManagementComponent,CommonModule,ProjectInfoComponent,HttpClientModule,IonicModule,MatSidenavModule,FormsModule,ReactiveFormsModule],
  selector: 'app-projects',
  providers:[ProjectService,TaskService,MembershipService],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  loaded = false;
  loadProject = false;
  project_id:Number;
  show_project = false;
  tasks = [];
  selectedProject:any;
  projectsNew:any[];
  projectsIP:any[];
  projectsDone:any[];
  memberships:any[];
  account_id:Number;
  stateObject = "all";
  FormData:FormGroup;
  formDate:any=null;
  object:any;
  constructor(
    private route: ActivatedRoute,
    private projectService:ProjectService, 
    private membershipService:MembershipService,
    private _sharedService:SharedService,
    private router:Router,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
    ) {
      this.object= this.router.getCurrentNavigation()?.extras.state
      this.stateObject = this.object.id
    }

  async ngOnInit() {
    this.account_id = this._sharedService.getAccountID();
    if(this.stateObject !="all"){
      this.loadProject = true;
      this.project_id = Number(this.stateObject)
      this.selectedProject = this.object.project;
      this.show_project = true
      // await this.projectService.getProject(this.project_id).then((result:any)=>{
      //   this.selectedProject=result[0];
      //   this.show_project = true
      // }).catch((err) => { 
      //   this._snackBar.open("Database Error", 'OK', {
      //     duration: 3000
      //   })
      // });
      setTimeout(()=> {
        this.loadProject = false;
        this.loaded = true
      },1000)
    }else{
      this.memberships = [];
      await this.membershipService.readMemberships(await this._sharedService.getAccountID()).then((result:any)=>{
        this.setProjects(result)
        this._sharedService.setProjects(result)
      }).catch((err) => { 
        this._snackBar.open("Database Error", 'OK', {
          duration: 3000
        })
      });
      
      this.projectsNew = this.memberships.filter(x => x.project_status == "New");
      this.projectsIP = this.memberships.filter(x => x.project_status == "In Progress");
      this.projectsDone = this.memberships.filter(x => x.project_status == "Done");
      setTimeout(()=> {
        this.loadProject = true;
        this.loaded = true
      },1000)
    }
    this.FormData = this.formBuilder.group({
      project_owner:this.account_id,
      project_name:new FormControl(null, Validators.required),
      project_description:new FormControl(null, Validators.required),
      project_start:new FormControl(new Date().toISOString(), Validators.required),
      project_target:new FormControl(null, Validators.required),
      project_status:new FormControl("New", Validators.required)
    });
  }

  async setSelected(project:any){
    this.selectedProject = project;
    this.show_project = true;
  }

  async setNoSelected(){
    this.loaded=false
    this.selectedProject = null;
    this.show_project = false;
    if(this.memberships == null || this.memberships == undefined){
      this.memberships = [];
      await this.membershipService.readMemberships(await this._sharedService.getAccountID()).then((result:any)=>{
        this.setProjects(result)
        this._sharedService.setProjects(result)
      }).catch((err) => { 
        this._snackBar.open("Database Error", 'OK', {
          duration: 3000
        })
      });
      this.projectsNew = this.memberships.filter(x => x.project_status == "New");
      this.projectsIP = this.memberships.filter(x => x.project_status == "In Progress");
      this.projectsDone = this.memberships.filter(x => x.project_status == "Done");
    }else if(this.memberships.length == 0){
      this.memberships = [];
      await this.membershipService.readMemberships(await this._sharedService.getAccountID()).then((result:any)=>{
        this.setProjects(result)
        this._sharedService.setProjects(result)
      }).catch((err) => { 
        this._snackBar.open("Database Error", 'OK', {
          duration: 3000
        })
      });
      this.projectsNew = this.memberships.filter(x => x.project_status == "New");
      this.projectsIP = this.memberships.filter(x => x.project_status == "In Progress");
      this.projectsDone = this.memberships.filter(x => x.project_status == "Done");
    }
    setTimeout(()=> {
      this.loaded = true;
    },1000)
  }
  openForm(drawer:MatDrawer){
    drawer.open()
  }
  closeDrawer(){
  }
  async submitNewProject(drawer:MatDrawer){
    let newProject = this.FormData.getRawValue();
    let newProjectId:any = null;
    drawer.close();
    this.loaded = false;
    await this.projectService.createProject(newProject).then((result:any)=>{
      newProjectId = result.project_id;
    }).catch((err) => { 
      this._snackBar.open("Database Error", 'OK', {
        duration: 3000
      })
    });
    let membership = {
      project_id:newProjectId,
      account_id:this.account_id,
      add_del_task:true,
      add_del_event:true,
      edit_project:true,
      add_del_member:true,
    }
    await this.membershipService.createMembershipProject(membership).then((result:any)=>{
    }).catch((err) => { 
      this._snackBar.open("Database Error", 'OK', {
        duration: 3000
      })
    });
    
    this.memberships = [];
    await this.membershipService.readMemberships(await this._sharedService.getAccountID()).then((result:any)=>{
      this.setProjects(result)
      this._sharedService.setProjects(result)
    }).catch((err) => { 
      this._snackBar.open("Database Error", 'OK', {
        duration: 3000
      })
    });
    this.projectsNew = this.memberships.filter(x => x.project_status == "New");
    this.projectsIP = this.memberships.filter(x => x.project_status == "In Progress");
    this.projectsDone = this.memberships.filter(x => x.project_status == "Done");
    setTimeout(()=> {
      this.loaded = true
    },500)
  }
  async setProjects(projects:any[]){
    this.memberships = projects
  }

  async deleteProject(project){
    this.membershipService.deleteAll(project).then((result:any)=>{
    }).catch((err) => { 
      this._snackBar.open("Database Error", 'OK', {
        duration: 3000
      })
    });
    this.memberships = this.memberships.filter(x => x['project'][0].project_id != project);
    this._sharedService.setProjects(this.memberships)
    this.projectsNew = this.memberships.filter(x => x.project_status == "New");
    this.projectsIP = this.memberships.filter(x => x.project_status == "In Progress");
    this.projectsDone = this.memberships.filter(x => x.project_status == "Done");
    this.router.navigate(['../../manage/projects'], {state: {'id':'all'}});
  }
}
