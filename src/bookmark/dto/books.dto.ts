import { IsEmpty, IsInt, IsNotEmpty, IsNumber, IsString, Length } from "class-validator";

export class ValBook {
    @IsString()
    link

    @Length(3,20)
    title

    @IsString()
    @Length(3,100)
    description
    
    @IsNumber()
    userId
    
}
