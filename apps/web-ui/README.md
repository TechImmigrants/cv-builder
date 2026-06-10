# CV Builder Web

This package contains the Next.js web app for **CV Builder**.

The current homepage is a simple landing screen for the product and replaces the
default generated Next.js starter content.

## Local development

From `packages/web`, run:

```bash
pnpm dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command      | Purpose                    |
| ------------ | -------------------------- |
| `pnpm dev`   | Start the local dev server |
| `pnpm build` | Build the production app   |
| `pnpm start` | Run the production build   |
| `pnpm lint`  | Run lint checks            |

## Main files

- `src/app/layout.tsx` - app shell and metadata
- `src/app/page.tsx` - homepage
- `src/app/globals.css` - global styles
