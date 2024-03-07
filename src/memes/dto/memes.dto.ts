import {
	ArrayMaxSize,
	IsArray,
	IsIn,
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsString,
	Length,
} from 'class-validator';
import { Type } from 'class-transformer';

import { CATEGORIES } from '@/common/constants/global';
import { IsValidDomain } from '@/common/validators/IsValidDomain';
import type { MemeUpload } from '@/memes/types/memes.type';

export class DTOCreateMeme {
	@IsNotEmpty()
	@IsString()
	@Length(1, 60)
	public title: string;

	@IsNotEmpty()
	@IsString()
	@IsIn(CATEGORIES, { message: 'category must be one of the allowed values' })
	public category: string;

	@IsOptional()
	@IsNotEmpty()
	@IsArray()
	@ArrayMaxSize(2)
	@Type(() => DTOMemeUpload)
	public uploads: Array<MemeUpload>;
}

class DTOMemeUpload {
	@IsNotEmpty()
	@IsString()
	@Length(1, 100)
	name: string;

	@IsNotEmpty()
	@IsNumber()
	size: number;

	@IsNotEmpty()
	@IsString()
	@Length(1, 150)
	@IsValidDomain()
	url: string;
}

export class DTOCommentContent {
	@IsNotEmpty()
	@IsString()
	@Length(1, 300)
	public content: string;
}
