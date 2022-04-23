import { Controller,Get,Render,UseGuards, Dependencies} from "@nestjs/common";
import { renderService } from "./rend.service";
import { ApiBearerAuth } from "@nestjs/swagger";

@Controller('/')
@Dependencies(renderService)
export class renderController {
  constructor(public rendService:renderService){}
  @Get("")
  @Render('index.html')
   home(){}

  @Get("auth/login")
  @Render('login.html')
   log(){} 

  @Get("auth/signup")
  @Render('register.html')
   reg() {}

  @ApiBearerAuth('access_token')
  @Get("addbook")
  @Render('addbook.html')
   addbook() {}
}