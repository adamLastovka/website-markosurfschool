import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const imageSchema = z.object({
	image: z.string(),
	alt: z.string(),
	caption: z.string().optional(),
});

const seoFields = {
	seoTitle: z.string(),
	seoDescription: z.string(),
};

const teaserSchema = z.object({
	title: z.string(),
	summary: z.string(),
	buttonLabel: z.string(),
});

const pages = defineCollection({
	loader: glob({ pattern: '**/*.{yaml,yml}', base: './src/content/pages' }),
	schema: z.discriminatedUnion('pageType', [
		z.object({
			pageType: z.literal('home'),
			...seoFields,
			heroTitle: z.string(),
			heroSubtitle: z.string(),
			aboutTitle: z.string(),
			aboutBody: z.string(),
			gallery: z.array(imageSchema).min(1),
			surfTeaser: teaserSchema,
			kitesurfTeaser: teaserSchema,
		}),
		z.object({
			pageType: z.enum(['surf', 'kitesurf']),
			...seoFields,
			title: z.string(),
			intro: z.string(),
			body: z.string(),
			images: z.array(imageSchema).min(1),
			pricing: z.array(
				z.object({
					name: z.string(),
					duration: z.string(),
					price: z.string(),
					notes: z.string().optional(),
				}),
			).min(1),
			includes: z.array(z.string()),
			availabilityNote: z.string().optional(),
			contactCta: z.object({
				text: z.string(),
				buttonLabel: z.string(),
			}),
		}),
		z.object({
			pageType: z.literal('contact'),
			...seoFields,
			title: z.string(),
			intro: z.string(),
			phone: z.string(),
			email: z.email(),
			whatsappMessage: z.string(),
			location: z.string(),
			mapEmbedUrl: z.url().optional(),
		}),
	]),
});

const settings = defineCollection({
	loader: glob({ pattern: '**/*.{yaml,yml}', base: './src/content/settings' }),
	schema: z.object({
		siteName: z.string(),
		tagline: z.string(),
		nav: z.object({
			home: z.string(),
			surf: z.string(),
			kitesurf: z.string(),
			contact: z.string(),
		}),
		footerText: z.string(),
		whatsappNumber: z.string().regex(/^\d+$/),
		whatsappDefaultMessage: z.string(),
		instagramUrl: z.url().optional(),
		facebookUrl: z.url().optional(),
		ogImage: z.string().optional(),
	}),
});

export const collections = { pages, settings };
