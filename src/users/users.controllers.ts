import { Body, Controller, Get, Param } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller('')
export class UserControllers {
    constructor(private userService: UserService){}

    @Get('users')
    users(@Param() dto: number){
        return this.userService.users(dto)
    }

    @Get('users/:id')
    user(@Param() dto: number){
        return this.userService.user(dto)
    }
}