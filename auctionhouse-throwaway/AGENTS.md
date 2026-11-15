# Auction House

## Stack and conventions

- Keep this as a React + TypeScript Vite single-page app using React Router.
- Keep auction data and its types in `src/data/auctions.ts`; use strict TypeScript and the existing component/CSS patterns in `src/`.
- Preserve the three theme choices (`gallery`, `midnight`, and `sunroom`) and their `localStorage` persistence.
- Keep image fallbacks in place for remote auction imagery.

## Commands

```sh
npm install
npm run dev
npm run lint
npm run build
npm run preview
```

## Browser checks

After relevant UI, data, image, route, theme, filtering, or bid-flow changes, use the running Vite URL to verify:

- The homepage shows six auctions and their images render.
- An auction card opens its matching detail page.
- Gallery, Midnight, and Sunroom can each be selected.
- Category filtering updates the visible auctions; placing a valid bid shows feedback.

When Playwright is requested, run it headed in Chrome or Edge and leave the browser open for inspection.
