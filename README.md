<p align="center">
  <img src="./public/favicon.svg" width="76" height="76" alt="StarSearch icon">
</p>

<h1 align="center">StarSearch</h1>

<p align="center">
  <strong>Find remarkable GitHub repositories without memorizing search qualifiers.</strong>
</p>

<p align="center">
  <a href="https://github.com/Base27-CVNSS/StarSearch-/actions/workflows/deploy-pages.yml"><img alt="GitHub Pages" src="https://img.shields.io/github/actions/workflow/status/Base27-CVNSS/StarSearch-/deploy-pages.yml?branch=main&label=pages&style=flat-square"></a>
  <a href="./LICENSE"><img alt="MIT License" src="https://img.shields.io/badge/license-MIT-df3f45?style=flat-square"></a>
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-16-15171a?style=flat-square&logo=nextdotjs">
  <img alt="GitHub REST API" src="https://img.shields.io/badge/data-GitHub%20REST%20API-15171a?style=flat-square&logo=github">
</p>

<p align="center">
  <a href="https://starsearch-github.vochongyenlong.chatgpt.site"><strong>Open the live dashboard →</strong></a>
</p>

StarSearch is an English-language discovery dashboard for the
[GitHub repository search API](https://docs.github.com/en/rest/search/search).
It turns advanced qualifiers into an approachable visual interface and shows
live repository metadata in a responsive, exportable result grid.

## Why StarSearch?

GitHub can answer queries such as:

```text
speech recognition in:name,description,topics,readme
stars:>=10000 language:"Python" license:mit
pushed:>=2026-01-01 archived:false is:public
```

The syntax is powerful, but it is easy to forget. StarSearch builds that query
for you, keeps the generated syntax visible, and lets you open the exact search
on GitHub at any time.

## Features

- Live repository search through GitHub's official REST API
- One-click popularity bands: **1K+**, **10K+**, **50K+**, and **100K+** stars
- Owner scoping for a GitHub user or organization
- Keyword targeting across name, description, topics, and README
- Numeric ranges for stars, followers, forks, and repository size
- Created-date and last-pushed date ranges
- Language, topics, license, visibility, archive, fork, template, and mirror filters
- Purpose presets for AI, developer tools, web frameworks, data, security,
  design systems, mobile development, and education
- Sorting by stars, forks, recent updates, best match, or help-wanted issues
- Grid and compact list result layouts
- Saved searches stored locally on the device
- CSV and JSON export for the current result page
- Optional GitHub token support for higher limits and accessible private repositories
- Responsive keyboard- and touch-friendly interface
- Static export and GitHub Pages deployment workflow

## Filter reference

| Dashboard control | GitHub qualifier | Example |
|---|---|---|
| Owner | `user:` or `org:` | `org:microsoft` |
| Stars | `stars:` | `stars:1000..10000` |
| Followers | `followers:` | `followers:>=100` |
| Forks | `forks:` | `forks:>=500` |
| Size | `size:` in KB | `size:1024..51200` |
| Created | `created:` | `created:>=2025-01-01` |
| Last pushed | `pushed:` | `pushed:>=2026-01-01` |
| Language | `language:` | `language:"TypeScript"` |
| Topic | `topic:` | `topic:speech-recognition` |
| License | `license:` | `license:apache-2.0` |
| Visibility | `is:` | `is:public` / `is:private` |
| Archived | `archived:` | `archived:false` |
| Fork mode | `fork:` | `fork:true` / `fork:only` |
| Template | `template:` | `template:true` |
| Mirror | `mirror:` | `mirror:false` |

Repository size is entered in megabytes in the dashboard and converted to the
kilobytes expected by GitHub. GitHub supports the `followers:` search
qualifier, but repository search responses do not include an exact follower
count; StarSearch therefore uses that value only as a filter.

## Architecture

```mermaid
flowchart LR
    A["Visual filters"] --> B["Query builder"]
    B --> C["GitHub Search API"]
    C --> D["Result normalizer"]
    D --> E["Grid / list view"]
    E --> F["CSV / JSON export"]
```

StarSearch is deliberately serverless. The browser builds a GitHub query,
requests live results from `api.github.com`, and renders them locally. Saved
searches use `localStorage`; an optional token uses `sessionStorage`.

## Run locally

Requirements:

- Node.js 22 or later
- npm

```bash
git clone https://github.com/Base27-CVNSS/StarSearch-.git
cd StarSearch-
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

For a production build:

```bash
npm run build
```

The static export is written to `out/`.

## GitHub token and privacy

Public searches work without a token, subject to GitHub's search rate limit.
Selecting **Add token** can increase authenticated limits and allows queries
over private repositories the token holder can access.

- The token is never committed to this repository.
- The token is stored only in browser `sessionStorage`.
- Closing the browser tab clears the token.
- The token is sent only to `https://api.github.com`.
- Use the minimum read permissions required for your search.

Never paste a production token into source code, an issue, or a commit.

## GitHub API limits

GitHub's Search API returns at most 1,000 accessible results for a query.
StarSearch exposes GitHub's `incomplete_results` signal and remaining search
requests in the result toolbar. See GitHub's official
[repository search syntax](https://docs.github.com/en/search-github/searching-on-github/searching-for-repositories)
and [REST API rate limits](https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api).

## Deploy to GitHub Pages

The included workflow builds and deploys on every push to `main`.

1. Open **Settings → Pages** in the repository.
2. Choose **GitHub Actions** as the source if it is not already selected.
3. Run the **Deploy StarSearch to GitHub Pages** workflow.

The Next.js configuration automatically applies the `/StarSearch-` base path
during GitHub Actions builds.

## Project structure

```text
.
├── app/
│   ├── globals.css        # Responsive visual system
│   ├── layout.tsx         # Metadata and application shell
│   └── page.tsx           # Search, filters, API client, results, export
├── public/
│   └── favicon.svg        # StarSearch red star identity
├── .github/workflows/
│   └── deploy-pages.yml   # Static build and Pages deployment
├── next.config.ts
├── package.json
└── LICENSE
```

## Contributing

Issues and pull requests are welcome. Good contribution areas include:

- Additional official GitHub qualifiers
- Better accessible labels and keyboard navigation
- Query-sharing URLs
- Result comparison and deduplication
- Internationalization

Please keep token handling client-side and avoid introducing a third-party
tracking or proxy service without an explicit security review.

## License

Released under the [MIT License](./LICENSE).

Developed by **Long Ngo**.
