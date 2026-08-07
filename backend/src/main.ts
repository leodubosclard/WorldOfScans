import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.setGlobalPrefix('api');

    // Front et back partagent l'origine derrière Traefik : CORS seulement si on l'ouvre explicitement.
    if (process.env.CORS_ORIGIN) {
        app.enableCors({ origin: process.env.CORS_ORIGIN.split(','), credentials: true });
    }

    await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}
bootstrap();
