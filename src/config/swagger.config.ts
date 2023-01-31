import { DocumentBuilder } from '@nestjs/swagger'

export const getSwaggerConfig = () => {
  const server =
    process.env.APP_URL || `http://localhost:${process.env.APP_PORT || 3000}`
  const config = new DocumentBuilder()
    .setTitle('P2P Backend Api - OpenAPI')
    .setDescription(
      'Este servico tem como objetivo, \
      atender todo o front do app      \
      no caso aplicacoes mobile e web.',
    )
    .setVersion('1.0.0')
    .addTag('user')
    .addTag('stock')
    .addTag('wallet')
    .addTag('brand')
    .addTag('zip-code')
    .addServer(server)

  config.addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
    },
    'access-token',
  )

  return config.build()
}
