import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PdfFilesController } from './controller/filesPDF.controller';
import { PdfFilesService } from './services/filesPDF.service';

@Module({
  imports: [TypeOrmModule.forFeature([])],
  controllers: [PdfFilesController],
  providers: [PdfFilesService],
})
export class FilesPdfModule {}
