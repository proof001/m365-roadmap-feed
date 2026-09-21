# m365-roadmap-feed

Public Microsoft 365 roadmap feed — a lean [Next.js](https://nextjs.org/) site that shows the official Microsoft Release Communications roadmap as a chronological, filterable feed.

Data source: [`GET https://www.microsoft.com/releasecommunications/api/v1/m365`](https://www.microsoft.com/releasecommunications/api/v1/m365) (no auth). See [Microsoft docs](https://learn.microsoft.com/en-us/microsoft-365/admin/manage/mrc-mcp).

## Local development

**Requirements:** [Bun](https://bun.sh/) 1.x (recommended) or Node.js 20+

```bash
bun install
bun run dev
```

Open [http://localhost:3000](http://localhost:3000).

### API

- `GET /api/roadmap` — JSON feed (items + filter metadata). Responses are cached ~1 hour (`revalidate` + `Cache-Control`).

### Build

```bash
bun run build
bun run start
```

With npm:

```bash
npm install
npm run build
npm run start
```

## Deploy on Vercel

1. Import this repository in [Vercel](https://vercel.com/new).
2. Framework preset: **Next.js** (defaults are fine).
3. Build command: `bun run build` (or `npm run build` if you use npm).
4. Install command: `bun install` (or `npm install`).
5. Deploy — no environment variables required for the MVP.

The route handler and server components fetch Microsoft’s API at build/request time on the server only.

## Attribution

Roadmap data © Microsoft Release Communications. This project is not affiliated with Microsoft. Site by **Proof/Studio**.

## License

MIT (add a `LICENSE` file if you need one for your org).
