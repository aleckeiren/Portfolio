import { Pipe, PipeTransform } from '@angular/core';
import { firstValueFrom, lastValueFrom, Subject } from 'rxjs';
import { AccountService } from '../account.service';

@Pipe({
    name: 'accountPipe',
    pure: true,
    standalone:true
})
/**
 * Pipe to get values of columns using the account id
 */
export class AccountPipe implements PipeTransform {
    constructor(private accountService:AccountService){}
    transform(value:any): any {
        let subject = new Subject<any>();
        this.accountService.getAccount(value).then(
            (data: any) => {
                subject.next(data[0]['first_name'] + " " + data[0]['last_name'])
        });
        // let data = this.accountService.getAccount(value);
        // let name = await lastValueFrom(data)
        // subject.next(name[0]['first_name'])
        return subject;
    }
}