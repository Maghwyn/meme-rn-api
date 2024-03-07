import { cwd } from 'process';
import { join, resolve } from 'path';
import { Response } from 'express';
import { existsSync, mkdirSync } from 'fs';
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
import { MemesService } from '@/memes/memes.service';
import { ServiceErrorCatcher } from '@/common/error/catch.service';
import type { MulterFile } from '@/memes/types/multer.type';
import { ObjectId } from 'mongodb';
import { Jwt } from '@/common/decorators/jwt.decorator';

@Controller('memes')
@UseGuards(JwtAuthGuard)
@UseFilters(ServiceErrorCatcher)
export class MemesController {
	private readonly UPLOADS_DIR = resolve(join(cwd(), 'files'));

	constructor(private readonly memesService: MemesService) {
		if (!existsSync(this.UPLOADS_DIR)) {
			mkdirSync(this.UPLOADS_DIR, { recursive: true });
		}
	}

	@Post('upload')
	@UseInterceptors(FileInterceptor('file'))
	async handleMemesPicture(
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
		const filePath = await this.memesService.saveFile(this.UPLOADS_DIR, file, userId);

		return res.status(201).json();
	}

	@Get('/image/:id')
	async streamImage(@Jwt() userId: ObjectId, @Param('id') imageId: string, @Res() res: Response) {
		const imageStream = await this.memesService.retrieveUploadFromId(userId, imageId);
		res.setHeader('Content-Type', 'image/webp');
		imageStream.pipe(res);
	}
}
