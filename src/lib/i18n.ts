import { getRelativeLocaleUrl } from 'astro:i18n';

export const locales = ['es', 'en'] as const;
export type Locale = (typeof locales)[number];

export const isLocale = (value: string | undefined): value is Locale =>
	locales.includes(value as Locale);

export const localizedPath = (locale: Locale, path = '') =>
	getRelativeLocaleUrl(locale, path);

export const alternateLocale = (locale: Locale): Locale =>
	locale === 'es' ? 'en' : 'es';

export const localeName = (locale: Locale) =>
	locale === 'es' ? 'Español' : 'English';
