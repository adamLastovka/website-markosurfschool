import { getEntry } from 'astro:content';
import type { Locale } from './i18n';

export type PageSlug = 'home' | 'surf' | 'kitesurf' | 'contact';

export async function getPage(locale: Locale, slug: PageSlug) {
	const entry = await getEntry('pages', `${locale}/${slug}`);

	if (!entry) {
		throw new Error(`Missing ${locale} content for page "${slug}"`);
	}

	return entry.data;
}

export async function getSiteSettings(locale: Locale) {
	const entry = await getEntry('settings', `${locale}/site`);

	if (!entry) {
		throw new Error(`Missing site settings for locale "${locale}"`);
	}

	return entry.data;
}
