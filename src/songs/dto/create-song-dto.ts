import {
  IsNotEmpty,
  IsString,
  IsArray,
  IsDateString,
  IsMilitaryTime,
  IsOptional,
} from 'class-validator';

export class CreateSongDTO {
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  readonly artist: string[];

  @IsNotEmpty()
  @IsString()
  readonly album: string;

  @IsOptional()
  @IsString()
  readonly genre?: string;

  @IsNotEmpty()
  @IsDateString()
  readonly releaseDate: Date;

  @IsNotEmpty()
  @IsMilitaryTime()
  readonly duration: string; // HH:MM format
}
