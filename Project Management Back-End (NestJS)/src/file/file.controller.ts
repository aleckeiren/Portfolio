import { File } from 'src/entities/file.entity';
import { FileService } from './file.service';
import { Body, Controller, Delete, Param, Post, Put, Get } from '@nestjs/common';
@Controller('file')
export class FileController {
    constructor(private fileService: FileService){
    }
    @Get(':id/read')
    read(@Param('id') id): Promise<Event[]> {
        return this.fileService.read(id);
    }  
    //   return this.projectService.readAll(owner_id);
    // }
    
    @Post('create')
    async create(@Body() file: any): Promise<any> {
      return this.fileService.create(file);
    }  
    
    @Delete(':id/delete')
    async delete(@Param('id') id): Promise<any> {
      return this.fileService.delete(id);
    }
}
