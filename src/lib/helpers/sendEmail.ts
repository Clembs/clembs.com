const baseURL = 'https://api.sendgrid.com/v3/mail/send';
import { SENDGRID_API_KEY } from '$env/static/private';

export function emailHtmlTemplate(slot: string, url?: URL) {
	return `<!DOCTYPE html>
<html>
	<head>
		<!--[if !mso]><!-->
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<!--<![endif]-->
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
	</head>
	<body>
	<center
		padding: 8px;
	>
		<div
			style="
				font-family: sans-serif;
				padding: 16px;
				border-radius: 16px;
				border: 1px solid black;
				background-color: white;
				box-shadow: 0 2px 0 0 black;
				max-width: 750px;
				padding: 16px;
				text-align: left;
			">
				${slot.replace('href="#', `href="${url?.href}#`).replace('href="/', 'href="https://clembs.com/')}
			</div>
		</center>
	</body>
</html>`;
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
