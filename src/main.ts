import { Logger as NestLogger, ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { NestFactory } from '@nestjs/core';

// Check environement configuration
import '@/config/env.validator';
import { config } from '@/config/config';

import { AppModule } from '@/app.module';

//! Proxy settings, production only
// <NestExpressApplication>
// app.set('trust proxy', 1);

async function bootstrap() {
	const PORT = config.app.port;
	const app = await NestFactory.create<NestExpressApplication>(AppModule, {
		bufferLogs: true,
		rawBody: true,
	});
	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
			disableErrorMessages: false,
			whitelist: true,
			enableDebugMessages: true,
		}),
	);

	// ! versioning, production only
	// app.enableVersioning({
	// 	type: VersioningType.URI,
	// 	defaultVersion: '1',
	// 	prefix: 'api/v',
	// });
	await app.listen(PORT);

	return app.getUrl();
}

(async (): Promise<void> => {
	try {
		const url = await bootstrap();
		NestLogger.debug(`Nest application running at : ${url}`, 'Bootstrap');
	} catch (error) {
		NestLogger.error(error, 'Bootstrap');
	}
})();
