import { Module } from '@nestjs/common';

import { UploadsController } from '@/uploads/uploads.controller';
import { UploadsService } from '@/uploads/uploads.service';
import { UploadsRepository } from '@/uploads/uploads.repository';
import { DatabaseModule } from '@/database/database.module';

@Module({
	imports: [DatabaseModule.forRoot()],
	providers: [UploadsService, UploadsRepository],
	controllers: [UploadsController],
})
export class UploadsModule {}
