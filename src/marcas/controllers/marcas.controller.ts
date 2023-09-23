import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { MarcasService } from "../services/marcas.service";
import { CreateMarcaDto } from "../dto/marca.dto";


@Controller('marcas')
export class MarcaController
{
    constructor(private readonly marcasService:MarcasService){}
    @Post()
    async CreateMarca(@Body() createMarcaDto: CreateMarcaDto){
        return this.marcasService.create(createMarcaDto);
    }

    
    @Get()
    findAll(){
        return this.marcasService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe)id: number){
        return this.marcasService.findOne(id);
    }
    @Delete(':id')
    remove(@Param('id', ParseIntPipe)id: number){
        return this.marcasService.remove(id);
    }

    @Patch(':id')
    update(
        @Param('id', ParseIntPipe)id: number,
        @Body()createMarcaDto :CreateMarcaDto,
        
    )
    {
        return this.marcasService.update(id, createMarcaDto)
    }
}