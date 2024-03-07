import { Module } from '@nestjs/common';

import { MemesController } from '@/memes/memes.controller';
import { MemesService } from '@/memes/memes.service';
import { MemesRepository } from '@/memes/meme.repository';
import { UploadsRepository } from '@/memes/uploads.repository';
import { DatabaseModule } from '@/database/database.module';
import { UsersModule } from '@/users/users.module';

@Module({
	imports: [DatabaseModule.forRoot(), UsersModule],
	providers: [MemesService, MemesRepository, UploadsRepository],
	controllers: [MemesController],
})
export class MemesModule {}
