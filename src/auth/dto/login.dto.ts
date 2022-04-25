import { IsEmail, IsNotEmpty, IsString } from "class-validator"
import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
    @ApiProperty({type: String, description: 'email'})
    @IsEmail()
    @IsString()
    @IsNotEmpty()
    email: string

    @ApiProperty({type: String, description: 'password'})
    @IsString()
    @IsNotEmpty()
    password: string
}