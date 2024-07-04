export default {
	registerSignIn: 'Register/Sign in',
	language: {
		button: 'Language',
		name: 'English',
	},
	registrationsCta: 'Join the Discord',
	registerNowText: 'Register yourself to join the Habile SMP!',
	registerNowCta: 'Register now (BETA)',
	viewCreateTeamsText: 'Join or create a team to play with others (optionally).',
	viewCreateTeamsCta: 'Teams',
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
			success: {
				title: 'Your account has been registered!',
				paragraph1: "Here's your unique password in case you need to log back in:",
				paragraph2: 'Keep it somewhere safe!',
				joinCreateTeam: 'Join or create a team',
			},
		},
		team: {
			title: 'Create a team',
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
			submitButton: 'Create team',
		},
	},
	login: {
		hasAccount: 'Already have an account?',
		noAccount: 'Not registered on the SMP?',
		register: 'Register',
		logIn: 'Log in',
		title: 'Log into your Habile SMP account',
		description:
			'Not to be confused with your Minecraft account or your clembs.com account (used in Clembs Comments).',
		forgotPassword: 'Forgot your password? Ask Clembs on Discord for help.',
		usernameInputLabel: 'Username',
		passwordInputLabel: 'Password (given to you on registration)',
	},
	teams: {
		title: 'Habile SMP Teams',
		description:
			'Here are all of the teams participating in the Habile SMP. Join one or create your own! Locked teams require an invite code.',
		joinTeam: 'Join a team',
		members: 'members',
		full: 'Full',
		leader: 'Leader',
		modalJoin: {
			title: 'Join team {name}?',
			locked: {
				description: 'This team is invite-only. Please enter the invite code to join it.',
				inputLabel: 'Invite code',
				joinButton: 'Join team',
			},
		},
		modalLeave: {
			title: 'Are you sure to leave your team?',
			description:
				'You will no longer be part of this team. You can join back (you will need an invite code if the team is invite-only).',
			leaveButton: 'Leave team',
		},
		modalSuccess: {
			title: 'Welcome to team {name}!',
			description: 'You are now part of the team. Good luck out there!',
		},
		currentTeam: 'Your current team',
	},
};
