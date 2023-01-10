import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MembershipService {
  API_SERVER = 'server-link'
  constructor(private httpClient: HttpClient) { }

  async readMemberships(id:Number){
    // return this.httpClient.get(`${this.API_SERVER}/membership/${id}/read`).pipe(
    //   map((res: any) => {
    //       try {
    //         return res
    //       } catch (error) {
    //           alert("Data not found")
    //           res['err'] = "Data not found"
    //       }
    //   })
    // )
    return lastValueFrom(this.httpClient.get(`${this.API_SERVER}/membership/${id}/read`)).catch((error)=>{
      console.log("error")
    })
  }

  public getMemberships(id:Number){
    return lastValueFrom(this.httpClient.get(`${this.API_SERVER}/membership/${id}/project`)).catch((error)=>{
      console.log("error")
    })
  }
  async getMembers(id:Number){
    // return this.httpClient.get(`${this.API_SERVER}/membership/${id}/invites`).pipe(
    //   map((res: any) => {
    //       try {
    //         return res
    //       } catch (error) {
    //           alert("Data not found")
    //           res['err'] = "Data not found"
    //       }
    //   })
    // )
    return await lastValueFrom(this.httpClient.get(`${this.API_SERVER}/membership/${id}/invites`)).catch((error)=>{
      console.log("error")
    })
  }

  async createMembership(membership: any){
    return await lastValueFrom(this.httpClient.post<any>(`${this.API_SERVER}/membership/create`, membership)).catch((error)=>{
      console.log("error")
    })
  }

  async createMembershipProject(membership: any){
    return await lastValueFrom(this.httpClient.post<any>(`${this.API_SERVER}/membership/create/newproject`, membership)).catch((error)=>{
      console.log("error")
    })
  }


  public updateMembership(id:any,membership: any){
    return lastValueFrom(this.httpClient.put<any>(`${this.API_SERVER}/membership/${id}/update`, membership)).catch((error)=>{
      console.log("error")
    })
  }

  public deleteMembership(id: number,membership: any){
    console.log(membership)
    return lastValueFrom(this.httpClient.put<any>(`${this.API_SERVER}/membership/${id}/delete`,membership)).catch((error)=>{
      console.log("error")
    });
  }

  async deleteAll(id: number){
    return lastValueFrom(this.httpClient.delete(`${this.API_SERVER}/membership/${id}/deleteAll`));
  }
}
