import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, map } from 'rxjs';
import { Account } from '../entities/account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  API_SERVER = 'server-link'
  constructor(private httpClient: HttpClient) { }

  public getAccount(id:Number){
    // return this.httpClient.get(`${this.API_SERVER}/account/${id}/account`).pipe(
    //   map((res: any) => {
    //       try {
    //         return res
    //       } catch (error) {
    //           alert("Data not found")
    //           res['err'] = "Data not found"
    //       }
    //   })
    // )
    return lastValueFrom(this.httpClient.get(`${this.API_SERVER}/account/${id}/account`)).catch((error)=>{
      console.log("error")
    })
  }

  public createAccount(account: Account){
    return lastValueFrom(this.httpClient.post<any>(`${this.API_SERVER}/account/create`, account)).catch((error)=>{
      console.log("error")
    })
  }

  async login(account: any){
    return lastValueFrom(this.httpClient.post<any>(`${this.API_SERVER}/account/login`,account)).catch((error)=>{
      console.log("error")
    })
  }

  public updateAccount(account: Account){
    return lastValueFrom(this.httpClient.put<any>(`${this.API_SERVER}/account/${account.account_id}/update`, account)).catch((error)=>{
      console.log("error")
    })
  }

  public updateProfilePic(id,photo:any){
    return lastValueFrom(this.httpClient.put<any>(`${this.API_SERVER}/account/${id}/updatepic`, photo)).catch((error)=>{
      console.log("error")
    })
  }

  public deleteAccount(id: number){
    return lastValueFrom(this.httpClient.delete(`${this.API_SERVER}/account/${id}/delete`)).catch((error)=>{
      console.log("error")
    })
  }
}
