import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  API_SERVER = 'server-link'
  constructor(private httpClient: HttpClient) { }

  async readEvents(id){
    // return this.httpClient.get(`${this.API_SERVER}/event/${id}/read`).pipe(
    //   map((res: any) => {
    //       try {
    //         return res
    //       } catch (error) {
    //           alert("Data not found")
    //           res['err'] = "Data not found"
    //       }
    //   })
    // )
    return await lastValueFrom(this.httpClient.get(`${this.API_SERVER}/event/${id}/read`)).catch((error)=>{
      console.log("error")
    })
  }

  async readInvitedEvents(id){
    return await lastValueFrom(this.httpClient.get(`${this.API_SERVER}/invite/${id}/read`)).catch((error)=>{
      console.log("error")
    })
  }
  async readEventComments(id){
    return await lastValueFrom(this.httpClient.get(`${this.API_SERVER}/commentevent/${id}/readcomments`)).catch((error)=>{
      console.log("error")
    })
  }


  async readInvited(id){
    return await lastValueFrom(this.httpClient.get(`${this.API_SERVER}/invite/${id}/invited`)).catch((error)=>{
      console.log("error")
    })
  }

  async readProjectEvents(id){
    return await lastValueFrom(this.httpClient.get(`${this.API_SERVER}/invite/${id}/events`)).catch((error)=>{
      console.log("error")
    })
  }

  async createComment(comment:any){
    return await lastValueFrom(this.httpClient.post<any>(`${this.API_SERVER}/commentevent/create`, comment)).catch((error)=>{
      console.log("error")
    })
  } 
  public deleteInvite(id){
    return lastValueFrom(this.httpClient.get(`${this.API_SERVER}/invite/${id}/delete`)).catch((error)=>{
      console.log("error")
    })
  }

  async createInvite(member:any){
    return await lastValueFrom(this.httpClient.post<any>(`${this.API_SERVER}/invite/create`, member)).catch((error)=>{
      console.log("error")
    })
  }

  async createEvent(event: any){
    return await lastValueFrom(this.httpClient.post<any>(`${this.API_SERVER}/event/create`, event)).catch((error)=>{
      console.log("error")
    })
  }

  async updateEvent(event: any){
    return await lastValueFrom(this.httpClient.put<any>(`${this.API_SERVER}/event/${event.event_id}/update`, event)).catch((error)=>{
      console.log("error")
    })
  }

  async eventDestroy(event:any){
    return lastValueFrom(this.httpClient.delete(`${this.API_SERVER}/invite/${event}/destroy`)).catch((error)=>{
      console.log("error")
    })
  }

  public deleteEvent(id: number){
    return lastValueFrom(this.httpClient.delete(`${this.API_SERVER}/event/${id}/delete`)).catch((error)=>{
      console.log("error")
    })
  }
}
