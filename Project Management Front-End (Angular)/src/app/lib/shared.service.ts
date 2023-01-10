import { Injectable } from '@angular/core';
import { Task } from '../entities/task';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  public _account_id:any;
  private _tasks:any[];
  private _projects:any[];
  private _selectedProjectMembers:any[];
  public updatedTask = false;
  public updatedEvent = false;
  public isTaskDeleted = false;
  public isEventDeleted = false;
  public deletedTaskID = null;
  public deletedEventID = null;
  setAccountID(id: any) {
      this._account_id = id;
  }
  

  getAccountID() {
      return this._account_id;
  }
  setTasks(tasks:[]){
    this._tasks = tasks;
  }
  getTasks(){
    return this._tasks;
  }
  setProjects(projects:any[]){
    this._projects = projects
  }

  async setIsTaskUpdated(condition){
    this.updatedTask = condition;
  }

  async setIsTaskDeleted(condition,id)
  {
    this.deletedTaskID = id;
    this.isTaskDeleted = condition;
  }
  async setIsEventDeleted(condition,id){
    this.deletedEventID = id;
    this.isEventDeleted = condition;
  }

  
  async getIsTaskDeleted(){
    return this.isTaskDeleted
  }
  async getIsEventDeleted(){
    return this.isEventDeleted
  }

  async getIsTaskDeletedID(){
    return this.deletedTaskID
  }
  async getIsEventDeletedID(){
    return this.deletedEventID
  }

  async getIsTaskUpdated(){
    return this.updatedTask
  }
  async setIsEventUpdated(condition){
    this.updatedEvent = condition;
  }

  async getIsEventUpdated(){
    return this.updatedEvent
  }


  getProjects(){
    return this._projects
  }

  async setSelectedMembers(members:any[]){
    this._selectedProjectMembers = members;
  }

  async getSelectedMembers(){
    return this._selectedProjectMembers
  }
}
