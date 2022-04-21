import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserService } from './user.service';
import { UserControllers } from './users.controllers';

@Module({
    imports: [PrismaModule],
    controllers: [UserControllers],
    providers: [UserService]
})
export class UsersModule {}
