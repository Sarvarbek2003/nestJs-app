import { IsInt, IsOptional, IsString, Length } from "class-validator";

export class PutBook {
    @IsInt()
    id


    @IsOptional()
    @Length(3,20)
    title

    @IsOptional()
    @IsString()
    @Length(3,100)
    description
}
