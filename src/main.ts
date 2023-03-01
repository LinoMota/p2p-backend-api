import { NestFactory } from '@nestjs/core'
import { SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { getSwaggerConfig } from './config/swagger.config'
import { environment } from './config/environment.config'

async function bootstrap() {

  const app = await NestFactory.create(AppModule)

  SwaggerModule.setup(
    'api-docs',
    app,
    SwaggerModule.createDocument(app, getSwaggerConfig()),
  )

  const { port } = environment()

  await app.listen(port)
}
bootstrap()
