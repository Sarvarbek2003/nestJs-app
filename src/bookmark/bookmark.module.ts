import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { BooksController } from './bookmark.controllers';
import { BookService } from './bookmark.service';

@Module({
    imports: [PrismaModule],
    controllers: [BooksController],
    providers: [BookService]
})
export class BookmarkModule {}
