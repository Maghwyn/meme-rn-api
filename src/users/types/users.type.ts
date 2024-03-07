import { ObjectId } from 'mongodb';

export type User = {
	_id?: ObjectId;
	email: string;
	username: string;
	password: string;
	pictureUrl: string;
	backgroundUrl: string;
	bio: string;
	activated: boolean;
	createdAt: Date | string;
};
