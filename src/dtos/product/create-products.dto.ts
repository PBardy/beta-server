import { IsArray } from 'class-validator';
import { CreateProductDto } from './create-product.dto';

export class CreateProductsDto {
  @IsArray()
  public products: Array<CreateProductDto>;
}
