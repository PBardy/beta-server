import { IsUUID } from 'class-validator';

export class UpdateUserProductDto {
  @IsUUID()
  public uuid: string;

  @IsUUID()
  public productId: string;
}
