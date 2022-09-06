import fs from 'node:fs';
import { resolve } from 'node:path';

const pathToIcons = resolve('src/lib/icons/brands');

const allIcons = fs.readdirSync(pathToIcons).reduce((acc, file) => {
	const svgIcon = fs.readFileSync(`${pathToIcons}/${file}`, 'utf-8');

	return {
		...acc,
		[file.replace('.svg', '')]: svgIcon
	};
}, {});

fs.writeFileSync(
	`${pathToIcons}/_allIcons.ts`,
	`export const brandIcons = ${JSON.stringify(allIcons)}`
);
