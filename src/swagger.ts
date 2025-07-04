import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function swagger(app: INestApplication): INestApplication {
  const swaggerCDN = 'https://cdn.jsdelivr.net/npm/swagger-ui-dist@4.18.2'
  const config = new DocumentBuilder()
    .setTitle('API GymLink')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-doc', app, document, {
    customCssUrl: [`${swaggerCDN}/swagger-ui.css`],
  customJs: [
    `${swaggerCDN}/swagger-ui-bundle.js`,
    `${swaggerCDN}/swagger-ui-standalone-preset.js`
  ]
  });
  return app;
}
