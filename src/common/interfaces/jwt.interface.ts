import { ObjectId } from 'mongodb';

export interface JwtPayload {
	id: string | ObjectId;
	iat: number;
	exp: number;
	refresh?: string;
}
