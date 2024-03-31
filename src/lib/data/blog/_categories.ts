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
		id: 'design',
		name: 'Design',
		description: "Case-studies of design projects I've worked on.",
	},
] satisfies Category[];
