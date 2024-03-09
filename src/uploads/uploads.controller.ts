import { cwd } from 'process';
import { join, resolve } from 'path';
import { Response } from 'express';
import { existsSync, mkdirSync } from 'fs';
import { ObjectId } from 'mongodb';
import {
	Controller,
	FileTypeValidator,
	Get,
	MaxFileSizeValidator,
	Param,
	ParseFilePipe,
	Post,
	Res,
	UploadedFile,
	UseFilters,
	UseGuards,
	UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { config } from '@/config/config';
import { JwtAuthGuard } from '@/common/guards/jwt.guard';
import { UploadsService } from '@/uploads/uploads.service';
import { ServiceErrorCatcher } from '@/common/error/catch.service';
import { Jwt } from '@/common/decorators/jwt.decorator';
import type { MulterFile } from '@/uploads/types/multer.type';

@Controller('uploads')
@UseFilters(ServiceErrorCatcher)
export class UploadsController {
	private readonly UPLOADS_DIR = resolve(join(cwd(), 'files'));

	constructor(private readonly uploadsService: UploadsService) {
		if (!existsSync(this.UPLOADS_DIR)) {
			mkdirSync(this.UPLOADS_DIR, { recursive: true });
		}
	}

	@Post()
	@UseGuards(JwtAuthGuard)
	@UseInterceptors(FileInterceptor('file'))
	async handleUploadsPicture(
		@UploadedFile(
			new ParseFilePipe({
				validators: [
					new MaxFileSizeValidator({ maxSize: config.app.fileSizeLimit * 1000000 }),
					new FileTypeValidator({ fileType: /image\/jpeg|image\/png/i }),
				],
			}),
		)
		file: MulterFile,
		@Jwt() userId: ObjectId,
		@Res() res: Response,
	) {
		const payload = await this.uploadsService.saveFile(this.UPLOADS_DIR, file, userId);
		return res.status(201).json(payload);
	}

	@Get('/image/:id')
	async streamImage(@Param('id') imageId: string, @Res() res: Response) {
		const imageStream = await this.uploadsService.retrieveUploadFromId(imageId);
		res.setHeader('Content-Type', 'image/webp');
		imageStream.pipe(res);
	}
}
