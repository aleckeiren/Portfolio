import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  API_SERVER = 'server-link'
  constructor(private httpClient: HttpClient) { }

  public readProjects(id:Number){
    return lastValueFrom(this.httpClient.get(`${this.API_SERVER}/project/${id}/read`)).catch((error)=>{
      console.log("error")
    })
  }

  async getProject(id:Number){
    // return this.httpClient.get(`${this.API_SERVER}/project/${id}/project`).pipe(
    //   map((res: any) => {
    //       try {
    //         return res
    //       } catch (error) {
    //           alert("Data not found")
    //           res['err'] = "Data not found"
    //       }
    //   })
    // )
    return lastValueFrom(await this.httpClient.get(`${this.API_SERVER}/project/${id}/project`)).catch((error)=>{
      console.log("error")
    })
  }

  async createProject(project: any){
    return await lastValueFrom(this.httpClient.post<any>(`${this.API_SERVER}/project/create`, project));
  }

  async updateProject(project: any){
    return await lastValueFrom(this.httpClient.put<any>(`${this.API_SERVER}/project/${project.project_id}/update`, project));
  }

  public deleteProject(id: number){
    return this.httpClient.delete(`${this.API_SERVER}/project/${id}/delete`);
  }
}
