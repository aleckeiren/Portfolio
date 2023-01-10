import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from 'src/entities/account.entity';
import { Repository, UpdateResult, DeleteResult, ILike } from  'typeorm';
import * as bcrypt from 'bcrypt';
import e from 'express';
@Injectable()
export class AccountService {
    constructor(
        @InjectRepository(Account)
        private accountRes: Repository<Account>
    ) {}
    async create(account: any): Promise<any> {
        let registered = await this.accountRes.find({where: {email: ILike(account.email)}});
        if(registered.length > 0){
            return {result:"Account Exists"}
        }else{
            let newAccountPass = account.password;
            const salt = await bcrypt.genSalt();
            const hash = await bcrypt.hash(newAccountPass, salt);
            account.password = hash;
            return await this.accountRes.save(account);
        }
    }
    
    async  readAll(): Promise<Account[]> {
        return await this.accountRes.find();
    }

    async checkEmail(email):Promise<any>{
        return await this.accountRes.find({select:{first_name:true,last_name:true,account_id:true,email:true,password:false,photo:true},where: {email: ILike(email)}})
    }

    async logIn(emailLogIn,pass):Promise<any>{
        let account = await this.accountRes.find({where: {email: ILike(emailLogIn)}})
        if(account.length == 0){
            return {result:"No Account Found"}
        }else{ 
            const isMatch = await bcrypt.compare(pass, account[0].password);
            if(isMatch == false){
                return {result:"Email/Password does not match..."}
            }else{
                delete account[0].password;
                return account;
            }
        }
    }

    async getAccount(id):Promise<any>{
        return await this.accountRes.find({select:{first_name:true,last_name:true,account_id:true,email:true,password:false,photo:true},where: {account_id: id}});
    }

    async update(account: Account): Promise<UpdateResult> {

        return await this.accountRes.update(account.account_id,account);
    }

    async updateProfilePic(id,picture){
        return await this.accountRes.update({account_id:id},{photo:picture.photo})
    }

    async delete(account_id): Promise<DeleteResult> {
        return await this.accountRes.delete(account_id);
    }
}
