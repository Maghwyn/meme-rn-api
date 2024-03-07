import {
	Body,
	Controller,
	Get,
	Param,
	Post,
	Query,
	Res,
	UseFilters,
	UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { ObjectId } from 'mongodb';

import { JwtAuthGuard } from '@/common/guards/jwt.guard';
import { MemesService } from '@/memes/memes.service';
import { ServiceErrorCatcher } from '@/common/error/catch.service';
import { DTOCommentContent, DTOCreateMeme } from '@/memes/dto/memes.dto';
import { Jwt } from '@/common/decorators/jwt.decorator';
import type { MemeSearchQuery } from '@/memes/types/memes.type';

@Controller('memes')
@UseGuards(JwtAuthGuard)
@UseFilters(ServiceErrorCatcher)
export class MemesController {
	constructor(private readonly memesService: MemesService) {}

	@Get()
	async getMemesFeed(
		@Query() query: MemeSearchQuery,
		@Jwt() userId: ObjectId,
		@Res() res: Response,
	) {
		const list = await this.memesService.retrieveMemesList(userId, query);
		return res.status(200).json(list);
	}

	@Post()
	async createMeme(@Jwt() userId: ObjectId, @Body() body: DTOCreateMeme, @Res() res: Response) {
		const meme = await this.memesService.createMeme(userId, body);
		return res.status(201).json(meme);
	}

	@Post('/comment/:memeId')
	async commentMessage(
		@Jwt() userId: ObjectId,
		@Param('memeId') memeId: string,
		@Body() body: DTOCommentContent,
		@Res() res: Response,
	) {
		const comment = await this.memesService.sendComment(userId, memeId, body.content);
		return res.status(200).json(comment);
	}
}
