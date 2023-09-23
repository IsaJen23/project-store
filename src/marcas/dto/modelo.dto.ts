import { IsNotEmpty, IsNumber, IsString, MaxLength} from 'class-validator';

export class CreateModeloDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsNumber()
  marca_id: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  nombre: string;

  @IsNumber()
  @IsNotEmpty()
  user_id: number;

}
