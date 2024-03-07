import { ObjectId } from 'mongodb';

export type User = {
	_id?: ObjectId;
	email: string;
	username: string;
	password: string;
	activated: boolean;
	createdAt: Date | string;
};
