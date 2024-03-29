export type Category = {
	id: string;
	name: string;
};

export const categories = [
	{
		id: 'discovelist',
		name: 'Discovelist',
	},
	{
		id: 'design',
		name: 'Design',
	},
] as const satisfies Category[];
