## Project Structure

Gmtech organizes modular sections, components, content, and layout to streamline development and content management.

```md
├── db/ # Contains the database schema and migrations
├── public/ # Static assets that are served directly
└── src/
├── assets/
│ ├── images/  
 │ └── styles/ # CSS styles and Tailwind configuration
├── components/
│ ├── common/ # Commonly used components across the site
│ ├── sections/ # Components for specific website sections
│ └── ui/ # UI components (forms, icons, buttons)
├── content/ # The articles and reference collection of Markdoc files
│ ├── articles/
│ └── reference/
├── data/ # The spreadsheets and whitepapers collection of JSON files
│ ├── spreadsheets/
│ └── whitepapers/
├── layout/
│ └── BaseLayout.astro # A site-wide wrapping page template
├── pages/ # Astro files representing individual pages and website sections
│ ├── api/
│ │ └── feedback.ts # Handles feedback submissions
│ ├── downloads/
│ ├── support/
│ │ └── articles/
│ │ ├── [id].astro
│ │ └── index.astro
│ ├── 404.astro # Custom 404 page
│ ├── about.astro
│ ├── contact.astro
│ ├── index.astro # The landing/home page
│ └── robots.txt.ts # Dynamically generates robots.txt
├── utils/ # Shared utility functions and helpers
└── content.config.ts # Contains content collections configuration options
```

## Content Management

### Keystatic CMS

GMTECH uses Keystatic CMS for content management. You can edit content through the Keystatic web interface and store it in either your local file system or a GitHub repository

#### Accessing Keystatic Admin UI

- **Local Mode**: Visit `http://127.0.0.1:4321/keystatic` to access the Admin UI in development.
- **GitHub Mode**: Once deployed, access the Admin UI at `https://your_domain.com/keystatic`.

#### Storage Mode Configuration

Keystatic allows you to configure the storage mode in `keystatic.config.ts`. You can set the mode to either `local` or `github`:

```typescript
// ...
let KEYSTATIC_STORAGE_MODE = "local";

const GITHUB_REPO_OWNER = "REPO_OWNER";
const GITHUB_REPO_NAME = "REPO_NAME";

export default config({
  storage:
    (KEYSTATIC_STORAGE_MODE as "github") === "github"
      ? {
          kind: "github",
          repo: `${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}`,
        }
      : {
          kind: "local",
        },
  // ...
});
```

The appropriate storage mode is automatically selected based on the configuration.

#### Disable Admin UI Routes in Production

When using the `local` strategy, you may want to disable access to `/keystatic` routes in production. To achieve this, `astro.config.mjs` was modified as follows:

```typescript
// ...
import keystatic from "@keystatic/astro";

export default defineConfig({
  integrations: [
    react(),
    markdoc(),
    ...(process.env.SKIP_KEYSTATIC ? [] : [keystatic()]),
  ],
});
```

> [!IMPORTANT]
> [Setting](https://keystatic.com/docs/recipes/astro-disable-admin-ui-in-production#adding-environment-variables) `SKIP_KEYSTATIC=true` in your environment variables will prevent Keystatic from mounting in production.

> [!NOTE]
> The template uses Server-Side Rendering (SSR) because the API routes in the Keystatic Admin UI need to perform reads/writes on the file system (or GitHub repo), which require server-side execution.
>
> If you only intend to use Keystatic for local development, you can configure Astro for static output and set Keystatic to local storage mode. This will allow you to deploy your project to any static hosting service.
>
> To configure Astro for static output and Keystatic for local storage mode:
>
> 1. **Update `astro.config.mjs`:**
>
> ```mjs
>  import { defineConfig } from 'astro/config';
>  // ...
>
>  const isDev = process.env.NODE_ENV === "development"
>
>  export default defineConfig({
>    // ...
>    integrations: [
>      // ...
>      ...(isDev ? [keystatic()] :) // Uses the integration conditionally
>    ],
>    output: isDev ? 'server' : 'static' // Only set server rendering for dev mode
>  });
> ```
>
> 2. **Update `keystatic/config.ts`:**
>
> ```ts
> import { config, fields, collection } from "@keystatic/core";
>
> let KEYSTATIC_STORAGE_MODE = "local";
> ```
>
> 3. **Update your dynamic route to use `getStaticPaths()`. Refer to the [Astro documentation](https://docs.astro.build/en/guides/content-collections/#building-for-static-output-default) for details on generating static content from collections.**

> [!TIP]
> Recommended Resources:
>
> - [Keystatic Docs](https://keystatic.com/docs/introduction)
> - [Disable Admin UI Routes in Production](https://keystatic.com/docs/recipes/astro-disable-admin-ui-in-production)
> - [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/)

## Data Handling with Astro DB

GMTECH utilizes Astro DB with Turso for the feedback component. Astro DB is a database integration for Astro that allows you to easily connect to various databases, including Turso. Turso is a serverless database platform that provides a scalable and globally distributed database.

### Create a Turso Database

You will need to create a Turso database to use the feedback component.

1. **Sign up and create a database:**

- [Sign up for a Turso account](https://turso.tech/)
- Create a new database in your Turso dashboard or click below:

[![Create Database](https://sqlite.new/button)](https://sqlite.new?name=creative-orange-mouse)

2. **Configure environment variables:**

- Rename `.env.template` to `.env` and fill in your specific database credentials:

```env
    ASTRO_DB_REMOTE_URL=your_turso_db_url  # Copy the database URL
    ASTRO_DB_APP_TOKEN=your_turso_db_token  # Create a database token
```

3. **Push the database schema:**

```bash
npx astro db push --remote
```

You should see something like this on a successful push:

```bash
Pushing database schema updates...
Push complete!
```

#### Database Configuration

The database schema is defined in `/db/config.ts`. It stores the post slug and the counts for helpful and not helpful feedback:

```typescript
import { defineDb, defineTable, column } from "astro:db";

const Feedback = defineTable({
  columns: {
    slug: column.text({ primaryKey: true }),
    helpful: column.number({ default: 0 }),
    notHelpful: column.number({ default: 0 }),
  },
});

export default defineDb({
  tables: { Feedback },
});
```

> [!NOTE]
> Don't forget to add the environment variables when deploying your site.

> [!TIP]
> Key locations:
>
> - [/db/\*](https://github.com/mearashadowfax/GMTECH/tree/c611b145c821aaac2df787df8848ebf5002a8ddd/db): Database schema
> - [@common/PostFeedback.svelte](https://github.com/mearashadowfax/GMTECH/blob/c611b145c821aaac2df787df8848ebf5002a8ddd/src/components/common/PostFeedback.svelte): Feedback component
> - [src/pages/api/feedback.ts](https://github.com/mearashadowfax/GMTECH/blob/c611b145c821aaac2df787df8848ebf5002a8ddd/src/pages/api/feedback.ts): API
>
> Recommended resources:
>
> - [Astro DB](https://docs.astro.build/en/guides/astro-db/)
> - [Turso Docs](https://docs.turso.tech/introduction)

## Integrations and Enhancements

GMTECH uses several Astro integrations and enhancements to improve its functionality, performance, and developer experience.

### Astro SEO

The [astro-seo](https://github.com/jonasmerlin/astro-seo) integration helps manage SEO metadata and schema.org data, improving the website's visibility on search engines.

In [BaseLayout.astro](https://github.com/mearashadowfax/GMTECH/blob/771087f60258ced93f7ad8ab38669c5ada1a65c6/src/layout/BaseLayout.astro#L43), the `SEO` component from `astro-seo` is used to define global SEO settings like `title`, `description`, `openGraph`, and `twitter` metadata. Page-specific SEO settings can be overridden by passing `seo` props to the `BaseLayout` component, as shown in the example below:

```astro
---
//...

const seo = {
  title: "About GMTECH",
  description: "Learn more about GMTECH...",
};
---

<BaseLayout seo={seo}>
  {/* ... page content ... */}
</BaseLayout>
```

### Astro SEO Schema

The [astro-seo-schema](https://github.com/codiume/orbit/tree/main/packages/astro-seo-schema) integration provides a convenient way to add schema.org structured data to your pages, helping search engines understand the content better.

In [BaseLayout.astro](https://github.com/mearashadowfax/GMTECH/blob/771087f60258ced93f7ad8ab38669c5ada1a65c6/src/layout/BaseLayout.astro#L79), the Schema component from `astro-seo-schema` is used to define default schema.org data for the website. Page-specific schema.org data can be added by passing `schema` props to the `BaseLayout` component, as shown in the example below.

```astro
---
// ...
import type { WithContext, Thing } from "schema-dts";

const schema: WithContext<Thing> = {
  // ... schema.org metadata
};
---

<BaseLayout schema={schema}>
  {/* ... page content ... */}
</BaseLayout>
```

### Astro Font

The [astro-font](https://github.com/rishi-raj-jain/astro-font) integration optimizes font loading and preloading, improving website performance.

In [BaseLayout.astro](https://github.com/mearashadowfax/GMTECH/blob/771087f60258ced93f7ad8ab38669c5ada1a65c6/src/layout/BaseLayout.astro#L85), the `AstroFont` component is used to define font configurations, including `name`, `src`, `preload`, `display`, `selector`, and `fallback` options. This ensures fonts are loaded efficiently and applied to the correct elements.

### Client-Side Router

The [ClientRouter](https://docs.astro.build/en/guides/view-transitions/) component from `astro:transitions` enables client-side routing with page transitions, providing a smoother and more interactive user experience.

In [BaseLayout.astro](https://github.com/mearashadowfax/GMTECH/blob/771087f60258ced93f7ad8ab38669c5ada1a65c6/src/layout/BaseLayout.astro#L82), the `ClientRouter` component is included to activate client-side routing. This allows for page transitions and improves navigation performance.

### Sitemap Generation

While GMTECH doesn't include the official [@astrojs/sitemap](https://docs.astro.build/en/guides/integrations-guide/sitemap/) integration by default, you can easily add it if needed. However, please note that the official integration cannot generate sitemap entries for dynamic routes in SSR mode.

If you require more advanced sitemap generation capabilities, such as including dynamic routes or customizing sitemap entries, you can use the community-maintained [Sitemap Extensions](https://inox-tools.fryuni.dev/sitemap-ext) package.
