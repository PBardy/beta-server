import { IsArray } from 'class-validator';
import { UpdateProductDto } from './update-product.dto';

export class UpdateProductsDto {
  @IsArray()
  public products: UpdateProductDto;
}
