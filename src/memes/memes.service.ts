import { ObjectId } from 'mongodb';
import { Inject, Injectable, forwardRef } from '@nestjs/common';

import { MemesRepository } from '@/memes/memes.repository';
import { UsersService } from '@/users/users.service';
import { ServiceError } from '@/common/error/catch.service';
import { CATEGORIES, SEARCH_FORMAT } from '@/common/constants/global';
import { clearUndefined } from '@/common/helpers/object.helper';
import { MEMES_PROJECTION } from '@/memes/utils/memes.projection';
import { DTOCreateMeme } from '@/memes/dto/memes.dto';
import { convertToObjectId } from '@/common/helpers/string.helper';
import { getMemesCommentsPipeline, getMemesLikesPipeline } from '@/memes/utils/memes.pipeline';
import type { MemeSearchQuery, MemeUpload, Comment } from '@/memes/types/memes.type';

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
			likes: [],
			updatedAt: now,
			createdAt: now,
		});

		return await this.memesRepository.findOne({ _id: rs.insertedId }, MEMES_PROJECTION);
	}

	async addComment(userId: ObjectId, memeStrId: string, content: string) {
		const memeId = convertToObjectId(memeStrId);

		const user = await this.userService.getUserFrom({ _id: userId });
		if (!user)
			throw new ServiceError(
				'UNAUTHORIZED',
				'You do not have the rights to access this ressource',
			);

		const meme = await this.memesRepository.exists({ _id: memeId });
		if (!meme) throw new ServiceError('NOT_FOUND', 'The requests meme does not exist');

		const now = new Date();
		const comment = {
			userId: userId,
			username: user.username,
			content: content,
			createdAt: now,
		} satisfies Comment;

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

	async toggleLike(userId: ObjectId, memeStrId: string) {
		const memeId = convertToObjectId(memeStrId);

		const user = await this.userService.getUserFrom({ _id: userId });
		if (!user)
			throw new ServiceError(
				'UNAUTHORIZED',
				'You do not have the rights to access this ressource',
			);

		const meme = await this.memesRepository.findOne({ _id: memeId });
		if (!meme) throw new ServiceError('NOT_FOUND', 'The requests meme does not exist');

		const isLiked = meme.likes.some((uid) => uid.toString() === userId.toString());

		if (!isLiked) {
			await this.memesRepository.updateOne(
				{ _id: memeId },
				{
					$push: {
						likes: userId,
					},
				},
			);
			return true;
		} else {
			await this.memesRepository.updateOne(
				{ _id: memeId },
				{
					$pull: {
						likes: userId,
					},
				},
			);
			return false;
		}
	}

	async retrieveUserMemesComments(userStrId: string) {
		const userId = convertToObjectId(userStrId);
		const pipeline = getMemesCommentsPipeline(userId);
		return this.memesRepository.aggregate(pipeline);
	}

	async retrieveUserMemesLike(userStrId: string) {
		const userId = convertToObjectId(userStrId);
		const pipeline = getMemesLikesPipeline(userId);
		return this.memesRepository.aggregate(pipeline);
	}

	async retrieveUserMemesCreated(userStrId: string) {
		const userId = convertToObjectId(userStrId);
		return this.memesRepository.findMany({ userId: userId }, MEMES_PROJECTION);
	}
}
