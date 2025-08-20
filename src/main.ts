import * as dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import chalk from 'chalk';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configurer Swagger
  const config = new DocumentBuilder()
    .setTitle('RPG API')
    .setDescription('API pour gérer le RPG')
    .setVersion('1.0')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT', in: "header"}, "admin-token")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // /api pour l’UI Swagger

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  logNest(`Application started at http://localhost:${port}`);
  logNest(`Swagger started at http://localhost:${port}/api`);
}

export function logNest(message: string) {
  const nestColor = chalk.green('[Nest]');
  const pid = chalk.green(process.pid);
  const date = new Date().toLocaleString();
  const logTag = chalk.green('LOG');
  const appTag = chalk.yellow('[ApiApplication]');
  const chalkMessage = chalk.blue(message);

  console.log(`${nestColor} ${pid}  - ${date}     ${logTag} ${appTag} ${chalkMessage}`);
}

bootstrap();
