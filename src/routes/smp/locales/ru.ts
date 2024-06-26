import en from './en';
import type { LanguageSchema } from '.';

export default {
	...en,
	registerSignIn: 'Регистрация/Вход',
	language: {
		button: 'Язык',
		name: 'Русский',
	},
	registerNowText: 'Зарегистрируйте себя и свою команду, чтобы присоединиться к Habile SMP',
	registerNowCta: 'Регистрация открыта (БЕТА)',
	registrationsCta: 'Присоединится к Discord',
	info: {
		dates: 'Будет открыт с 30 июня по 30 сентября',
		slots: '40 игроков',
		version: 'Java 1.20.6. Пиратские версии разрешены.',
		mode: 'Сложная сложность, включены плагины',
	},
	about: {
		title: 'О Habile SMP',
		overview:
			'Habile SMP (Сервер по выживанию) - это многопользовательский сервер Minecraft, где игроки со всего мира собираются вместе, чтобы строить, сражаться, выживать и творить!',
		registration:
			"Он предоставляется бесплатно Clembs'ом. Любой желающий может зарегистрироваться и играть, как ему вздумается, поскольку никаких конкретных целей не ставится.",
		livestreaming:
			'Приветствуются прямые трансляции (с хэштегом #habile-smp), создание команд и общение на сервере Discord.',
		plugins:
			'Для расширения возможностей ванильного Minecraft используется несколько плагинов, датапаков для генерации поведения и местности.',
		detailsCta: 'Подробности',
		technicals: {
			title: 'Конфигурация сервера',
			config: 'Конфигурация сервера',
			world: 'Настройки мира',
			datapacks: 'Датапаки',
			plugins: 'плагины',
			soon: 'Скоро...',
		},
	},
	gettingStarted: {
		title: 'Приступая к игре',
		step1: 'Установите Майнкрафт версии 1.20.6 (Не последнюю версию!)',
		protip: {
			title: 'Про-совет!',
			description: (sodium: string, optifine: string) =>
				`Для лучшего опыта установите <a href="${sodium}" target="_blank" rel="noopener noreferrer">модпак для повышения производительности</a>, если вы используете видеокарту. В ином случае установите <a href="${optifine}" target="_blank" rel="noopener noreferrer">OptiFine</a>.`,
		},
		step2: 'Когда игра запустится, нажмите "Сетевая игра".',
		step3: 'Нажмите "Добавить" и введите smp.clembs.com в адресную строку.',
		step4: 'Нажмите "Готово" и затем два раза нажмите на добавленный сервер.',
		step5:
			'Вам будет предложено создать пароль, чтобы предотвратить кражу данных.<br />Как только это будет сделано, войдите, и вы в игре!',
	},
	rules: {
		title: 'Правила',
		cheats:
			'Нельзя использовать читы, взломы, абьюз эксплоиты или создавание лагов с намеренной целью.',
		oneProfile: 'Используйте только один Майнкрафт аккаунт чтобы заходить на сервер.',
		attacks: 'Не пытайтесь кибератаковать сервер (DDoS, и т.д.)',
		commonSense:
			'Руководствуйтесь здравым смыслом, не будьте вспыльчивыми, не используйте оскорблений и т.д.',
		englishOnly:
			'Основной язык публичного чата - <b>английский</b> (Использовать переводы допустимо).',
		everythingElse: 'Всё остальное, включая грифинг, спаун-киллинг и т.д.  <b>разрешено</b>.',
	},
	register: {
		...en.register,
		back: 'Назад',
		player: {
			type: {
				title: 'Какой тип аккаунта будете использовать?',
				description: 'Не осуждаем, это будет необходимо для следующих шагов.',
				premium: {
					label: 'Премиум',
					description: 'Вы приобрели официальную копию Minecraft.',
				},
				cracked: {
					label: 'Пиратский',
					description: 'Вы используете копию Minecraft бесплатно.',
				},
			},
			usernamePremium: {
				title: 'Ваш никнейм в Minecraft Java?',
				description:
					'Это Ваш никнейм, который видят другие игроки, когда Вы, например, пишете в чат. НЕ используйте свой тэг Xbox.',
				textInputLabel: 'Никнейм Minecraft',
				placeholder: 'Пример: Clembs',
				confirmButton: 'Да, это я!',
			},
			usernameCracked: {
				title: 'Какой никнейм Вы будете использовать?',
				description:
					'Это никнейм, который Вы будете использовать на протяжении всего жизненного цикла SMP. Он может быть каким угодно.',
				textInputLabel: 'Никнейм',
				confirmButton: 'Записал(а)!',
			},
			success: {
				...en.register.player.success,
				title: 'Ваш аккаунт был зарегистрирован!',
				paragraph1: 'Вот ваш уникальный пароль на случай, если вам нужно будет войти:',
				paragraph2: 'Сохраните его в безопасное место!',
			},
		},
		team: {
			title: 'Регистрация команды',
			description:
				'Команды могут состоять по размеру только до 5 игроков (пока что). Подготовьте частную команду с кодом приглашения, или создайте его публично для всех желающих.',
			disclaimer: 'Имейте в виду: Вы НЕ сможете изменить эти настройки позже!',
			nameInputLabel: 'Название команды',
			colorInputLabel: 'Цвет команды',
			privateTeam: {
				label: 'Частная команда',
				description:
					'В эту команду могут вступить только те, у кого при себе есть код приглашения. Делитесь им с осторожностью.',
				inviteCodeInputLabel: 'Код приглашения',
				inviteCodePlaceholder: '6 цифр',
			},
			submitButton: 'Зарегистрировать команду',
		},
	},
	credits: 'DankNil, Sovencho, Nadav & SuperKnuckles',
} satisfies LanguageSchema;
