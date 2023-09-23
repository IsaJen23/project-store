import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { CreateProveedorDto } from "../dto/proveedor.dto";
import { ProveedorService } from "../services/proveedores.service";


@Controller('proveedores')
export class ProveedorController
{
    constructor(private readonly proveedorService:ProveedorService){}
    @Post()
    async CreateProveedor(@Body() createProveedorDto: CreateProveedorDto){
        return this.proveedorService.create(createProveedorDto);
    }

    @Get()
    findAll(){
        return this.proveedorService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe)id: number){
        return this.proveedorService.findOne(id);
    }
    @Delete(':id')
    remove(@Param('id', ParseIntPipe)id: number){
        return this.proveedorService.remove(id);
    }

    @Patch(':id')
    update(
        @Param('id', ParseIntPipe)id: number,
        @Body()createProveedorDto :CreateProveedorDto,
        
    )
    {
        return this.proveedorService.update(id, createProveedorDto)
    }
}