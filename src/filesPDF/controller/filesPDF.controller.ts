import { BadRequestException, Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { fileNamer } from 'src/helpers/fileNamer.helper';
import { PdfFilesService } from '../services/filesPDF.service';
import { filterPDF } from 'src/helpers/filterPDF.helper';


@Controller('pdf')
export class PdfFilesController{
    constructor(private readonly filesService: PdfFilesService){}
   
    @Post('upload')

    @UseInterceptors(FileInterceptor('file', {

        fileFilter: filterPDF,       //llamamos al fileFilter le asignamos helper
        storage: diskStorage({
            destination: './file/pdf/archivos',
            filename: fileNamer,
        }),

    }),
    )

    uploadFile(@UploadedFile() file: Express.Multer.File) {
        if(!file){
            throw new BadRequestException('Asegurese que el archivo es un pdf');
        }

        return {
            fileName: file.filename,
        }
    }


}   