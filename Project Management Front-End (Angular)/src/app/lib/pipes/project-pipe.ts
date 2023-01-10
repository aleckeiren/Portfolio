import { Pipe, PipeTransform } from '@angular/core';
import { firstValueFrom, lastValueFrom, Subject } from 'rxjs';
import { AccountService } from '../account.service';
import { ProjectService } from '../project.service';
import { SharedService } from '../shared.service';
import { TaskService } from '../task.service';

@Pipe({
    name: 'projectPipe',
    pure: true,
    standalone:true
})
/**
 * Pipe to get values of columns using the account id
 */
export class ProjectPipe implements PipeTransform {
    constructor(private projectService:ProjectService,private taskService:TaskService,private accountService:AccountService,private _sharedService:SharedService){}
    transform(value:any,column:any,service:any): any {
        let subject = new Subject<any>();
        if(service == "account"){
            this.projectService.getProject(value).then(
                (data: any) => {
                    this.accountService.getAccount(data[0][column]).then(
                        (account: any) => {
                            subject.next(account[0]['first_name'] + " " + account[0]['last_name'])
                    });
            });
        }
        else if(service == "project"){
            this.projectService.getProject(value).then(
                (data: any) => {
                    subject.next(data[0][column])
            });
        }else{
            if(column=="done"){
                this.taskService.getTasksDone(value).then(
                    (data: any) => {
                        subject.next(data.length)
                });
            }else if(column=="all"){
                this.taskService.getProjectTasks(value).then(
                    (data:any[])=>{
                        let done = data.filter(x => x.task_status == "Done").length;
                        let total = data.filter(x => x.task_status != "Done").length;
                        subject.next(done/total)
                    }
                )
            }else if(column=="string"){
                this.taskService.getProjectTasks(value).then(
                    (data:any[])=>{
                        let done = data.filter(x => x.task_status == "Done").length;
                        let total = data.length;
                        subject.next(done + " out of " +total + " tasks")
                    }
                )
            }
            else{
                this.taskService.getProjectTasks(value).then(
                    (data:any)=>{
                        subject.next(data.length)
                    }
                )
            }
        }
        // let data = this.accountService.getAccount(value);
        // let name = await lastValueFrom(data)
        // subject.next(name[0]['first_name'])
        return subject;
    }
}