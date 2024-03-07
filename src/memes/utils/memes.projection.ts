export const MEMES_PROJECTION = {
	projection: {
		id: '$_id',
		_id: 0,
		title: 1,
		username: 1,
		uploads: 1,
		comments: 1,
		updatedAt: 1,
		createdAt: 1,
	},
};
