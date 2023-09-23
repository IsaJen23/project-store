import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../entities/product.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateProductDto } from '../dto/product.dto';
import { ProductImage } from '../entities/product-image.entity';
@Injectable()
export class ProductsService{
    constructor(
        @InjectRepository(Product)
        private productRepo: Repository<Product>,

        @InjectRepository(ProductImage)
        private readonly productImageRepo: Repository<ProductImage>,

        private readonly dataSource: DataSource,
    ){}
    


    // async create(createProductDto:CreateProductDto){
    //     const product = this.productRepo.create(createProductDto);
    //     await  this.productRepo.save(product);
    //     return product;
    // }

    //Crear un producto y agregar imagenes
    async create(productDto: CreateProductDto){
        const { images = [], ...detailsProductds } = productDto;

        const product = await this.productRepo.create({
            ...detailsProductds,
            images: images.map((image) => this.productImageRepo.create({ url: image }),
            ),
        });
        await this.productRepo.save(product);
        return product;
    }

    
    //Encontrar un registro con relaciones
    findOne(id: number){
        return this.productRepo.findOne({
            where: {id},
            relations: {
                autor: true,
                categoria: true,
                proveedor: true
            }
        });
        
    }

    //mostrar todos los registros
    findAll(){
        return   this.productRepo.find({
            order: {id: 'ASC'},
            relations: {
                images: true,
            },
        });
    }
    //eliminar un registro
    async remove(id:number){
        const product =await this.findOne(id);
        await this.productRepo.remove(product);
        return 'Producto eliminado';
    }

    //actualizar un registro
    // async update(id: number, cambios: CreateProductDto){
    //     const oldProduct = await this.findOne(id);
    //     const updateProduct = await this.productRepo.merge(oldProduct, cambios);
    //     return this.productRepo.save(updateProduct);
    // }

    //Actualizar un producto con imagenes
    async update(id: number, cambios: CreateProductDto){
        const {images, ...updateAll } = cambios;
        const product = await this.productRepo.preload({
            id: id,
            //Spread Operator(operador para esparcir)
            ...updateAll,//Esparcir todos los datos del producto
            

        
        });
        //correr el queryRunner, esto seria el punto de partida de nuestra transaccion 

        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        if(images) {
            //sino esta vacio borramos las imagenes existentes
            await queryRunner.manager.delete(ProductImage, {product: { id }});
            
            //creamos nuevas imagenes
            product.images = images.map((image) =>
            this.productImageRepo.create({ url: image }),
            );
        } else {
            product.images = await this.productImageRepo.findBy({ product: { id }});
        }
        //guardamos el producto
        await queryRunner.manager.save(product);

        //finalizamos la transaccion y liberamos el queryRunner
        await queryRunner.commitTransaction();
        await queryRunner.release();

        return product;
    }
}