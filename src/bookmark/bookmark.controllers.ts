import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { BookService } from "./bookmark.service";
import { ValBook, PutBook } from "./dto";

@Controller()

export class BooksController {
    constructor(private booksService: BookService){}

    @Get('books')
    books(){
        return this.booksService.books()
    }

    @Post('books')
    addBook(@Body() dto: ValBook){
        return this.booksService.addbook(dto)
    }

    @Put('update')
    updated(@Body() dto: PutBook){
        return this.booksService.put(dto)
    }

    @Delete('delete/:id')
    deleted(@Param() dto:any){
        return this.booksService.delete(dto)
    }
}