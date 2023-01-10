import { Account } from 'src/entities/account.entity';
import { AccountService } from './account.service';
import { Controller, Get, Post,Put, Delete, Body, Param } from  '@nestjs/common';

@Controller('account')
export class AccountController {
    constructor(private accountService: AccountService){
    }
    @Get()
    read(): Promise<Account[]> {
      return this.accountService.readAll();
    }

    @Get(':id/account')
    getAccount(@Param('id') id): Promise<Account[]> {
        return this.accountService.getAccount(id);
    }

    @Post('login')
    logIn(@Body() loginDetails: any): Promise<any[]> {
        let email = loginDetails.email;
        let password = loginDetails.password
        return this.accountService.logIn(email,password);
    }
    
    @Post('create')
    async create(@Body() account: Account): Promise<any> {
      return this.accountService.create(account);
    }  
    
    @Put(':id/update')
    async update(@Param('id') id, @Body() account: Account): Promise<any> {
        account.account_id = Number(id);
        return this.accountService.update(account);
    }

    @Put(':id/updatepic')
    async updateProfilePic(@Param('id') id, @Body() photo: any): Promise<any> {
        return this.accountService.updateProfilePic(id,photo);
    }
    
    @Delete(':id/delete')
    async delete(@Param('id') id): Promise<any> {
      return this.accountService.delete(id);
    }
}
