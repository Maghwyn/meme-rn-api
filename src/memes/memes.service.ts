import { ObjectId } from 'mongodb';
import { Inject, Injectable, Logger as NestLogger, forwardRef } from '@nestjs/common';

import { MemesRepository } from '@/memes/meme.repository';
import { UsersService } from '@/users/users.service';
import { ServiceError } from '@/common/error/catch.service';
import { CATEGORIES, SEARCH_FORMAT } from '@/common/constants/global';
import { clearUndefined } from '@/common/helpers/object.helper';
import { MEMES_PROJECTION } from '@/memes/utils/memes.projection';
import { DTOCreateMeme } from '@/memes/dto/memes.dto';
import { convertToObjectId } from '@/common/helpers/string.helper';
import type { MemeSearchQuery, MemeUpload } from '@/memes/types/memes.type';

@Injectable()
export class MemesService {
	constructor(
		@Inject(forwardRef(() => MemesRepository))
		private readonly memesRepository: MemesRepository,
		@Inject(forwardRef(() => UsersService))
		private readonly userService: UsersService,
	) {}

	// TODO: This fetch everything for now
	async retrieveMemesList(userId: ObjectId, query: MemeSearchQuery) {
		const user = await this.userService.userExists({ _id: userId });
		if (!user)
			throw new ServiceError(
				'UNAUTHORIZED',
				'You do not have the rights to access this ressource',
			);

		if (!CATEGORIES.includes(query.c)) {
			throw new ServiceError('BAD_REQUEST', `Unknown query parameter category name`);
		}

		if (query.q !== undefined && (query.q.length > 50 || !SEARCH_FORMAT.test(query.q))) {
			throw new ServiceError('BAD_REQUEST', 'Invalid query parameter q');
		}

		const searchRgx = new RegExp(query.q, 'gi');
		const filter = clearUndefined({
			title: query.q ? searchRgx : undefined,
			username: query.q ? searchRgx : undefined,
			category: query.c ? query.c : undefined,
		});

		return this.memesRepository.findMany(
			{
				...filter,
			},
			MEMES_PROJECTION,
		);
	}

	async createMeme(userId: ObjectId, meme: DTOCreateMeme) {
		const user = await this.userService.getUserFrom({ _id: userId });
		if (!user) throw new ServiceError('UNAUTHORIZED', 'Not allowed to create a meme');

		const now = new Date();
		const rs = await this.memesRepository.create({
			userId: userId,
			title: meme.title,
			username: user.username,
			upload: meme.upload || ({} as MemeUpload),
			category: meme.category,
			comments: [],
			updatedAt: now,
			createdAt: now,
		});

		return await this.memesRepository.findOne({ _id: rs.insertedId }, MEMES_PROJECTION);
	}

	async sendComment(userId: ObjectId, memetrId: string, content: string) {
		const memeId = convertToObjectId(memetrId);

		const user = await this.userService.getUserFrom({ _id: userId });
		if (!user)
			throw new ServiceError(
				'UNAUTHORIZED',
				'You do not have the rights to access this ressource',
			);

		const meme = await this.memesRepository.exists({ _id: memeId, userId });
		if (!meme)
			throw new ServiceError(
				'UNAUTHORIZED',
				'You do not have the rights to access this ressource',
			);

		const now = new Date();
		const comment = {
			username: user.username,
			content: content,
			createdAt: now,
		};

		await this.memesRepository.updateOne(
			{ _id: memeId },
			{
				$set: {
					updatedAt: now,
				},
				$push: {
					comments: comment,
				},
			},
		);

		return comment;
	}
}
