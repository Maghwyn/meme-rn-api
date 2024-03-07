import { ObjectId } from 'mongodb';

export type Upload = {
	_id?: ObjectId;
	length: number;
	chunkSize: number;
	uploadDate: Date;
	filename: string;
	metadata: UploadMetadata;
};

export type UploadMetadata = {
	userId: ObjectId;
};

export type UploadData = {
	size: string;
	name: string;
	url: string;
};
