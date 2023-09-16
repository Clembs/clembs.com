const baseURL = 'https://api.sendgrid.com/v3/mail/send';
import { SENDGRID_API_KEY } from '$env/static/private';

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
