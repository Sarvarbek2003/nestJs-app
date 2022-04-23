import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { PutBook, ValBook } from "./dto";

@Injectable({})
export class BookService{
    constructor(private prisma: PrismaService){}
    async books(user:any){

        let books = await this.prisma.bookmark.findMany({
            orderBy:[
                {
                    id: 'asc'
                }
            ]
        })

        return books
    }
    async addbook(dto: ValBook, user: any){
        await this.prisma.bookmark.create({
            data: {
                title: dto.title,
                description: dto.description,
                link: dto.link,
                userId: user.sub
            }
        })
        return {status: 200, message: 'ok'}
    }
    async put(dto: PutBook, user: any){
        try {
            await this.prisma.bookmark.updateMany({
                where:{
                    AND:[
                        {id: dto.id},
                        {userId: user.sub}
                    ]
                },
                data:{
                    title: dto.title,
                    description: dto.description,
                }
            })
            return {
                status: 200,
                message: 'Update!'
            }
        } catch (error) {
            return {
                status: 400,
                message: error.message
            }
        }
    } 
    async delete(dto:any, user: any) {
        try {
            let del = await this.prisma.bookmark.deleteMany({
                where: {
                    AND:[
                        {id: +dto.id},
                        {userId: +user.sub}
                    ]
                }
            })
                
            return {
                status: 200,
                message: 'Deleted',
                data: del
            }
        } catch (error) {
            return {
                status: 400,
                message: error.message
            }
        }
    }
}