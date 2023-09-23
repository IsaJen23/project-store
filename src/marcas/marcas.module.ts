import { Module } from '@nestjs/common';
import { MarcasService } from './services/marcas.service';
import { MarcaController } from './controllers/marcas.controller';
import { Marca } from './entities/marca.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Modelo } from './entities/modelo.entity';
import { ModeloController } from './controllers/modelos.controller';
import { ModelosService } from './services/modelos.service';

@Module({
  imports: [TypeOrmModule.forFeature([Marca, Modelo])],
  controllers: [MarcaController, ModeloController ],
  providers: [MarcasService, ModelosService]
})
export class MarcasModule {}

