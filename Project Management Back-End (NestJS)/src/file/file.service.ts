import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountService } from 'src/account/account.service';
import { File } from 'src/entities/file.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class FileService {
    constructor(
        @InjectRepository(File)
        private fileRes: Repository<File>,
        private accountRes: AccountService
    ) {}
    async create(file: any): Promise<any> {
        return await this.fileRes.save(file);
    }
    
    async  read(id): Promise<any[]> {
        let files = await this.fileRes.find({where:{project_id: id}});
        // for await (const iterator of files) {
        //     iterator['uploader_info'] = await this.accountRes.getAccount(iterator['file_uploader'])
        //     returnRes.push(iterator)
        // }
        return files;
    }

    async delete(file): Promise<DeleteResult> {
        return await this.fileRes.delete(file);
    }

    async deleteAll(project):Promise<any>{
        return await this.fileRes.delete({project_id:project})
    }
}
