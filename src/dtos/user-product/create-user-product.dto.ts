import { IsUUID } from 'class-validator';

export class CreateUserProductDto {
  @IsUUID()
  public uuid: string;
}
