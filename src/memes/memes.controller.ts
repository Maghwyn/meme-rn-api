import { Controller, Get, Param, Post, Res, UseFilters, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '@/common/guards/jwt.guard';
import { MemesService } from '@/memes/memes.service';
import { ServiceErrorCatcher } from '@/common/error/catch.service';
import { ObjectId } from 'mongodb';
import { Jwt } from '@/common/decorators/jwt.decorator';

@Controller('memes')
@UseGuards(JwtAuthGuard)
@UseFilters(ServiceErrorCatcher)
export class MemesController {
	constructor(private readonly memesService: MemesService) {}
}
