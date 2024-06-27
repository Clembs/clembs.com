export default {
	registerSignIn: 'Register/Sign in',
	language: {
		button: 'Language',
		name: 'English',
	},
	registrationsOpen: 'Registrations open June 26',
	registerNowText: 'Register yourself and your team to join the Habile SMP!',
	registerNowCta: 'Register now (BETA)',
	registrationsCta: 'Join the Discord',
	info: {
		dates: 'Open June 30<br/>— September 30',
		slots: '40 player slots',
		version: 'Java Edition 1.20.6, cracks allowed',
		mode: 'Hard mode, plugins enabled',
	},
	about: {
		title: 'About Habile SMP',
		overview:
			'The Habile SMP (Survival Multi Player) is a multiplayer Minecraft server where players from around the world come together to build, fight, survive and create!',
		registration:
			'It is provided free of charge by Clembs. Anyone is free to register and to play however they want, as no specific goals are given.',
		livestreaming:
			'Livestreaming (with the #habile-smp hashtag), forming teams and engaging on the Discord server is heavily encouraged.',
		plugins:
			'Several plugins, behavior and terrain generation datapacks are used to enhance the vanilla Minecraft experience.',
		detailsCta: 'More details',
		technicals: {
			title: 'Technical details',
			config: 'Server configuration',
			world: 'World settings',
			datapacks: 'Datapacks',
			plugins: 'Plugins',
			soon: 'Coming soon',
		},
	},
	gettingStarted: {
		title: 'Getting started',
		step1: 'Install Minecraft on version 1.20.6 (not the latest!)',
		protip: {
			title: 'Pro tip!',
			description: (sodium: string, optifine: string) =>
				`For best gameplay, install a <a href="${sodium}" target="_blank" rel="noopener noreferrer">performance modpack</a> if you're using a graphics card or <a href="${optifine}" target="_blank" rel="noopener noreferrer">OptiFine</a> otherwise.`,
		},
		step2: 'When the game launches, select "Multiplayer".',
		step3: 'Click "Add Server" and enter smp.clembs.com in the address field.',
		step4: 'Click "Done", then double-click the newly added server.',
		step5:
			"You'll be prompted to create a password, to prevent data theft.<br />Once that's made, log in and you're in!",
	},
	rules: {
		title: 'Rules',
		cheats: "Don't use cheats, hacks, abuse exploits, or create lag on purpose.",
		oneProfile: 'Only use one Minecraft profile to log into the server.',
		attacks: "Don't attempt to cyberattack the server (DDoS, etc.)",
		commonSense: "Use common sense, don't be harsh, don't use slurs, bigotry, etc.",
		englishOnly: 'The public chat should be in <b>english only</b> (translators are OK).',
		everythingElse:
			'Everything else, including griefing, spawn-killing, etc. is <b>authorized</b>.',
	},
	register: {
		back: 'Back',
		nothing: 'Nothing left to register! Wait until June 30 for the SMP to open.',
		what: {
			title: 'What are you registering?',
			myself: {
				label: 'Myself',
				description: 'Register on the SMP members list.',
			},
			team: {
				label: 'A team',
				description: 'Register your team on the SMP. You must have registered yourself first.',
			},
		},
		player: {
			type: {
				title: 'What type of account will you use?',
				description: "No judgement here, it's just necessary for the next steps.",
				premium: {
					label: 'Premium account',
					description: 'You paid for a legit copy of Minecraft.',
				},
				cracked: {
					label: 'Cracked account',
					description: "You're using a free copy of Minecraft.",
				},
			},
			usernamePremium: {
				title: 'What is your Minecraft Java username?',
				description: 'This is the username seen in your chat, for example, NOT your Xbox Gamertag.',
				textInputLabel: 'Minecraft username',
				placeholder: 'e.g. Clembs',
				confirmButton: "Yup, that's me!",
			},
			usernameCracked: {
				title: 'What username will you use on the server?',
				description:
					'This is a username you will keep throughout your adventure on the SMP. It can be anything you want.',
				textInputLabel: 'Username',
				confirmButton: 'Got it!',
			},
		},
		team: {
			title: 'Register your team',
			description:
				'Teams can have up to 5 players (for now). Set up a private party with a unique invite code, or make a public one for anyone to join.',
			disclaimer: 'You can not change any of these settings later!',
			nameInputLabel: 'Team name',
			colorInputLabel: 'Team color',
			privateTeam: {
				label: 'Make team invite-only',
				description:
					'Only players with the invite code will be able to join. Share your invite code carefully.',
				inviteCodeInputLabel: 'Invite code',
				inviteCodePlaceholder: '6 numbers',
			},
			submitButton: 'Register team',
		},
	},
};
