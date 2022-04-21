import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { PutBook, ValBook } from "./dto";

@Injectable({})
export class BookService{
    constructor(private prisma: PrismaService){}
    async books(){
        let books = this.prisma.bookmark.findMany({
            orderBy:[
                {
                    id: 'asc'
                }
            ]
        })
        return books
    }
    async addbook(dto: ValBook){
        await this.prisma.bookmark.create({
            data: {
                title: dto.title,
                description: dto.description,
                link: dto.link,
                userId: dto.userId
            }
        })
    }
    async put(dto: PutBook){
        try {
            await this.prisma.bookmark.update({
                where:{
                    id: dto.id
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
    async delete(dto:any) {
        try {
            let del = await this.prisma.bookmark.delete({
                where: {
                    id: +dto.id
                }
            })
            return del
        } catch (error) {
            return {
                status: 400,
                message: error.message
            }
        }
    }
}