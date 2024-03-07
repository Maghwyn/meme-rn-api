import { ObjectId } from 'mongodb';

export type Meme = {
	_id?: ObjectId;
	userId: ObjectId;
	title: string;
	username: string;
	category: string;
	upload: MemeUpload;
	comments: Array<Comment>;
	updatedAt: Date;
	createdAt: Date;
};

export type MemeUpload = {
	name: string;
	size: number;
	url: string;
};

export type Comment = {
	username: string;
	content: string;
	createdAt: Date;
};

export type MemeSearchQuery = {
	q?: string; // search query
	c?: string; // category
};
