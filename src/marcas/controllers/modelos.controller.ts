import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { CreateModeloDto } from "../dto/modelo.dto";
import { ModelosService } from "../services/modelos.service";


@Controller('modelos')
export class ModeloController
{
    constructor(private readonly modelosService:ModelosService){}
    @Post()
    async CreateModelo(@Body() createModeloDto: CreateModeloDto){
        return this.modelosService.create(createModeloDto);
    }

    
    @Get()
    findAll(){
        return this.modelosService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe)id: number){
        return this.modelosService.findOne(id);
    }
    @Delete(':id')
    remove(@Param('id', ParseIntPipe)id: number){
        return this.modelosService.remove(id);
    }

    @Patch(':id')
    update(
        @Param('id', ParseIntPipe)id: number,
        @Body()createModeloDto :CreateModeloDto,
        
    )
    {
        return this.modelosService.update(id, createModeloDto)
    }
}