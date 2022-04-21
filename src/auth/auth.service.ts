import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from "argon2";

@Injectable({})
export class AuthService {
    constructor(private prisma: PrismaService){}
    async signup(dto: AuthDto){
        try {
            const  hash = await argon.hash(dto.password)

            const user = await this.prisma.user.create({
                data:{
                    email: dto.email,
                    hash: hash,
                    firstName: dto.firstName,
                    LastName: dto.lastName
                }
            })
            delete user.hash
            return user
        } catch (error) {
            return {
                status: 401,
                message: ["registration error"]
            }
        }
    }
    async login (dto: AuthDto){
       try {
            const user = await this.prisma.user.findUnique({
                where: {
                    email:dto.email
                }
            });

            if(!user) throw new Error("User not found");

            const password = await argon.verify(user.hash, dto.password);

            if(!password) throw new Error("Wrong password");
            
            delete user.hash;
            return user;
       } catch (error) {
           return {
               status: 401,
               message:[error.message] 
           }
       }
    }
}