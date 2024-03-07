import { Document, ObjectId } from 'mongodb';

export const getMemesCommentsPipeline = (userId: ObjectId): Array<Document> => [
	[
		{
			$project: {
				userId: 1,
				title: 1,
				username: 1,
				category: 1,
				upload: 1,
				likes: 1,
				comments: {
					$filter: {
						input: '$comments',
						as: 'comment',
						cond: {
							$eq: ['$$comment.userId', userId],
						},
					},
				},
			},
		},
		{
			$match: {
				comments: {
					$ne: [],
				},
			},
		},
		{
			$project: {
				id: '$_id',
				_id: 0,
				userId: 1,
				title: 1,
				username: 1,
				category: 1,
				comments: 1,
				pictureUrl: '$upload.url',
				commentsCount: {
					$size: '$comments',
				},
				likesCount: {
					$size: '$likes',
				},
			},
		},
	],
];

export const getMemesLikesPipeline = (userId: ObjectId): Array<Document> => [
	{
		$project: {
			userId: 1,
			title: 1,
			username: 1,
			category: 1,
			upload: 1,
			likes: 1,
			comments: 1,
			likedByMe: {
				$in: [userId, '$likes'],
			},
		},
	},
	{
		$match: {
			likedByMe: true,
		},
	},
	{
		$project: {
			id: '$_id',
			_id: 0,
			userId: 1,
			title: 1,
			username: 1,
			category: 1,
			pictureUrl: '$upload.url',
			commentsCount: {
				$size: '$comments',
			},
			likesCount: {
				$size: '$likes',
			},
		},
	},
];
