import type { LanguageSchema } from '.';
import en from './en';

export default {
	...en,
	language: {
		button: 'Langue',
		name: 'Français',
	},
	registrationsOpen: 'Inscriptions ouvrent le 26 juin',
	registerNowText: 'Inscrivez-vous et votre équipe pour rejoindre le Habile SMP!',
	registerNowCta: "S'inscrire (BÊTA)",
	registrationsCta: 'Rejoindre le Discord',
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
		what: {
			title: 'Que souhaitez-vous inscrire ?',
			myself: {
				label: 'Moi-même',
				description: "S'inscrire sur la liste des joueurs du SMP.",
			},
			team: {
				label: 'Une équipe',
				description:
					'Inscrire une nouvelle équipe sur le SMP. Vous devez vous être inscrit au préalable.',
			},
		},
	},
} satisfies LanguageSchema;
