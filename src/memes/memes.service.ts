import { Inject, Injectable, Logger as NestLogger, forwardRef } from '@nestjs/common';

import { MemesRepository } from '@/memes/meme.repository';

@Injectable()
export class MemesService {
	constructor(
		@Inject(forwardRef(() => MemesRepository))
		private readonly memesRepository: MemesRepository,
	) {}
}
