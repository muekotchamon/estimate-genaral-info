# Estimate detail — general info

React + Vite + Tailwind UI mockups for CRM estimate detail (customer, project, insurance, map).

## Live site (GitHub Pages)

After enabling Pages (see below): **https://muekotchamon.github.io/estimate-genaral-info/**

## Local development

```bash
npm install
npm run dev
```

## GitHub Pages

1. Repository → **Settings** → **Pages**
2. **Build and deployment** → Source: **GitHub Actions**
3. Push to `main` runs `.github/workflows/deploy.yml` and publishes the `dist` build.

Production builds use a **relative** Vite `base` (`./`) so JS/CSS resolve under  
`https://muekotchamon.github.io/estimate-genaral-info/` without hard-coding the repo path.

### `main.tsx` 404 in the browser

That request means the page is **not** the built `dist/index.html` (it still points at `/src/main.tsx`).  
Fix: in **Pages → Build and deployment**, source must be **GitHub Actions** (this repo’s workflow uploads **`dist`** only), not “Deploy from a branch” with the repo root.

After `npm run build`, check `dist/index.html`: it should reference `./assets/…js`, not `main.tsx`.
