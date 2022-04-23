import { ValidationPipe } from "@nestjs/common";
import { NestExpressApplication } from "@nestjs/platform-express";
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path'
import { renderFile } from 'ejs'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors()
  app.engine('html', renderFile)
  app.setBaseViewsDir(join(__dirname, '../public'))
  app.useStaticAssets(join(__dirname, '../public'), {
    index: false,
    redirect: false
  })
  app.useStaticAssets(join(__dirname, '../file'), {
    index: false,
    redirect: false
  })

  const options = new DocumentBuilder().setTitle('Api')
      .setDescription('Api')
      .setVersion('1.0.0')
      .addBearerAuth({
        description: 'Please enter token in following format: Bearer <JWT>',
        type: 'http', 
        scheme: 'Bearer', 
        bearerFormat: 'Bearer',
        in: "Header"
      }, 'access_token')
      .build();
      

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api',app,document);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }));
  
  await app.listen(3000);

}
bootstrap();
