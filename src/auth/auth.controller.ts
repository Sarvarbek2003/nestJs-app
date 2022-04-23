import { Body, Controller, Res, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";
import { ApiBody, ApiCreatedResponse, ApiConsumes, ApiOkResponse, ApiUnauthorizedResponse } from "@nestjs/swagger";



@Controller('auth')

export class AuthController {
    constructor(private authService: AuthService){}
    @Post('signup')
    @ApiCreatedResponse({description: "User registration"})
    @ApiUnauthorizedResponse({description: "Registration error"})
    @ApiConsumes('multipart/form-data')
    @ApiBody({ 
        schema: {
        type: 'object',
        properties: {
            email: {type:'String'},
            password: {type:'String'},
            firstName: {type:'String'},
            lastName: {type:'String'},
          file: {
            type: 'string',
            format: 'binary',
          },
        },
      }, })
    @UseInterceptors(FileInterceptor('file'))
    uploadFile(@UploadedFile() file: Express.Multer.File, @Body() dto: AuthDto) { 
        return this.authService.signup(dto,file)
    }
    
    @Post('login')
    @ApiOkResponse({description: "User login"})
    @ApiUnauthorizedResponse({description: "Wrong username or password"})
    @ApiBody({ type: AuthDto })
    login(@Body() dto: AuthDto ){
        return this.authService.login(dto)
    }
    
}