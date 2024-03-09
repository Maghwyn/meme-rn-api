export const MEMES_PROJECTION = {
	projection: {
		id: '$_id',
		_id: 0,
		userId: 1,
		title: 1,
		username: 1,
		category: 1,
		upload: 1,
		comments: 1,
		likes: 1,
		updatedAt: 1,
		createdAt: 1,
	},
};

export const MEMES_CREATED_PROJECTION = {
	projection: {
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
};
