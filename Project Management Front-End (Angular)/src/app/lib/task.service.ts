import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, map } from 'rxjs';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  API_SERVER = 'server-link'
  constructor(private httpClient: HttpClient,private _sharedService:SharedService) { }

  public readTasks(id:any){
    return this.httpClient.get(`${this.API_SERVER}/task/${id}/read`).pipe(
      map((res: any) => {
          try {
            return res
          } catch (error) {
              alert("Data not found")
              res['err'] = "Data not found"
          }
      })
    )
  }

  async readAllTasks(id:any){
    // return this.httpClient.get(`${this.API_SERVER}/task/${id}/readAll`).pipe(
    //   map((res: any) => {
    //       try {
    //         return res
    //       } catch (error) {
    //           alert("Data not found")
    //           res['err'] = "Data not found"
    //       }
    //   })
    // )
    return await lastValueFrom(this.httpClient.get(`${this.API_SERVER}/task/${id}/readAll`)).catch((error)=>{
      console.log("error")
    })
  }
  async readTaskComments(id){
    return await lastValueFrom(this.httpClient.get(`${this.API_SERVER}/commenttask/${id}/readcomments`)).catch((error)=>{
      console.log("error")
    })
  }
  public getDashDone(id:any){
    return this._sharedService.getTasks().filter(x =>x.project_id==id && x.task_status == "Done").map((res:any)=>{
      try{
        return res
      } catch(error){
        alert("Date not found")
      }
    })
  }

  public getDashNotDone(id:any){
    return this._sharedService.getTasks().filter(x =>x.project_id==id && x.task_status != "Done").map((res:any)=>{
      try{
        return res
      } catch(error){
        alert("Date not found")
      }
    })
  }

  async getProjectTasks(id:any):Promise<any>{
    // return this.httpClient.get(`${this.API_SERVER}/task/${id}/tasks`).pipe(
    //   map((res: any) => {
    //       try {
    //         return res
    //       } catch (error) {
    //           alert("Data not found")
    //           res['err'] = "Data not found"
    //       }
    //   })
    // )
    return lastValueFrom(await this.httpClient.get(`${this.API_SERVER}/task/${id}/tasks`)).catch((error)=>{
      console.log("error")
    })
  }

  async getTaskIP(id:any){
    // return this.httpClient.get(`${this.API_SERVER}/task/${id}/tasksip`).pipe(
    //   map((res: any) => {
    //       try {
    //         return res
    //       } catch (error) {
    //           alert("Data not found")
    //           res['err'] = "Data not found"
    //       }
    //   })
    // )
    return lastValueFrom(await this.httpClient.get(`${this.API_SERVER}/task/${id}/tasksip`)).catch((error)=>{
      console.log("error")
    })
  }

  async getTasksNew(id:any){
    // return this.httpClient.get(`${this.API_SERVER}/task/${id}/tasksnew`).pipe(
    //   map((res: any) => {
    //       try {
    //         return res
    //       } catch (error) {
    //           alert("Data not found")
    //           res['err'] = "Data not found"
    //       }
    //   })
    // )
    return lastValueFrom(await this.httpClient.get(`${this.API_SERVER}/task/${id}/tasksnew`)).catch((error)=>{
      console.log("error")
    })
  }

  async getTasksDone(id:any){
    // return this.httpClient.get(`${this.API_SERVER}/task/${id}/tasksdone`).pipe(
    //   map((res: any) => {
    //       try {
    //         return res
    //       } catch (error) {
    //           alert("Data not found")
    //           res['err'] = "Data not found"
    //       }
    //   })
    // )
    return lastValueFrom(await this.httpClient.get(`${this.API_SERVER}/task/${id}/tasksdone`)).catch((error)=>{
      console.log("error")
    })
  }
  async createComment(comment:any){
    return await lastValueFrom(this.httpClient.post<any>(`${this.API_SERVER}/commenttask/create`, comment)).catch((error)=>{
      console.log("error")
    })
  } 
  async createTask(task: any){
    return lastValueFrom(this.httpClient.post<any>(`${this.API_SERVER}/task/create`, task)).catch((error)=>{
      console.log("error")
    })
  }

  async updateTask(task: any){
    return await lastValueFrom(this.httpClient.put<any>(`${this.API_SERVER}/task/${task.task_id}/update`, task)).catch((error)=>{
      console.log("error")
    })
  }

  public deleteTask(id: number){
    return lastValueFrom(this.httpClient.delete(`${this.API_SERVER}/task/${id}/delete`)).catch((error)=>{
      console.log("error")
    })
  }
}
