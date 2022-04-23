import { IsInt, IsOptional, IsString, Length } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class PutBook {
    @IsInt()
    @ApiProperty({ type: Number, description: 'Book id'})
    id


    @IsOptional()
    @Length(3,20)
    @ApiProperty({ type: String, description: 'Update title'})
    title

    @IsOptional()
    @IsString()
    @Length(3,100)
    @ApiProperty({ type: String, description: 'Udate description'})
    description
}
