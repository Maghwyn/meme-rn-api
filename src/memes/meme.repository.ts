import { Inject, Injectable } from '@nestjs/common';
import {
	Filter,
	Db,
	InsertOneOptions,
	FindOptions,
	UpdateFilter,
	AggregateOptions,
	Document,
} from 'mongodb';

import { Meme } from '@/memes/types/memes.type';

@Injectable()
export class MemesRepository {
	constructor(@Inject('DATABASE_CONNECTION') private db: Db) {}

	get memes() {
		return this.db.collection<Meme>('memes');
	}

	create(doc: Meme, options?: InsertOneOptions) {
		return this.memes.insertOne(doc, options);
	}

	updateOne(filter: Filter<Meme>, update: UpdateFilter<Meme> | Partial<Meme>) {
		return this.memes.updateOne(filter, update);
	}

	findOne(filter: Filter<Meme>, options?: FindOptions<Meme>) {
		return this.memes.findOne(filter, options);
	}

	findMany(filter: Filter<Meme>, options?: FindOptions<Meme>) {
		return this.memes.find(filter, options).sort({ updatedAt: -1 }).toArray();
	}

	aggregate(pipeline: Array<Document>, options?: AggregateOptions) {
		return this.memes.aggregate(pipeline, options).toArray();
	}

	async exists(query: Filter<Meme>) {
		const options = { projection: { _id: 1 } };
		return (await this.memes.findOne(query, options)) !== null;
	}
}
