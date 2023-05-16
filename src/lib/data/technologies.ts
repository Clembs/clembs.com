export enum TechnologyName {
	TypeScript,
	Svelte,
	Figma,
	TailwindCSS,
	Nextjs,
	Illustrator,
	XD,
	GoogleSites
}

export interface Technology {
	id: TechnologyName;
	name: string;
	iconUrl: string;
}

export const technologies = [
	{
		id: TechnologyName.TypeScript,
		name: 'TypeScript',
		iconUrl: '/assets/technologies/typescript.svg'
	},
	{
		id: TechnologyName.Svelte,
		name: 'Svelte',
		iconUrl: '/assets/technologies/svelte.svg'
	},
	{
		id: TechnologyName.Figma,
		name: 'Figma',
		iconUrl: '/assets/technologies/figma.svg'
	},
	{
		id: TechnologyName.TailwindCSS,
		name: 'Tailwind CSS',
		iconUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/tailwindcss.svg'
	},
	{
		id: TechnologyName.Nextjs,
		name: 'Next.js',
		iconUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/nextjs.svg'
	},
	{
		id: TechnologyName.Illustrator,
		name: 'Adobe Illustrator',
		iconUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/adobeillustrator.svg'
	},
	{
		id: TechnologyName.XD,
		name: 'Adobe XD',
		iconUrl: '/assets/technologies/xd.svg'
	},
	{
		id: TechnologyName.GoogleSites,
		name: 'Google Sites',
		iconUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/google.svg'
	}
] satisfies Technology[];
