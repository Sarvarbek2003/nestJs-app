import { ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from "argon2";
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from "@nestjs/config";
import { writeFileSync } from 'fs';
import { join } from "path"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";


@Injectable({})
export class AuthService {
    constructor(
        private prisma: PrismaService, 
        private jwt: JwtService,
        private config: ConfigService
        ){}
    async signup(dto: AuthDto, file:any){
        try {
            const  hash = await argon.hash(dto.password)

            let fileName = (new Date()).getTime()+file?.originalname.replace(/\s/g, '')

            const user = await this.prisma.user.create({
                data:{
                    email: dto.email,
                    hash: hash,
                    firstName: dto.firstName,
                    LastName: dto.lastName,
                    imgUrl: fileName
                }
            })

            await writeFileSync(join(process.cwd(),'file' , fileName),file.buffer)

            return this.signToken(user.id, user.email)
        } catch (error) {
            if(error instanceof PrismaClientKnownRequestError){
                if(error.code == 'P2002'){
                    throw new ForbiddenException('The user already exists')
                }
            }
            throw new UnauthorizedException("Registration error")
        }
    }
    async login (dto: AuthDto){
       try {
            const user = await this.prisma.user.findUnique({
                where: {
                    email:dto.email
                }
            });

            if(!user) throw new ForbiddenException("User not found");

            const password = await argon.verify(user.hash, dto.password);

            if(!password) throw new UnauthorizedException("Wrong password");

            return  this.signToken(user.id, user.email)
       } catch (error) {
            throw new UnauthorizedException("Error");
       }
    }
    async signToken (userId: number, email: string): Promise<{ access_token: string, id: number }> {
        const payload = {
            sub: userId,
            email
        }

        const secret = this.config.get('SEKRET_KEY')

        const token = await this.jwt.signAsync(payload,{
            expiresIn: '15h',
            secret: secret
        })

        return { 
            id: userId,
            access_token: token,
        }
    }
}