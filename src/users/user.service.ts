import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";


@Injectable({})
export class UserService {
    constructor(private prisma: PrismaService){}
    async users(dto: number){
        try {
            let users = await this.prisma.user.findMany({
                select: {
                    id: true,
                    email: true,
                    LastName: true,
                    firstName: true,
                    createAt: true,
                    updateAt: true,
                    imgUrl: true
                }
            })
            return users
        } catch (error) {
           return { 
               status: 404,
               msg: error.message

           }
       }
    }
    async user (dto:number){

    }
} 