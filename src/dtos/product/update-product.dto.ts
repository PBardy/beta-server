import { IsString, IsUUID } from 'class-validator';

export class UpdateProductDto {
  @IsUUID()
  public uuid: string;

  @IsString()
  public name: string;

  @IsString()
  public thumbnail?: string;

  @IsString()
  public description?: string;
}
