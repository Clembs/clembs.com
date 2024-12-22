export type Category = {
	id: string;
	name: string;
	description: string;
};

export const categories = [
	{
		id: 'discovelist',
		name: 'Discovelist',
		description: 'A weekly curated list of news, personal discoveries and some project updates.',
	},
	{
		id: 'work',
		name: 'Case studies',
		description: 'Going in-depth on the behind the scenes.',
	},
] as const;
