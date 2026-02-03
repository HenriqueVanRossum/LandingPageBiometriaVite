import ptBR from './locales/pt-BR.json';

const FALLBACK = 'en-US';

// 👉 idiomas carregados no bundle inicial
const SYNC_DICTS = {
	'pt-BR': ptBR,
};

// 👉 idiomas lazy (não críticos)
const LOADERS = {
	'en-US': () => import('./locales/en-US.json'),
	'pt-PT': () => import('./locales/pt-PT.json'),
	'es-ES': () => import('./locales/es-ES.json'),
	'fr-FR': () => import('./locales/fr-FR.json'),
	'de-DE': () => import('./locales/de-DE.json'),
	'ru-RU': () => import('./locales/ru-RU.json'),
};

export function detectBrowserLocale() {
	const prefs = (navigator.languages?.length ? navigator.languages : [navigator.language]).filter(Boolean);

	for (const raw of prefs) {
		const lang = raw.replace('_', '-');

		if (SYNC_DICTS[lang] || LOADERS[lang]) return lang;

		const base = lang.split('-')[0];
		const candidate = Object.keys({...SYNC_DICTS, ...LOADERS}).find((k) => k.startsWith(base + '-'));

		if (candidate) return candidate;
	}

	return FALLBACK;
}

function getNested(obj, path) {
	return path.split('.').reduce((acc, key) => {
		return acc && acc[key] !== undefined ? acc[key] : undefined;
	}, obj);
}

export async function createI18n(locale) {
	const dict = SYNC_DICTS[locale] ?? (await (LOADERS[locale] || LOADERS[FALLBACK])()).default;

	const fallbackDict = SYNC_DICTS[FALLBACK] ?? (await LOADERS[FALLBACK]()).default;

	function t(key, vars) {
		let str = dict[key] ?? fallbackDict[key] ?? getNested(dict, key) ?? getNested(fallbackDict, key) ?? key;

		if (typeof str !== 'string') return key;

		if (vars) {
			for (const [k, v] of Object.entries(vars)) {
				str = str.replaceAll(`{${k}}`, String(v));
			}
		}

		return str;
	}

	return {locale, t};
}
