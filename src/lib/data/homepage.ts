export interface HeroStat {
	value: string;
	label: string;
}

export interface ProcessStep {
	title: string;
	description: string;
}

export interface PricingTier {
	name: string;
	price: string;
	unit: string;
	features: string[];
	highlighted?: boolean;
	cta: string;
}

export interface FaqItem {
	question: string;
	answer: string;
}

export const heroStats: HeroStat[] = [
	{ value: '2', label: 'studios' },
	{ value: '45m²', label: "d'espace" },
	{ value: '+500', label: 'heures enregistrées' }
];

export const processSteps: ProcessStep[] = [
	{
		title: 'Réservez',
		description: 'Choisissez votre créneau en ligne en quelques clics.'
	},
	{
		title: 'Arrivez',
		description: 'On vous accueille et on prépare le studio pour vous.'
	},
	{
		title: 'Enregistrez',
		description: 'Installez-vous et lancez votre session dans un cadre pro.'
	},
	{
		title: 'Recevez',
		description: 'Récupérez vos fichiers audio masterisés sous 48h.'
	}
];

export const pricingTiers: PricingTier[] = [
	{
		name: 'Standard',
		price: '-- €',
		unit: '/h',
		features: [
			'Accès studio équipé',
			'Micro et casque fournis',
			'Fichiers WAV livrés sous 48h',
			'Assistance technique sur place'
		],
		cta: 'Réserver'
	},
	{
		name: 'Pro',
		price: '-- €',
		unit: '/h',
		features: [
			'Tout le Standard',
			'Ingénieur son dédié',
			'Montage et nettoyage audio',
			'Mixage professionnel',
			'Livraison sous 24h'
		],
		highlighted: true,
		cta: 'Réserver'
	},
	{
		name: 'Journée',
		price: '-- €',
		unit: '/jour',
		features: [
			'Tout le Pro',
			'Accès studio 8h consécutives',
			'Enregistrement multi-épisodes',
			'Post-production incluse',
			'Livraison prioritaire'
		],
		cta: 'Réserver'
	}
];

export const faqItems: FaqItem[] = [
	{
		question: 'Quel équipement est disponible au studio ?',
		answer:
			'Nos studios sont équipés de micros professionnels, casques de monitoring, interface audio et logiciel de capture. Tout est prêt à votre arrivée.'
	},
	{
		question: "Combien de personnes peuvent enregistrer en même temps ?",
		answer:
			"Nos studios accueillent jusqu'à 4 personnes simultanément, avec un micro et un casque par participant."
	},
	{
		question: 'Quels sont les horaires du studio ?',
		answer:
			'Le studio est ouvert du lundi au samedi, de 9h à 21h. Des créneaux en soirée ou le dimanche sont disponibles sur demande.'
	},
	{
		question: 'Comment sont livrés les fichiers audio ?',
		answer:
			'Vous recevez vos fichiers audio en WAV haute qualité par lien de téléchargement sécurisé, dans les délais correspondant à votre formule.'
	},
	{
		question: "Quelle est la politique d'annulation ?",
		answer:
			"Toute annulation effectuée plus de 48h avant la session est intégralement remboursée. En deçà de 48h, des frais d'annulation s'appliquent."
	},
	{
		question: 'Proposez-vous des services de post-production ?',
		answer:
			'Oui, nos formules Pro et Journée incluent le montage, le nettoyage et le mixage audio. Ces services sont aussi disponibles à la carte.'
	},
	{
		question: 'Quels micros utilisez-vous ?',
		answer:
			'Nous utilisons des micros dynamiques et statiques de qualité broadcast, adaptés aux voix parlées et au format podcast.'
	}
];
