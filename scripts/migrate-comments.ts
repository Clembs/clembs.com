import { SQL, write } from 'bun';

if (!process.env.POSTGRES_URL || !process.env.PG_PASSWORD) {
	throw new Error('POSTGRES_URL and PG_PASSWORD env vars are required');
}

// @ts-expect-error bun forgot to make the optional params optional lol
const sql = new SQL({
	url: process.env.POSTGRES_URL,
	password: process.env.PG_PASSWORD,
});

export const letterColors: Record<string, string> = {
	a: '#C1A1E1',
	b: '#29C2D1',
	c: '#F7D29A',
	d: '#E1B0A2',
	e: '#5AD66E',
	f: '#FAE5C3',
	g: '#D693A0',
	h: '#8A87D8',
	i: '#63A69F',
	j: '#F25C05',
	k: '#C18F64',
	l: '#9A9CB1',
	m: '#BCDF4E',
	n: '#DF4D9F',
	o: '#EAA947',
	p: '#3F5AFC',
	q: '#B444AE',
	r: '#8D6A31',
	s: '#31C0FF',
	t: '#7C1E5D',
	u: '#E2C9E0',
	v: '#BB3D88',
	w: '#48DFB0',
	x: '#C7E385',
	y: '#A31BC4',
	z: '#FC52F7',
	A: '#9126A0',
	B: '#3B0A3A',
	C: '#643FFF',
	D: '#42FA64',
	E: '#8C8D75',
	F: '#D47226',
	G: '#AF09D5',
	H: '#C5A3AA',
	I: '#9B5F5F',
	J: '#E5E760',
	K: '#F0BB16',
	L: '#A303D8',
	M: '#A84642',
	N: '#46E620',
	O: '#E85A79',
	P: '#C726D9',
	Q: '#C95D46',
	R: '#A3A65A',
	S: '#EFC5B4',
	T: '#65E58C',
	U: '#B883C6',
	V: '#E0D81B',
	W: '#83EC07',
	X: '#927B67',
	Y: '#FA9231',
	Z: '#2DFA1F',
	'0': '#FF1D47',
	'1': '#1685ED',
	'2': '#E57FA1',
	'3': '#9B67B6',
	'4': '#5A91F6',
	'5': '#E0FF2E',
	'6': '#F22B3E',
	'7': '#FF8A4D',
	'8': '#9C1610',
	'9': '#C1ECF2',
	'!': '#9B4D74',
	'#': '#DDC7C7',
	$: '#684BC1',
	'%': '#6F4C1D',
	'&': '#7546F9',
	"'": '#5E9937',
	'*': '#8E9B68',
	'+': '#F81EF1',
	'-': '#B1532A',
	'/': '#943C49',
	'=': '#A45C5F',
	'?': '#F399E2',
	'^': '#F62C26',
	_: '#E1476A',
	'`': '#5A8D13',
	'{': '#68C2D5',
	'|': '#9399A9',
	'}': '#C32C7A',
	'~': '#4A7849',
	' ': '',
};

const comments: {
	id: string;
	content: string;
	parent_id: string | null;
	created_at: Date;
	user_id: string | null;
	username: string | null;
	badges: string | null;
	user_joined_at: Date | null;
}[] = await sql`
  SELECT 
    comments.id AS id,
    comments.content,
    comments.user_id,
    comments.parent_id,
    comments.created_at,
    users.id AS user_id,
    users.username,
    users.badges,
    users.created_at AS user_joined_at
  FROM comments 
  LEFT JOIN users ON comments.user_id = users.id
  WHERE comments.project_id IS NULL
  ORDER BY comments.created_at DESC
  `;

async function fetchChildComments(parentId: string) {
	return await Promise.all(comments.filter((c) => c.parent_id === parentId).map(toComment));
}

type UserBadge = 'VERIFIED' | 'SUPPORTER' | 'CLEMBS';

function rankBadges(badges: string[]): UserBadge[] {
	const badgeImportance = ['CLEMBS', 'SUPPORTER'];

	const sortedBadges = [...badges]
		.filter((badge) => badgeImportance.includes(badge))
		.sort((a, b) => badgeImportance.indexOf(a) - badgeImportance.indexOf(b)) as UserBadge[];

	return sortedBadges;
}

async function toComment(c: (typeof comments)[number]) {
	const votes: {
		type: 'UPVOTE' | 'DOWNVOTE';
	}[] = await sql`
SELECT user_comment_vote.type 
FROM user_comment_vote
WHERE user_comment_vote.comment_id = ${c.id}`;

	const score = votes.reduce((acc, vote) => acc + (vote.type === 'UPVOTE' ? 1 : -1), 0);

	return {
		// remove all the keys we don't need
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		...(({ user_id, username, badges, user_joined_at, ...o }) => o)(c),
		score,
		author: {
			username: c.username || 'Guest',
			// split badges into an array
			badges: rankBadges(c.badges?.replace(/{|}/g, '').split(',') || []),
			joined_at: c.user_joined_at,
			gradient: {
				from: letterColors[c.username?.[0]?.trim() || 'G'],
				to: letterColors[c.username?.at(-1)?.trim() || 't'],
			},
		},
		child_comments: await fetchChildComments(c.id),
	};
}

const cleanedComments = await Promise.all(
	comments.filter(({ parent_id }) => !parent_id).map(toComment),
);

// write to JSON
write('./src/lib/data/comments.json', JSON.stringify(cleanedComments, null, 2));
