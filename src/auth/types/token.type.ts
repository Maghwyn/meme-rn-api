import { ObjectId } from 'mongodb';

import { TokenEnum } from '@/auth/types/token.enum';

export type Token = {
	_id?: ObjectId;
	userId: ObjectId;
	token: string;
	expireAt: Date;
	type: TokenType;
};

export type TokenType = (typeof TokenEnum)[keyof typeof TokenEnum];
