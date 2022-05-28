import { IsString, IsUUID } from 'class-validator';
import type { IProduct } from '@interfaces/product/product.interface';

export class ProductDto {
  @IsUUID()
  public uuid: string;

  @IsString()
  public name: string;

  @IsString()
  public thumbnail?: string;

  @IsString()
  public description?: string;

  public static fromModel(model: IProduct): ProductDto {
    const dto = new ProductDto();
    dto.uuid = model.uuid;
    dto.name = model.name;
    dto.thumbnail = model.thumbnail;
    dto.description = model.description;

    return dto;
  }

  public static fromModels(models: Array<IProduct>): Array<ProductDto> {
    return models.map(ProductDto.fromModel);
  }
}
