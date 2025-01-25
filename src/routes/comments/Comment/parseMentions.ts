import { EMOJI_MENTION_REGEX } from '../../../lib/helpers/regex';

export const emojiList = ['flushed', 'happy', 'laugh', 'neutral', 'scared', 'encarada'];

export type ParserOutputStructure =
	| string
	| {
			type: 'emoji';
			emojiId: string;
	  };

export function parseEmojis(text: string): ParserOutputStructure[] {
	const parts = [];
	let buffer = '';

	for (let i = 0; i < text.length; i++) {
		if (text[i] === ':') {
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
					parts.push({ type: 'emoji', emojiId: match[1] } as ParserOutputStructure);
					// Skip the processed part
					i = emojiEnd;
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
