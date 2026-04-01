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

Production builds use Vite `base` `/estimate-genaral-info/` so assets resolve on the project Pages URL.
