import { IsString } from 'class-validator';

export class CreateLocationDto {
  @IsString()
  public name: string;

  @IsString()
  public description?: string;

  @IsString()
  public color: string;
}
