import { createParamDecorator, ExecutionContext, Logger as NestLogger } from '@nestjs/common';

import { LocalPayload } from '@/common/interfaces/local.interface';

export const Local = createParamDecorator((_: unknown, context: ExecutionContext) => {
	try {
		const args = context.getArgs();
		const user = args[0].user as LocalPayload;
		return user.id;
	} catch (e) {
		NestLogger.error(`Could not retrieve the user id, ${e}`);
		return null;
	}
});
