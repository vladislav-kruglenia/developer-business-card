import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './appModule.js';

const bootstrap = async (): Promise<void> => {
  const app = await NestFactory.create(AppModule);
  const port = Number(process.env.PORT ?? 3000);

  await app.listen(port, '0.0.0.0');
  console.log(`GraphQL API доступен на http://localhost:${port}/graphql`);
};

void bootstrap();
