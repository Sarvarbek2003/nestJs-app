import { ValidationPipe } from "@nestjs/common";
import { NestExpressApplication } from "@nestjs/platform-express";
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path'
import { renderFile } from 'ejs'
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors()
  app.engine('html', renderFile)
  app.setBaseViewsDir(join(__dirname, '../public'))
  app.useStaticAssets(join(__dirname, '../public'), {
    index: false,
    redirect: false
  })
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }));
  
  await app.listen(3000);

}
bootstrap();
