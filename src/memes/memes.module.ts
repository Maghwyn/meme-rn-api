import { Module } from '@nestjs/common';

import { MemesController } from '@/memes/memes.controller';
import { MemesService } from '@/memes/memes.service';
import { MemesRepository } from '@/memes/meme.repository';
import { DatabaseModule } from '@/database/database.module';
import { UsersModule } from '@/users/users.module';

@Module({
	imports: [DatabaseModule.forRoot(), UsersModule],
	providers: [MemesService, MemesRepository],
	controllers: [MemesController],
	exports: [MemesService],
})
export class MemesModule {}
