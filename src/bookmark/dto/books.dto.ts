import {  IsString, Length } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class ValBook {
    @IsString()
    @ApiProperty({ type: String, description: 'IMG link'})
    link

    @Length(3,20)
    @ApiProperty({ type: String, description: 'Title'})
    title

    @IsString()
    @Length(3,100)
    @ApiProperty({ type: String, description: 'Descripion'})
    description
    
}
