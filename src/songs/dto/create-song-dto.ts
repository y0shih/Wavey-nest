import { IsNotEmpty, IsString, IsArray, IsDateString, IsMilitaryTime } from "class-validator";

export class CreatSongDTO {
    @IsNotEmpty()
    @IsString()
    readonly title: string;

    @IsNotEmpty()
    @IsArray()
    @IsString({ each: true })
    readonly artist: string [];

    @IsNotEmpty()
    @IsString()
    readonly album: string;
    readonly genre: string;

    @IsNotEmpty()
    @IsDateString()
    readonly releaseDate: Date;

    @IsMilitaryTime()
    readonly duration: number; // HH:MM format
}