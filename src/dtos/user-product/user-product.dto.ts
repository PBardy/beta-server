import type { IUserProductWithRelations } from '@/interfaces/user-product/user-product.interface';
import { IsDate } from 'class-validator';

export class UserProductDto {
  @IsDate()
  public bestBeforeDate: Date;

  public static fromModel(model: IUserProductWithRelations): UserProductDto {
    const dto = new UserProductDto();
    dto.bestBeforeDate = model.bestBeforeDate;

    return dto;
  }

  public static fromModels(models: Array<IUserProductWithRelations>): Array<UserProductDto> {
    return models.map(UserProductDto.fromModel);
  }
}
