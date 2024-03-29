export type Category = {
	slug: string;
	name: string;
};

export const categories = [
	{
		slug: 'discovelist',
		name: 'Discovelist',
	},
	{
		slug: 'design',
		name: 'Design',
	},
] as const satisfies Category[];
