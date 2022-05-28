import { IsUUID } from 'class-validator';

export class UpdateUserCategoryDto {
  @IsUUID()
  public uuid: string;

  @IsUUID()
  public categoryId: string;
}
