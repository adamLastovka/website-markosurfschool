# Marko Surf School

A bilingual English/Spanish website for surf and kitesurf instruction in Máncora, Peru. It is built with Astro and uses Decap CMS for Git-backed editing.

## Development

Node.js 22 or later is required.

```sh
npm install
npm run dev
```

Spanish pages are under `/es/`, English pages under `/en/`, and the CMS is available at `/admin/`.

For local CMS editing, run the proxy in a second terminal, then open `http://localhost:4321/admin/`:

```sh
npx decap-server
```

## Content

Page content is stored in `src/content/pages/en/` and `src/content/pages/es/`. Shared settings are under `src/content/settings/`. CMS uploads are stored in `public/images/`.

The fields in `public/admin/config.yml` must remain synchronized with `src/content.config.ts`.

Before launch, replace the placeholder WhatsApp number, phone, email, social links, prices, and illustrations.

## Validation

```sh
npm run build
npm run astro check
```

Set `SITE_URL` to the production URL when building. Otherwise, canonical links and the sitemap use `https://markosurfschool.netlify.app`.

## Netlify and Decap CMS

1. Import this GitHub repository into Netlify.
2. Set the `SITE_URL` environment variable.
3. Enable Netlify Identity with invite-only registration.
4. Enable Git Gateway under Identity services.
5. Invite the instructor as an Identity user.
6. Open `/admin/` and publish a test edit.

Publishing through Decap commits content to `main` and triggers a Netlify rebuild. Build settings are defined in `netlify.toml`.
