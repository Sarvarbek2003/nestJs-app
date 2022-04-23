import { IsEmail, Length, IsNotEmpty, IsString } from "class-validator"
import { ApiProperty } from "@nestjs/swagger";

export class AuthDto {
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'email'})
    email: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'password'})
    password: string

    @IsString()
    @Length(0,30)
    @ApiProperty({type: String, description: 'Firstname'})
    firstName: string
    
    @IsString()
    @Length(0,30)
    @ApiProperty({type: String, description: 'Lastname'})
    lastName: string
}