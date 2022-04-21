import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { PrismaModule } from './prisma/prisma.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { renderController } from './renderFile/rend.controller';
import { renderService } from './renderFile/rend.service';
@Module({
  imports: [AuthModule, UsersModule, BookmarkModule, PrismaModule],
  controllers: [renderController],
  providers: [renderService],
})
export class AppModule {}
