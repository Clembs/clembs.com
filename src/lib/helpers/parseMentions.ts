import { blogPosts, type BlogPost } from '$lib/data/blog';
import { softwareData, type Software } from '$lib/data/software';
import { EMOJI_MENTION_REGEX, PROJECT_MENTION_REGEX, USERNAME_MENTION_REGEX } from './regex';

export const emojiList = ['flushed', 'happy', 'laugh', 'neutral', 'scared', 'encarada'];

type ParserOutputBaseStructure =
	| string
	| {
			type: 'user' | 'emoji' | 'project';
	  };

export type ParserOutputUserStructure = ParserOutputBaseStructure & {
	type: 'user';
	username: string;
};

export type ParserOutputEmojiStructure = ParserOutputBaseStructure & {
	type: 'emoji';
	emojiId: string;
};

type ParserOutputBaseProjectStructure = ParserOutputBaseStructure & {
	type: 'project';
	projectId: string;
	projectType: 'software' | 'blog';
};

type ParserOutputBlogStructure = ParserOutputBaseProjectStructure & {
	projectType: 'blog';
	details: BlogPost;
};

type ParserOutputSoftwareStructure = ParserOutputBaseProjectStructure & {
	projectType: 'software';
	details: Software;
};

export type ParserOutputProjectStructure =
	| ParserOutputBlogStructure
	| ParserOutputSoftwareStructure;

export type ParserOutputStructure =
	| ParserOutputUserStructure
	| ParserOutputProjectStructure
	| ParserOutputEmojiStructure;

export function parseMentions(text: string): ParserOutputStructure[] {
	const parts = [];
	let buffer = '';

	for (let i = 0; i < text.length; i++) {
		if (text[i] === '@') {
			// Check for user mentions
			const match = text.slice(i).match(USERNAME_MENTION_REGEX);
			if (match) {
				// Add the buffer content as plain text
				if (buffer) {
					parts.push(buffer);
					buffer = '';
				}
				// Add the user mention
				parts.push({ type: 'user', username: match[1] } as ParserOutputUserStructure);
				// Skip the processed part
				i += match[0].length - 1;
				continue;
			}
		} else if (text[i] === ':') {
			// Check for emojis
			const emojiEnd = text.indexOf(':', i + 1);
			if (emojiEnd !== -1) {
				// Add the buffer content as plain text
				if (buffer) {
					parts.push(buffer);
					buffer = '';
				}
				// Check for emoji IDs
				const match = text.slice(i).match(EMOJI_MENTION_REGEX);
				// Check if the regex matches & the emoji exists
				if (match && emojiList.includes(match[1])) {
					// Add the emoji
					parts.push({ type: 'emoji', emojiId: match[1] } as ParserOutputEmojiStructure);
					// Skip the processed part
					i = emojiEnd;
					continue;
				}
			}
		} else if (text[i] === '#') {
			// Check for project mentions
			const match = text.slice(i).match(PROJECT_MENTION_REGEX);

			if (match) {
				// Add the buffer content as plain text
				if (buffer) {
					parts.push(buffer);
					buffer = '';
				}

				const projectId = match[1];
				// Check the project type
				const projectType = blogPosts.find(({ id }) => id === projectId) ? 'blog' : 'software';
				// Find the project's data
				const details =
					projectType === 'blog'
						? blogPosts.find(({ id }) => id === projectId)
						: softwareData.find(({ id }) => id === projectId);

				if (details) {
					parts.push({
						type: 'project',
						projectId,
						projectType,
						details,
					} as ParserOutputProjectStructure);
					// Skip the processed part
					i += match[0].length - 1;
					continue;
				}
			}
		}

		// Add characters to the buffer
		buffer += text[i];
	}

	// Add any remaining buffer content as plain text
	if (buffer) {
		parts.push(buffer);
	}

	const concenatedResult = [];
	let currentString = '';

	for (const item of parts) {
		if (typeof item === 'string') {
			currentString += item;
		} else {
			if (currentString !== '') {
				concenatedResult.push(currentString);
				currentString = '';
			}
			concenatedResult.push(item);
		}
	}

	if (currentString !== '') {
		concenatedResult.push(currentString);
	}

	return concenatedResult as ParserOutputStructure[];
}
