import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { AccountService } from '../account.service';

@Pipe({
    name: 'dateNew',
    pure: true,
    standalone:true
})
/**
 * Pipe to get values of columns using the account id
 */
export class NiceDatePipe implements PipeTransform {
    constructor(private datePipe:DatePipe){}
    transform(value:any,end:any): any {
        let date = new Date(value);
        const today = new Date();
        if(end == null || end == ""){
            if(today.toDateString() == date.toDateString()){
                return "Today \nat " + this.datePipe.transform(date,'shortTime')
            }
            else{
                return this.datePipe.transform(date,'mediumDate') +" at " + this.datePipe.transform(date,'shortTime')
            }
        }else{
            let endDate = new Date(end)
            if(endDate.toDateString() == date.toDateString()){
                return this.datePipe.transform(endDate,'shortTime')
            }else{
                return this.datePipe.transform(endDate,'mediumDate') + " at " + this.datePipe.transform(endDate,'shortTime')
            }
        }
    }
}