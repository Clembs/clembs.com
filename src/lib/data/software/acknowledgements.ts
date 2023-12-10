import type { Software } from '.';

export const acknowledgements: Software = {
	id: 'acknowledgements',
	name: 'Acknowledgements',
	brief: 'Generating dependency lists made easy',
	createdAt: new Date('2022-08-08'),
	description: `Acknowledgments is a CLI tool that generates a JSON file with a list of all the local dependencies from package.json, as well as ones you add yourself, with exports to many file types (CSV, TOML, HTML, YAML and Markdown).`,
	iconPath: 'https://i.imgur.com/MUEH8Un.png',
	iconThumbnailPath: 'https://i.imgur.com/MUEH8Un.png',
	links: {
		projectUrl: 'https://npmjs.org/acknowledgements',
		repoUrl: 'https://github.com/Clembs/acknowledgements/',
	},
	themeGradient: {
		from: '#84E2B9',
		to: '#5CAA8B',
	},
};
