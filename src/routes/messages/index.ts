export interface Message {
	content: string;
	identity?: string;
	color: string;
	date?: string;
}

export const splashes = [
	`Curieux à mon sujet ? Comme c'est mignon...`,
	"Parce que j'avais la flemme d'installer une appli fait pour...",
	'Tout ce que vous dites est sous anonymat!',
	"Tu te poses une question ? J'y réponds !",
	'Réponses uniquement sur mon IG privé !',
	'Sois poli et respectueux... ou pas, OSEF !',
	'Site commencé à 23h et fini à 2h...',
	'Your base are belong to us!',
	'Appli faite par mes soins en ~3h',
	'Produit pur Carcassonnais!',
	'Tu lis ce texte ?',
	'Rafraîchis la page pour plus de textes 😜d🥺é🥵g🤣a😶‍🌫️n😭t🥶é😳s🍤!!',
	'Oseras-tu dévoiler un indice sur ton identité ?',
	'Plus de fonctionnalités soon™',
	'Streams tous les samedis après-midi (sauf congés bac)',
	'Alors, ça révise pas le bac ?',
	'Apprends-en plus sur ma vie !',
	'Alors comme ça, ça demande des renseignements ?',
	"Demande-moi n'importe quoi !",
	'Il est quand même pas trop mal fait ce site, nan ?',
	"Site libre d'expression depuis 2023."
];

export const colors = {
	black: '#000000',
	red: '#E2442F',
	purple: '#987fff',
	blue: '#3B8FFF',
	green: '#23A094'
} as Record<string, string>;
