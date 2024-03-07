import { ReadStream } from 'fs';
import { Inject, Injectable } from '@nestjs/common';
import { Db, Filter, GridFSBucket, GridFSBucketReadStream, ObjectId } from 'mongodb';

import { Upload } from '@/memes/types/uploads.type';

@Injectable()
export class UploadsRepository {
	private bucket: GridFSBucket;

	constructor(@Inject('DATABASE_CONNECTION') private db: Db) {
		this.bucket = new GridFSBucket(db, { bucketName: 'uploads' });
	}

	get uploads() {
		return this.db.collection<Upload>('uploads.files');
	}

	async uploadOne(
		imageStream: ReadStream,
		filename: string,
		userId: ObjectId,
	): Promise<ObjectId> {
		const uploadStream = this.bucket.openUploadStream(filename, { metadata: { userId } });
		imageStream.pipe(uploadStream);

		return await new Promise((resolve, reject) => {
			const onResolve = () => {
				resolve(uploadStream.id);
			};

			const onReject = () => {
				reject(null);
			};

			uploadStream.on('finish', onResolve);
			uploadStream.on('error', onReject);
		});
	}

	streamOne(imageId: ObjectId) {
		return new Promise<GridFSBucketReadStream | null>((resolve, reject) => {
			const downloadStream = this.bucket.openDownloadStream(imageId);

			downloadStream.on('error', (error) => {
				reject(error);
			});

			downloadStream.on('end', () => {
				resolve(null);
			});

			resolve(downloadStream);
		});
	}

	async exists(query: Filter<Upload>) {
		const options = { projection: { _id: 1 } };
		return (await this.uploads.findOne(query, options)) !== null;
	}
}
