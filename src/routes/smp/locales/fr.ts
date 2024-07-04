import type { LanguageSchema } from '.';
import en from './en';

export default {
	...en,
	myAccount: 'Mon compte',
	registerSignIn: "S'inscrire/Se connecter",
	language: {
		button: 'Langue',
		name: 'Français',
	},
	registerNowText: 'Inscrivez-vous et votre équipe pour rejoindre le Habile SMP!',
	registerNowCta: "S'inscrire (BÊTA)",
	registrationsCta: 'Rejoindre le Discord',
	viewCreateTeamsText: "Rejoignez ou créez une équipe pour jouer avec d'autres (facultatif).",
	viewCreateTeamsCta: 'Équipes',
	info: {
		dates: 'Ouvert du 30 juin<br/>au 30 septembre',
		slots: '40 joueurs maxi',
		version: 'Java Edition 1.20.6, cracks autorisés',
		mode: 'Mode difficile, plugins activés',
	},
	about: {
		title: 'À propos du Habile SMP',
		overview:
			"Le Habile SMP (Survival Multi Player, Multijoueur survie) est un serveur Minecraft multijoueur où des joueurs du monde entier s'assemblent pour construire, combattre, survivre et créer !",
		registration:
			"Il est géré par Clembs. Quiconque est libre de s'inscrire et d'y jouer comme bon leur semble, vu qu'aucun objectif n'est donné.",
		livestreaming:
			"La diffusion en direct (avec le hashtag #habile-smp), la formation d'équipes et la participation sur le serveur Discord sont vivement encouragés.",
		plugins:
			"Plusieurs plugins ainsi que des datapacks de comportement du jeu et de génération du terrain sont utilisés pour améliorer l'expérience Minecraft de base.",
		detailsCta: 'Plus de détails',
		technicals: {
			title: 'Détails techniques',
			config: 'Configuration du serveur',
			world: 'Paramètres du monde',
			datapacks: 'Datapacks',
			plugins: 'Plugins',
			soon: 'À venir',
		},
	},
	gettingStarted: {
		title: 'Premiers pas',
		step1: 'Installez Minecraft en version 1.20.6 (pas la dernière !)',
		protip: {
			title: 'Conseil de pro !',
			description: (sodium: string, optifine: string) =>
				`Pour l'expérience la plus optimale, installez un <a href="${sodium}" target="_blank" rel="noopener noreferrer">pack de mods de performance</a> si vous utilisez une carte graphique, ou <a href="${optifine}" target="_blank" rel="noopener noreferrer">OptiFine</a> autrement.`,
		},
		step2: 'Quand le jeu est lancé, selectionnez "Multijoueur".',
		step3: 'Cliquez sur "Ajouter un Serveur" et entrez smp.clembs.com dans la barre d\'adresse.',
		step4: 'Cliquez sur "Fini", puis double-cliquez sur le serveur nouvellement ajouté.',
		step5:
			'On va vous demander de créer un mot de passe, pour éviter le vol de vos données.<br />Une fois fait, connectez-vous et voilà !',
	},
	rules: {
		title: 'Règles',
		cheats:
			"N'utilisez pas de modifications de triche, n'abusez pas des bugs, ne créez pas de lag volontairement.",
		oneProfile: "N'utilisez qu'un profil Minecraft pour vous connecter au serveur.",
		attacks: "N'essayez pas de cyberattaquer le serveur (via un DDoS, etc.)",
		commonSense:
			"Soyez de bonne foi, respectez-vous et n'employez pas de vocabulaire trop vulgaire, etc.",
		englishOnly: 'Le chat public doit être en <b>anglais uniquement</b> (traducteurs acceptés).',
		everythingElse:
			"Tout le reste, comme vandaliser des propriétés, tuer dès l'entrée, etc. est <b>autorisé</b>.",
	},
	register: {
		...en.register,
		back: 'Retour',
		player: {
			type: {
				title: 'Sur quel type de compte allez-vous jouer ?',
				description: "Aucun jugement, c'est juste une info utile pour la suite.",
				premium: {
					label: 'Compte premium',
					description: 'Vous avez acheté une copie légale de Minecraft.',
				},
				cracked: {
					label: 'Compte cracké',
					description: 'Vous utilisez une copie gratuite de Minecraft.',
				},
			},
			usernameCracked: {
				title: 'Quel pseudo allez-vous utiliser sur le serveur ?',
				description:
					"C'est un pseudo que vous allez devoir garder tout au long de votre aventure sur le SMP.",
				textInputLabel: 'Pseudo',
				confirmButton: 'On est bon !',
			},
			usernamePremium: {
				title: 'Quel est votre pseudo Minecraft Java ?',
				description:
					"C'est le pseudo que les autres joueurs voient quand vous parlez dans le chat, par exemple, et PAS votre Gamertag Xbox.",
				textInputLabel: 'Pseudo Minecraft',
				placeholder: 'ex : Clembs',
				confirmButton: "C'est moi !",
			},
			success: {
				title: 'Votre compte a été inscrit !',
				paragraph1: 'Voici un mot de passe au cas où vous auriez besoin de vous reconnecter :',
				paragraph2: 'Notez-le quelque part en sécurité !',
				joinCreateTeam: 'Rejoindre ou créer une équipe',
			},
		},
		team: {
			title: 'Créer une équipe',
			description:
				"Une équipe peut avoir jusqu'à 5 membres (pour le moment). Créez un groupe privé sur invitation, ou un public où tout le monde peut rejoindre.",
			disclaimer: 'Vous ne pourrez pas modifier ces paramètres plus tard !',
			nameInputLabel: "Nom de l'équipe",
			colorInputLabel: "Couleur de l'équipe",
			privateTeam: {
				label: "Rendre l'équipe privée",
				description:
					"Seuls les joueurs avec le code d'invitation pourront rejoindre. Partagez-le avec parcimonie.",
				inviteCodeInputLabel: "Code d'invitation",
				inviteCodePlaceholder: '6 chiffres',
			},
			submitButton: "Créer l'équipe",
		},
	},
	teams: {
		title: 'Équipes Habile SMP',
		description:
			"Voici toutes les équipes qui participent au Habile SMP. Rejoignez-en une ou créez la vôtre ! Les équipes verrouillées nécessitent un code d'invitation.",
		full: 'Complet',
		joinTeam: 'Rejoindre une équipe',
		members: 'membres',
		modalJoin: {
			title: "Rejoindre l'équipe {name} ?",
			locked: {
				description:
					"Cette équipe est privée. Veuillez entrer le code d'invitation pour la rejoindre.",
				inputLabel: "Code d'invitation",
				joinButton: "Rejoindre l'équipe",
			},
		},
		modalLeave: {
			title: 'Êtes-vous sûr de vouloir quitter votre équipe ?',
			description:
				"Vous n'en ferez plus partie. Vous pourrez y revenir (avec une invitation si cette équipe en requiert une).<br /><br/>Note : Cette action, pour l'instant, ne vous retire PAS de l'équipe dans Minecraft. Contactez Clembs pour qu'il vous change d'équipe si besoin.",
			leaveButton: "Quitter l'équipe",
		},
		modalSuccess: {
			title: "Bienvenue dans l'équipe {name} !",
			description: "Vous faites maintenant partie de l'équipe. Bonne chance !",
		},
		leader: 'Créateur',
		currentTeam: {
			description: 'Description',
			noDescription: "Aucune description n'a été donnée...",
			inviteCode: "Code d'invitation",
			members: 'Membres',
		},
	},
} satisfies LanguageSchema;
