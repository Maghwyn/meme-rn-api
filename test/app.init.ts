import { ValidationPipe } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';

export async function appInit(module: TestingModule) {
	const app = module.createNestApplication();
	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
			disableErrorMessages: false,
			whitelist: true,
			enableDebugMessages: true,
		}),
	);
	await app.init();
	return app;
}
