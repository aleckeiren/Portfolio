import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, map } from 'rxjs';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  API_SERVER = 'server-link'
  constructor(private httpClient: HttpClient) { }

  public readFiles(id:any){
    return lastValueFrom(this.httpClient.get(`${this.API_SERVER}/file/${id}/read`))
  }
  async createFile(file: any){
    return lastValueFrom(this.httpClient.post<any>(`${this.API_SERVER}/file/create`, file)).catch((error)=>{
      console.log("error")
    })
  }
  public deleteFile(id: number){
    return lastValueFrom(this.httpClient.delete(`${this.API_SERVER}/file/${id}/delete`)).catch((error)=>{
      console.log("error")
    })
  }
}
