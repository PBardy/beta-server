import { IsArray, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';
import { UserCategoryDto } from '../user-category/user-category.dto';

export class CreateUserProductDto {
  @IsOptional()
  @IsUUID()
  public productId?: string;

  @IsOptional()
  @IsString()
  public name?: string;

  @IsOptional()
  @IsString()
  public description?: string;

  @IsOptional()
  @IsString()
  public thumbnail?: string;

  @IsOptional()
  @IsArray()
  public categories?: UserCategoryDto[];

  @IsNumber()
  public quantity: number;

  @IsString()
  public expiryDate: string;

  @IsString()
  public bestBeforeDate: string;
}
