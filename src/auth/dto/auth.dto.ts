import { IsEmail, Length, IsNotEmpty, IsString } from "class-validator"

export class AuthDto {
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    password: string

    @IsString()
    @Length(0,30)
    firstName: string
    lastName: string
}