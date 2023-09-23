import { IsDateString, IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsNumber()
  id?: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  categoria: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(300)
  description: string;

  @IsDateString()
  @IsNotEmpty()
  create_at: number;

  @IsNumber()
  @IsNotEmpty()
  user_id: number;
}