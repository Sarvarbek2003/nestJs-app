import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { PrismaModule } from './prisma/prisma.module';
import { renderController } from './renderFile/rend.controller';
import { renderService } from './renderFile/rend.service';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [AuthModule, UsersModule, BookmarkModule, PrismaModule, ConfigModule.forRoot({isGlobal: true})],
  controllers: [renderController],
  providers: [renderService],
})
export class AppModule {}
