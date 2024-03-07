import { createReadStream, createWriteStream } from 'fs';
import { stat, unlink } from 'node:fs/promises';
import { join } from 'path';
import sharp from 'sharp';
import { ObjectId } from 'mongodb';
import byteSize from 'byte-size';
import filenamify from 'filenamify';
import { Inject, Injectable, Logger as NestLogger, forwardRef } from '@nestjs/common';

import { ServiceError } from '@/common/error/catch.service';
import { convertToObjectId, getDomainUrl } from '@/common/helpers/string.helper';
import { UploadsRepository } from '@/uploads/uploads.repository';
import type { MulterFile } from '@/uploads/types/multer.type';

@Injectable()
export class UploadsService {
	constructor(
		@Inject(forwardRef(() => UploadsRepository))
		private readonly uploadsRepository: UploadsRepository,
	) {}

	async saveFile(destinationDir: string, file: MulterFile, userId: ObjectId) {
		try {
			const sanitized = filenamify(file.originalname);
			const fileName = `${sanitized.replace(/.png|.jpeg|.jpg/g, '')}.webp`;
			const filePath = join(destinationDir, fileName);

			const webpBuffer = await sharp(file.buffer).webp().toBuffer();
			await new Promise<void>((resolve, reject) => {
				const writeStream = createWriteStream(filePath);
				writeStream.on('finish', resolve);
				writeStream.on('error', reject);
				writeStream.write(webpBuffer);
				writeStream.end();
			});

			const imageStream = createReadStream(filePath);
			const insertedId = await this.uploadsRepository.uploadOne(
				imageStream,
				fileName,
				userId,
			);

			return {
				name: fileName,
				size: `${byteSize(file.size)}`,
				url: `${getDomainUrl()}/memes/image/${insertedId}`,
			};
		} catch (err) {
			NestLogger.error(err.message, 'UploadsService:SaveFile');
			throw new ServiceError(
				'UNPROCESSABLE_ENTITY',
				`Could not process the file ${file.originalname}`,
			);
		}
	}

	async unlinkFile(filePath: string) {
		try {
			if (await stat(filePath)) {
				await unlink(filePath);
			}
		} catch (err) {
			// This is mainly for rare case regarding disk related errors or lack of permission
			NestLogger.error(err.message, 'UploadsService:UnlikeFile');
			NestLogger.debug(`Unremoved file at ${filePath}`, 'UnlikeFile');
		}
	}

	async retrieveUploadFromId(userId: ObjectId, imageStrId: string) {
		const imageId = convertToObjectId(imageStrId);

		const doesExist = await this.uploadsRepository.exists({
			_id: imageId,
			metadata: {
				userId,
			},
		});

		if (!doesExist) throw new ServiceError('NOT_FOUND', 'Image file not found');

		return this.uploadsRepository.streamOne(imageId);
	}
}
