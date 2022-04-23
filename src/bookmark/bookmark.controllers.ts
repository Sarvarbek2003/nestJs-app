import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Request } from "express";
import { BookService } from "./bookmark.service";
import { ValBook, PutBook } from "./dto";
import { ApiBearerAuth } from "@nestjs/swagger";

@Controller()

export class BooksController {
    constructor(private booksService: BookService){}

    @Get('books')
    books(@Req() req: Request){
        return this.booksService.books(req.user)
    }

    @ApiBearerAuth('access_token')
    @UseGuards(AuthGuard('jwt'))
    @Post('add/books')
    addBook(@Body() dto: ValBook, @Req() req: Request){
        return this.booksService.addbook(dto, req.user)
    }

    @ApiBearerAuth('access_token')
    @UseGuards(AuthGuard('jwt'))
    @Put('update/book')
    updated(@Body() dto: PutBook,@Req() req: Request){
        return this.booksService.put(dto,req.user)
    }

    @ApiBearerAuth('access_token')
    @UseGuards(AuthGuard('jwt'))
    @Delete('delete/book/:id')
    deleted(@Param() dto:any, @Req() req: Request){
        return this.booksService.delete(dto, req.user)
    }
}