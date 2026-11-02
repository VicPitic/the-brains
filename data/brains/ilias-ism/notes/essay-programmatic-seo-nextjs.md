## Next.js is a good fit for programmatic SEO because of rendering and routing

Ilias recommends Next.js for programmatic SEO (pSEO) because it handles the pieces a page-generation site needs:
- **SSR and SSG:** SSR gives search engines fully rendered HTML per request. SSG builds static HTML at build time, so pages load very fast, and speed is a ranking factor. For pSEO, especially large sites, he says SSG is often the ideal choice.
- **Dynamic routing:** one template can generate hundreds or thousands of pages.
- **Built-in SEO features:** components and APIs for title tags, meta descriptions, canonical URLs and image optimization.
- **API routes** for data fetching, form submissions or other server-side logic.
- **Ecosystem and DX:** the React ecosystem, fast refresh, built-in TypeScript support and an active community.
- **Deployment:** Vercel builds Next.js, so deployment and hosting are seamless.

## Starting a pSEO project: setup and data source

Ilias's tutorial sets up the project and data layer like this:
- Needs Node.js with npm or yarn. Create a new Next.js project (his example is `my-pseo-site`, with TypeScript; TypeScript is optional) and run the dev server, typically at `http://localhost:3000`.
- The example is city pages with population data, using a static `data.json` in the project root as the data source.
- Each record gets a `slug` field so URLs are clean and SEO-friendly (e.g. `new-york`, `los-angeles`, `chicago`).
- In a real pSEO project, the data would come from a database, an API or a CSV file rather than a static JSON file.

## Page template and dynamic routes with the app router

- Next.js uses file-system routing. A single template at `app/city/[slug]/page.tsx` handles every city page.
- The `[slug]` segment is a dynamic segment, so one file serves `/city/new-york`, `/city/los-angeles` and so on. The `params` object passed to the component holds the slug value.
- Template parts:
  - A `getCityData` async function that looks up the record by slug (in production this would hit a database or API).
  - A `generateMetadata` function for per-page SEO metadata.
  - A `CityPage` component that renders the page.
  - A `generateStaticParams` function. Ilias calls it "crucial" for SSG: it returns one `{ slug }` object per record so Next.js pre-renders every path at build time.
- Basic error handling shows a "City not found" message when the slug doesn't match a record.
- `toLocaleString()` formats numbers such as population with commas for readability.

## Unique metadata for every programmatic page

- `generateMetadata` builds title tags, meta descriptions and canonical URLs dynamically from each record's data.
- Ilias calls this "essential" for pSEO, because every page needs unique metadata.
- In the example, the title and description are built from the city data, and each page gets a self-referencing canonical URL.

## Dynamic sitemap.xml

- Create `app/sitemap.ts` (or `.js`) in the `app` directory. Next.js serves it automatically at `/sitemap.xml`, and the URL should be submitted to Google Search Console.
- Implementation steps:
  - Import the `MetadataRoute` type.
  - Import the data (in a real app, fetch it from a database or API).
  - Set a `baseUrl` to the real site URL.
  - Map over the records to produce one sitemap entry per page, using the slug for the URL.
  - Add the homepage (`/`) manually and combine it with the page entries using the spread operator.
  - Use `as const` in TypeScript to make the array read-only.
- `lastModified` should be the real last-modified date of the content, from the data source or CMS if available. The tutorial uses the current date only as a placeholder. `changeFrequency` and `priority` can be adjusted.
- For larger sites:
  - Past 50,000 URLs, or a sitemap over 50MB, split into multiple sitemaps with a sitemap index file.
  - For very large sites, regenerating the whole sitemap on every change is inefficient, so consider incremental updates that only touch changed pages.

## Deploying and next steps

- Deployment on Vercel:
  1. Create a free Vercel account.
  2. Connect the Git repository (GitHub, GitLab or Bitbucket).
  3. Deploy. Vercel detects Next.js and configures build settings, so the defaults usually work.
  4. Optionally add a custom domain.
- Vercel rebuilds and deploys on every push to the repository and provides preview deployments, serverless functions and edge caching. Alternatives he lists: Netlify, AWS Amplify and self-hosting.
- Next steps he suggests for a more powerful pSEO site:
  - Fetch data from external APIs or a database (PostgreSQL, MongoDB).
  - Add user authentication and authorization.
  - Add richer content and features to pages.
  - Optimize for performance and scalability.
  - Use AI to generate or enhance content.
- He promotes the MagicSpace Programmatic SEO Course for advanced techniques, case studies and community.

## Background on Ilias and MagicSpace

- Ilias is the author of the MagicSpace SEO blog. The page describes him as having built and sold Officient ($500k+ MRR), built 20+ products generating $10M+ revenue, and taught 1000+ students SEO.
- The page says the MagicSpace team has helped 20+ products generate $10M+ through SEO, and that 50+ founders have grown their SEO traffic.
- Services offered: SEO audits, monthly SEO plans, link building (linkdr.com) and strategy sessions.
