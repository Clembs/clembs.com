const baseURL = 'https://api.sendgrid.com/v3/mail/send';
import { SENDGRID_API_KEY } from '$env/static/private';

export function emailHtmlTemplate(slot?: string) {
	return `<!DOCTYPE html>
<body style="background-color: #f0f0f0">
	<main
		style="
			font-family: sans-serif;
			padding: 16px;
			border-radius: 16px;
			border: 1px solid black;
			background-color: white;
			box-shadow: 0 2px 0 0 black;
			max-width: max-content;
			margin: 32px auto;
		"
	>

		${slot}
	</main>
</body>`;
}

export async function sendEmail(
	email: {
		html: string;
		subject: string;
	},
	emailAddress: string
) {
	await fetch(baseURL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${SENDGRID_API_KEY}`,
		},
		body: JSON.stringify({
			personalizations: [
				{
					to: [
						{
							email: emailAddress,
						},
					],
				},
			],
			from: {
				email: 'habile@clembs.com',
				name: 'Habile from clembs.com',
			},
			subject: email.subject,
			content: [
				{
					type: 'text/html',
					value: email.html,
				},
			],
		}),
	});
}
