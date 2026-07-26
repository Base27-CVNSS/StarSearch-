"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";

type IconName =
  | "archive"
  | "bookmark"
  | "calendar"
  | "chevron"
  | "code"
  | "copy"
  | "download"
  | "external"
  | "eye"
  | "filter"
  | "fork"
  | "github"
  | "grid"
  | "issue"
  | "key"
  | "list"
  | "search"
  | "shield"
  | "spark"
  | "star"
  | "x";

function Icon({
  name,
  size = 18,
  strokeWidth = 1.8,
}: {
  name: IconName;
  size?: number;
  strokeWidth?: number;
}) {
  const paths: Record<IconName, React.ReactNode> = {
    archive: (
      <>
        <path d="M4 7.5h16M5.5 7.5v11h13v-11M4 4h16v3.5H4z" />
        <path d="M9.5 12h5" />
      </>
    ),
    bookmark: <path d="M6.5 3.5h11v17l-5.5-4-5.5 4z" />,
    calendar: (
      <>
        <rect x="3.5" y="5" width="17" height="15" rx="2" />
        <path d="M8 3v4M16 3v4M3.5 10h17" />
      </>
    ),
    chevron: <path d="m9 18 6-6-6-6" />,
    code: <path d="m8.5 8-4 4 4 4M15.5 8l4 4-4 4M14 4l-4 16" />,
    copy: (
      <>
        <rect x="8" y="8" width="11.5" height="11.5" rx="2" />
        <path d="M16 8V6.5a2 2 0 0 0-2-2H6.5a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2H8" />
      </>
    ),
    download: (
      <>
        <path d="M12 3v12m0 0 4.5-4.5M12 15l-4.5-4.5" />
        <path d="M5 19h14" />
      </>
    ),
    external: (
      <>
        <path d="M14 4h6v6M20 4l-9 9" />
        <path d="M18 13v5.5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 4 18.5v-11A1.5 1.5 0 0 1 5.5 6H11" />
      </>
    ),
    eye: (
      <>
        <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6z" />
        <circle cx="12" cy="12" r="2.5" />
      </>
    ),
    filter: <path d="M4 5h16l-6 7v5l-4 2v-7z" />,
    fork: (
      <>
        <circle cx="6" cy="5" r="2" />
        <circle cx="18" cy="5" r="2" />
        <circle cx="12" cy="19" r="2" />
        <path d="M6 7v2a3 3 0 0 0 3 3h3m6-5v2a3 3 0 0 1-3 3h-3v5" />
      </>
    ),
    github: (
      <path d="M12 2.8a9.4 9.4 0 0 0-3 18.3c.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.2-3.4-1.2-.5-1.2-1.1-1.5-1.1-1.5-.9-.7.1-.7.1-.7 1 0 1.6 1.1 1.6 1.1.9 1.6 2.4 1.1 3 .9.1-.7.4-1.1.7-1.4-2.3-.3-4.7-1.2-4.7-4.8 0-1.1.4-1.9 1-2.6-.1-.3-.5-1.3.1-2.7 0 0 .8-.3 2.7 1a9.3 9.3 0 0 1 4.9 0c1.9-1.3 2.7-1 2.7-1 .6 1.4.2 2.4.1 2.7.6.7 1 1.5 1 2.6 0 3.6-2.4 4.5-4.7 4.8.4.3.7.9.7 1.8v2.7c0 .3.2.6.7.5A9.4 9.4 0 0 0 12 2.8z" />
    ),
    grid: (
      <>
        <rect x="4" y="4" width="6" height="6" rx="1" />
        <rect x="14" y="4" width="6" height="6" rx="1" />
        <rect x="4" y="14" width="6" height="6" rx="1" />
        <rect x="14" y="14" width="6" height="6" rx="1" />
      </>
    ),
    issue: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7.5v5.5M12 17h.01" />
      </>
    ),
    key: (
      <>
        <circle cx="8" cy="15" r="4" />
        <path d="m11 12 8-8m-3 3 2 2m-5 1 2 2" />
      </>
    ),
    list: <path d="M9 6h11M9 12h11M9 18h11M4 6h.01M4 12h.01M4 18h.01" />,
    search: (
      <>
        <circle cx="10.5" cy="10.5" r="6.5" />
        <path d="m15.5 15.5 4.5 4.5" />
      </>
    ),
    shield: <path d="M12 3 5 6v5c0 4.7 2.8 8.1 7 10 4.2-1.9 7-5.3 7-10V6z" />,
    spark: <path d="m12 3 1.4 5.1L18 10l-4.6 1.9L12 17l-1.4-5.1L6 10l4.6-1.9zM19 16l.6 2.1L22 19l-2.4.9L19 22l-.6-2.1L16 19l2.4-.9z" />,
    star: <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-2.9-5.6 2.9 1.1-6.2L3 9.6l6.2-.9z" />,
    x: <path d="m6 6 12 12M18 6 6 18" />,
  };

  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={name === "github" ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={name === "github" ? 0 : strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  );
}

type Repository = {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  private: boolean;
  archived: boolean;
  fork: boolean;
  language: string | null;
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
  open_issues_count: number;
  size: number;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  topics: string[];
  visibility: string;
  license: { key: string; name: string; spdx_id: string } | null;
  owner: {
    login: string;
    avatar_url: string;
    html_url: string;
    type: string;
  };
};

type Filters = {
  keywords: string;
  owner: string;
  ownerKind: "user" | "org";
  searchIn: string;
  starsMin: string;
  starsMax: string;
  followersMin: string;
  followersMax: string;
  forksMin: string;
  forksMax: string;
  sizeMin: string;
  sizeMax: string;
  createdFrom: string;
  createdTo: string;
  pushedFrom: string;
  pushedTo: string;
  language: string;
  topics: string;
  license: string;
  visibility: string;
  archived: string;
  forksMode: string;
  template: string;
  mirror: string;
};

type SavedSearch = {
  id: string;
  name: string;
  filters: Filters;
  createdAt: string;
};

const initialFilters: Filters = {
  keywords: "",
  owner: "",
  ownerKind: "org",
  searchIn: "name,description,topics,readme",
  starsMin: "1000",
  starsMax: "",
  followersMin: "",
  followersMax: "",
  forksMin: "",
  forksMax: "",
  sizeMin: "",
  sizeMax: "",
  createdFrom: "",
  createdTo: "",
  pushedFrom: "",
  pushedTo: "",
  language: "",
  topics: "",
  license: "",
  visibility: "public",
  archived: "false",
  forksMode: "sources",
  template: "",
  mirror: "",
};

const useCases = [
  { label: "AI & ML", keywords: "machine learning", topics: "artificial-intelligence" },
  { label: "Developer tools", keywords: "developer tools", topics: "developer-tools" },
  { label: "Web frameworks", keywords: "web framework", topics: "web-development" },
  { label: "Data & analytics", keywords: "data analytics", topics: "data-science" },
  { label: "Cybersecurity", keywords: "security", topics: "cybersecurity" },
  { label: "Design systems", keywords: "design system", topics: "design-system" },
  { label: "Mobile", keywords: "mobile app", topics: "mobile-development" },
  { label: "Education", keywords: "learning education", topics: "education" },
];

const languages = [
  "C",
  "C#",
  "C++",
  "CSS",
  "Dart",
  "Go",
  "HTML",
  "Java",
  "JavaScript",
  "Jupyter Notebook",
  "Kotlin",
  "PHP",
  "Python",
  "Ruby",
  "Rust",
  "Shell",
  "Swift",
  "TypeScript",
];

const licenses = [
  ["mit", "MIT"],
  ["apache-2.0", "Apache 2.0"],
  ["gpl-3.0", "GPL 3.0"],
  ["agpl-3.0", "AGPL 3.0"],
  ["lgpl-3.0", "LGPL 3.0"],
  ["bsd-3-clause", "BSD 3-Clause"],
  ["mpl-2.0", "MPL 2.0"],
  ["unlicense", "The Unlicense"],
  ["cc0-1.0", "CC0 1.0"],
];

const compactNumber = new Intl.NumberFormat("en", {
  notation: "compact",
  maximumFractionDigits: 1,
});

function formatNumber(value: number) {
  return compactNumber.format(value);
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(value));
}

function formatSize(sizeInKb: number) {
  if (sizeInKb >= 1024 * 1024) return `${(sizeInKb / 1024 / 1024).toFixed(1)} GB`;
  if (sizeInKb >= 1024) return `${(sizeInKb / 1024).toFixed(1)} MB`;
  return `${sizeInKb} KB`;
}

function rangeQualifier(
  name: string,
  minimum: string,
  maximum: string,
  multiplier = 1,
) {
  const min = minimum ? Math.max(0, Math.round(Number(minimum) * multiplier)) : "";
  const max = maximum ? Math.max(0, Math.round(Number(maximum) * multiplier)) : "";
  if (min !== "" && max !== "") return `${name}:${min}..${max}`;
  if (min !== "") return `${name}:>=${min}`;
  if (max !== "") return `${name}:<=${max}`;
  return "";
}

function dateQualifier(name: string, from: string, to: string) {
  if (from && to) return `${name}:${from}..${to}`;
  if (from) return `${name}:>=${from}`;
  if (to) return `${name}:<=${to}`;
  return "";
}

function buildQuery(filters: Filters) {
  const parts: string[] = [];
  if (filters.keywords.trim()) {
    parts.push(filters.keywords.trim());
    parts.push(`in:${filters.searchIn}`);
  }
  if (filters.owner.trim()) parts.push(`${filters.ownerKind}:${filters.owner.trim()}`);

  const ranges = [
    rangeQualifier("stars", filters.starsMin, filters.starsMax),
    rangeQualifier("followers", filters.followersMin, filters.followersMax),
    rangeQualifier("forks", filters.forksMin, filters.forksMax),
    rangeQualifier("size", filters.sizeMin, filters.sizeMax, 1024),
    dateQualifier("created", filters.createdFrom, filters.createdTo),
    dateQualifier("pushed", filters.pushedFrom, filters.pushedTo),
  ];
  parts.push(...ranges.filter(Boolean));

  if (filters.language) parts.push(`language:"${filters.language}"`);
  filters.topics
    .split(",")
    .map((topic) => topic.trim().toLowerCase().replace(/\s+/g, "-"))
    .filter(Boolean)
    .forEach((topic) => parts.push(`topic:${topic}`));
  if (filters.license) parts.push(`license:${filters.license}`);
  if (filters.visibility) parts.push(`is:${filters.visibility}`);
  if (filters.archived) parts.push(`archived:${filters.archived}`);
  if (filters.forksMode === "include") parts.push("fork:true");
  if (filters.forksMode === "only") parts.push("fork:only");
  if (filters.template) parts.push(`template:${filters.template}`);
  if (filters.mirror) parts.push(`mirror:${filters.mirror}`);
  return parts.join(" ");
}

function csvEscape(value: string | number | boolean | null) {
  const stringValue = value === null ? "" : String(value);
  return `"${stringValue.replaceAll('"', '""')}"`;
}

export default function Home() {
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [incomplete, setIncomplete] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [sort, setSort] = useState("stars");
  const [order, setOrder] = useState<"asc" | "desc">("desc");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [rateRemaining, setRateRemaining] = useState<string>("—");
  const [lastQuery, setLastQuery] = useState("");
  const [copied, setCopied] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [tokenOpen, setTokenOpen] = useState(false);
  const [token, setToken] = useState("");
  const [tokenDraft, setTokenDraft] = useState("");
  const [savedSearches, setSavedSearches] = useState<SavedSearch[]>([]);
  const [savedOpen, setSavedOpen] = useState(false);

  const queryPreview = useMemo(() => buildQuery(filters), [filters]);
  const maxPage = Math.max(1, Math.ceil(Math.min(totalCount, 1000) / pageSize));

  const updateFilter = <K extends keyof Filters>(key: K, value: Filters[K]) => {
    setFilters((current) => ({ ...current, [key]: value }));
  };

  const runSearch = useCallback(
    async (
      targetPage = 1,
      activeFilters = filters,
      activeSort = sort,
      activeOrder = order,
      activePageSize = pageSize,
    ) => {
      const query = buildQuery(activeFilters);
      if (activeFilters.visibility === "private" && !token) {
        setError("Private repository search requires a GitHub token with repository read access.");
        setTokenOpen(true);
        return;
      }

      setLoading(true);
      setError("");
      setLastQuery(query);
      setPage(targetPage);

      const params = new URLSearchParams({
        q: query,
        per_page: String(activePageSize),
        page: String(targetPage),
        order: activeOrder,
      });
      if (activeSort) params.set("sort", activeSort);

      const headers: Record<string, string> = {
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
      };
      if (token) headers.Authorization = `Bearer ${token}`;

      try {
        const response = await fetch(
          `https://api.github.com/search/repositories?${params.toString()}`,
          { headers },
        );
        setRateRemaining(response.headers.get("x-ratelimit-remaining") ?? "—");
        const data = await response.json();
        if (!response.ok) {
          const message =
            response.status === 403
              ? "GitHub's search rate limit was reached. Add a token or try again after the limit resets."
              : response.status === 401
                ? "The GitHub token was rejected. Check the token and its permissions."
                : data.message || "GitHub could not complete this search.";
          throw new Error(message);
        }
        setRepositories(data.items ?? []);
        setTotalCount(data.total_count ?? 0);
        setIncomplete(Boolean(data.incomplete_results));
      } catch (caught) {
        setRepositories([]);
        setTotalCount(0);
        setError(caught instanceof Error ? caught.message : "The search could not be completed.");
      } finally {
        setLoading(false);
      }
    },
    [filters, order, pageSize, sort, token],
  );

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const sessionToken = sessionStorage.getItem("starsearch-token") ?? "";
      if (sessionToken) {
        setToken(sessionToken);
        setTokenDraft(sessionToken);
      }
      try {
        const saved = JSON.parse(localStorage.getItem("starsearch-saved") ?? "[]");
        if (Array.isArray(saved)) setSavedSearches(saved);
      } catch {
        localStorage.removeItem("starsearch-saved");
      }
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => void runSearch(1), 0);
    return () => window.clearTimeout(timer);
    // The opening search intentionally runs once with the safe public defaults.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitSearch = (event: FormEvent) => {
    event.preventDefault();
    void runSearch(1);
    setFiltersOpen(false);
  };

  const resetFilters = () => {
    setFilters(initialFilters);
    setError("");
  };

  const applyStarBand = (minimum: string) => {
    setFilters((current) => ({ ...current, starsMin: minimum, starsMax: "" }));
  };

  const applyUseCase = (preset: (typeof useCases)[number]) => {
    const nextFilters = {
      ...filters,
      keywords: preset.keywords,
      topics: preset.topics,
    };
    setFilters(nextFilters);
    void runSearch(1, nextFilters);
  };

  const copyQuery = async () => {
    await navigator.clipboard.writeText(lastQuery || queryPreview);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  const saveSearch = () => {
    const name = filters.keywords.trim() || `Repositories with ${filters.starsMin || "any"}+ stars`;
    const saved: SavedSearch = {
      id: crypto.randomUUID(),
      name,
      filters,
      createdAt: new Date().toISOString(),
    };
    const next = [saved, ...savedSearches].slice(0, 8);
    setSavedSearches(next);
    localStorage.setItem("starsearch-saved", JSON.stringify(next));
    setSavedOpen(true);
  };

  const removeSavedSearch = (id: string) => {
    const next = savedSearches.filter((item) => item.id !== id);
    setSavedSearches(next);
    localStorage.setItem("starsearch-saved", JSON.stringify(next));
  };

  const loadSavedSearch = (saved: SavedSearch) => {
    setFilters(saved.filters);
    setSavedOpen(false);
    void runSearch(1, saved.filters);
  };

  const saveToken = () => {
    const cleanToken = tokenDraft.trim();
    if (cleanToken) sessionStorage.setItem("starsearch-token", cleanToken);
    else sessionStorage.removeItem("starsearch-token");
    setToken(cleanToken);
    setTokenOpen(false);
  };

  const exportResults = (format: "csv" | "json") => {
    if (!repositories.length) return;
    let payload = "";
    let type = "";
    if (format === "json") {
      payload = JSON.stringify(
        {
          query: lastQuery,
          exportedAt: new Date().toISOString(),
          repositories,
        },
        null,
        2,
      );
      type = "application/json";
    } else {
      const headings = [
        "Repository",
        "Owner",
        "Description",
        "Stars",
        "Followers",
        "Forks",
        "Language",
        "License",
        "Size KB",
        "Created",
        "Last pushed",
        "Archived",
        "Visibility",
        "URL",
      ];
      const rows = repositories.map((repo) =>
        [
          repo.name,
          repo.owner.login,
          repo.description,
          repo.stargazers_count,
          repo.watchers_count,
          repo.forks_count,
          repo.language,
          repo.license?.spdx_id ?? "",
          repo.size,
          repo.created_at,
          repo.pushed_at,
          repo.archived,
          repo.visibility,
          repo.html_url,
        ]
          .map(csvEscape)
          .join(","),
      );
      payload = [headings.map(csvEscape).join(","), ...rows].join("\n");
      type = "text/csv";
    }
    const blob = new Blob([payload], { type });
    const href = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = href;
    anchor.download = `starsearch-page-${page}.${format}`;
    anchor.click();
    URL.revokeObjectURL(href);
  };

  return (
    <main className="app-shell">
      <header className="topbar">
        <div className="topbar-inner">
          <a href="#" className="brand" aria-label="StarSearch home">
            <span className="brand-mark">
              <Icon name="star" size={22} strokeWidth={2.1} />
            </span>
            <span className="brand-name">
              Star<span>Search</span>
            </span>
            <span className="brand-tag">GitHub discovery</span>
          </a>

          <nav className="top-actions" aria-label="Application controls">
            <button className="button button-quiet" onClick={() => setSavedOpen(true)}>
              <Icon name="bookmark" />
              <span>Saved</span>
              {savedSearches.length > 0 && (
                <span className="count-badge">{savedSearches.length}</span>
              )}
            </button>
            <button
              className={`button button-quiet ${token ? "has-token" : ""}`}
              onClick={() => setTokenOpen(true)}
            >
              <Icon name="key" />
              <span>{token ? "Connected" : "Add token"}</span>
            </button>
            <a
              className="button button-dark"
              href="https://github.com/Base27-CVNSS/StarSearch-"
              target="_blank"
              rel="noreferrer"
            >
              <Icon name="github" />
              <span>View source</span>
            </a>
          </nav>
        </div>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="live-dot" />
            Search GitHub with precision
          </div>
          <h1>
            Find remarkable repositories,
            <br />
            <span>without writing qualifiers.</span>
          </h1>
          <p>
            Explore projects above 1K, 10K, or 100K stars. Filter by owner,
            activity, size, followers, topics, license, visibility, and more.
          </p>
        </div>
        <div className="hero-stat">
          <span>Built on</span>
          <strong>GitHub Search API</strong>
          <small>Live repository metadata · Up to 1,000 accessible results</small>
        </div>
      </section>

      <form className="search-panel" onSubmit={submitSearch}>
        <div className="search-main">
          <Icon name="search" size={22} />
          <input
            aria-label="Repository keywords"
            value={filters.keywords}
            onChange={(event) => updateFilter("keywords", event.target.value)}
            placeholder="What do you want to build? e.g. speech recognition"
          />
          {filters.keywords && (
            <button
              type="button"
              className="icon-button"
              aria-label="Clear keywords"
              onClick={() => updateFilter("keywords", "")}
            >
              <Icon name="x" size={17} />
            </button>
          )}
          <button type="submit" className="button button-red search-button">
            Search repositories
          </button>
        </div>
        <div className="search-shortcuts">
          <span>Star threshold</span>
          {["1000", "10000", "50000", "100000"].map((value) => (
            <button
              key={value}
              type="button"
              className={filters.starsMin === value && !filters.starsMax ? "active" : ""}
              onClick={() => applyStarBand(value)}
            >
              {Number(value) / 1000}K+
            </button>
          ))}
          <span className="shortcut-divider" />
          <button
            type="button"
            className="mobile-filter-button"
            onClick={() => setFiltersOpen((current) => !current)}
          >
            <Icon name="filter" size={16} />
            All filters
          </button>
        </div>
      </form>

      <section className="use-cases" aria-label="Purpose presets">
        <div className="section-label">
          <Icon name="spark" size={16} />
          Explore by purpose
        </div>
        <div className="use-case-list">
          {useCases.map((preset) => (
            <button key={preset.label} onClick={() => applyUseCase(preset)}>
              {preset.label}
              <Icon name="chevron" size={14} />
            </button>
          ))}
        </div>
      </section>

      <div className="dashboard">
        <aside className={`filters ${filtersOpen ? "filters-visible" : ""}`}>
          <div className="filters-heading">
            <div>
              <span>Advanced filters</span>
              <small>Build a precise GitHub query</small>
            </div>
            <button type="button" onClick={resetFilters}>
              Reset
            </button>
          </div>

          <div className="filter-section">
            <h2>Repository scope</h2>
            <label>
              <span>Owner login</span>
              <div className="compound-field">
                <select
                  aria-label="Owner account type"
                  value={filters.ownerKind}
                  onChange={(event) =>
                    updateFilter("ownerKind", event.target.value as Filters["ownerKind"])
                  }
                >
                  <option value="org">Org</option>
                  <option value="user">User</option>
                </select>
                <input
                  value={filters.owner}
                  onChange={(event) => updateFilter("owner", event.target.value)}
                  placeholder="e.g. microsoft"
                />
              </div>
            </label>
            <label>
              <span>Search keywords in</span>
              <select
                value={filters.searchIn}
                onChange={(event) => updateFilter("searchIn", event.target.value)}
              >
                <option value="name,description,topics,readme">Everywhere</option>
                <option value="name">Repository name</option>
                <option value="description">Description</option>
                <option value="topics">Topics</option>
                <option value="readme">README</option>
                <option value="name,description">Name + description</option>
              </select>
            </label>
            <label>
              <span>Visibility</span>
              <select
                value={filters.visibility}
                onChange={(event) => updateFilter("visibility", event.target.value)}
              >
                <option value="">Any accessible</option>
                <option value="public">Public</option>
                <option value="private">Private · token required</option>
              </select>
            </label>
          </div>

          <div className="filter-section">
            <h2>Popularity</h2>
            <RangeFields
              label="Stars"
              min={filters.starsMin}
              max={filters.starsMax}
              onMin={(value) => updateFilter("starsMin", value)}
              onMax={(value) => updateFilter("starsMax", value)}
              placeholderMin="1,000"
              placeholderMax="No limit"
            />
            <RangeFields
              label="Followers"
              min={filters.followersMin}
              max={filters.followersMax}
              onMin={(value) => updateFilter("followersMin", value)}
              onMax={(value) => updateFilter("followersMax", value)}
            />
            <p className="filter-help">
              GitHub supports the <code>followers:</code> qualifier but does not
              include the exact follower count in search responses.
            </p>
            <RangeFields
              label="Forks"
              min={filters.forksMin}
              max={filters.forksMax}
              onMin={(value) => updateFilter("forksMin", value)}
              onMax={(value) => updateFilter("forksMax", value)}
            />
          </div>

          <div className="filter-section">
            <h2>Dates & size</h2>
            <DateFields
              label="Created"
              from={filters.createdFrom}
              to={filters.createdTo}
              onFrom={(value) => updateFilter("createdFrom", value)}
              onTo={(value) => updateFilter("createdTo", value)}
            />
            <DateFields
              label="Last pushed"
              from={filters.pushedFrom}
              to={filters.pushedTo}
              onFrom={(value) => updateFilter("pushedFrom", value)}
              onTo={(value) => updateFilter("pushedTo", value)}
            />
            <RangeFields
              label="Repository size · MB"
              min={filters.sizeMin}
              max={filters.sizeMax}
              onMin={(value) => updateFilter("sizeMin", value)}
              onMax={(value) => updateFilter("sizeMax", value)}
            />
          </div>

          <div className="filter-section">
            <h2>Technology & purpose</h2>
            <label>
              <span>Primary language</span>
              <select
                value={filters.language}
                onChange={(event) => updateFilter("language", event.target.value)}
              >
                <option value="">Any language</option>
                {languages.map((language) => (
                  <option key={language} value={language}>
                    {language}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <span>Topics</span>
              <input
                value={filters.topics}
                onChange={(event) => updateFilter("topics", event.target.value)}
                placeholder="ai, speech-to-text"
              />
              <small>Separate multiple topics with commas.</small>
            </label>
            <label>
              <span>License</span>
              <select
                value={filters.license}
                onChange={(event) => updateFilter("license", event.target.value)}
              >
                <option value="">Any license</option>
                {licenses.map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="filter-section">
            <h2>Repository state</h2>
            <label>
              <span>Archived</span>
              <select
                value={filters.archived}
                onChange={(event) => updateFilter("archived", event.target.value)}
              >
                <option value="">Active + archived</option>
                <option value="false">Active only</option>
                <option value="true">Archived only</option>
              </select>
            </label>
            <label>
              <span>Forked repositories</span>
              <select
                value={filters.forksMode}
                onChange={(event) => updateFilter("forksMode", event.target.value)}
              >
                <option value="sources">Source repositories</option>
                <option value="include">Include forks</option>
                <option value="only">Forks only</option>
              </select>
            </label>
            <div className="two-up">
              <label>
                <span>Template</span>
                <select
                  value={filters.template}
                  onChange={(event) => updateFilter("template", event.target.value)}
                >
                  <option value="">Any</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </label>
              <label>
                <span>Mirror</span>
                <select
                  value={filters.mirror}
                  onChange={(event) => updateFilter("mirror", event.target.value)}
                >
                  <option value="">Any</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </label>
            </div>
          </div>

          <div className="filter-footer">
            <button
              type="button"
              className="button button-red"
              onClick={() => {
                void runSearch(1);
                setFiltersOpen(false);
              }}
            >
              <Icon name="search" size={17} />
              Apply filters
            </button>
            <button type="button" className="button button-outline" onClick={saveSearch}>
              <Icon name="bookmark" size={17} />
              Save search
            </button>
          </div>
        </aside>

        <section className="results">
          <div className="query-bar">
            <div className="query-code">
              <Icon name="code" size={17} />
              <code>{lastQuery || queryPreview}</code>
            </div>
            <button onClick={copyQuery} aria-label="Copy GitHub query">
              <Icon name="copy" size={16} />
              {copied ? "Copied" : "Copy"}
            </button>
            <a
              href={`https://github.com/search?q=${encodeURIComponent(
                lastQuery || queryPreview,
              )}&type=repositories`}
              target="_blank"
              rel="noreferrer"
            >
              Open on GitHub
              <Icon name="external" size={15} />
            </a>
          </div>

          <div className="results-toolbar">
            <div>
              <span className="result-count">
                {loading ? "Searching GitHub…" : `${totalCount.toLocaleString()} repositories`}
              </span>
              <span className="result-context">
                {incomplete ? "Partial results" : "Live results"} · API requests left:{" "}
                {rateRemaining}
              </span>
            </div>
            <div className="toolbar-actions">
              <label className="select-control">
                <span>Sort</span>
                <select
                  value={`${sort}:${order}`}
                  onChange={(event) => {
                    const [nextSort, nextOrder] = event.target.value.split(":");
                    setSort(nextSort);
                    setOrder(nextOrder as "asc" | "desc");
                    void runSearch(
                      1,
                      filters,
                      nextSort,
                      nextOrder as "asc" | "desc",
                      pageSize,
                    );
                  }}
                >
                  <option value="stars:desc">Most stars</option>
                  <option value="stars:asc">Fewest stars</option>
                  <option value="forks:desc">Most forks</option>
                  <option value="updated:desc">Recently updated</option>
                  <option value="help-wanted-issues:desc">Help wanted</option>
                  <option value=":desc">Best match</option>
                </select>
              </label>
              <div className="view-toggle" aria-label="Result layout">
                <button
                  className={view === "grid" ? "active" : ""}
                  onClick={() => setView("grid")}
                  aria-label="Grid view"
                >
                  <Icon name="grid" size={16} />
                </button>
                <button
                  className={view === "list" ? "active" : ""}
                  onClick={() => setView("list")}
                  aria-label="List view"
                >
                  <Icon name="list" size={17} />
                </button>
              </div>
              <div className="export-menu">
                <button className="button button-outline">
                  <Icon name="download" size={16} />
                  Export
                </button>
                <div>
                  <button onClick={() => exportResults("csv")}>Current page · CSV</button>
                  <button onClick={() => exportResults("json")}>Current page · JSON</button>
                </div>
              </div>
            </div>
          </div>

          {error && (
            <div className="error-banner" role="alert">
              <Icon name="shield" size={20} />
              <div>
                <strong>Search unavailable</strong>
                <span>{error}</span>
              </div>
              <button onClick={() => setError("")} aria-label="Dismiss error">
                <Icon name="x" size={17} />
              </button>
            </div>
          )}

          {loading ? (
            <div className={`repository-grid ${view === "list" ? "list-view" : ""}`}>
              {Array.from({ length: 6 }).map((_, index) => (
                <div className="repository-card skeleton" key={index}>
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
              ))}
            </div>
          ) : repositories.length ? (
            <div className={`repository-grid ${view === "list" ? "list-view" : ""}`}>
              {repositories.map((repo, index) => (
                <article className="repository-card" key={repo.id}>
                  <div className="rank">#{(page - 1) * pageSize + index + 1}</div>
                  <div className="repo-heading">
                    <a
                      href={repo.owner.html_url}
                      target="_blank"
                      rel="noreferrer"
                      className="owner-avatar"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={repo.owner.avatar_url} alt="" />
                    </a>
                    <div>
                      <a href={repo.html_url} target="_blank" rel="noreferrer">
                        <span>{repo.owner.login}/</span>
                        <strong>{repo.name}</strong>
                      </a>
                      <div className="repo-badges">
                        <span>{repo.visibility}</span>
                        {repo.archived && (
                          <span className="archived-badge">
                            <Icon name="archive" size={12} /> archived
                          </span>
                        )}
                        {repo.fork && <span>fork</span>}
                      </div>
                    </div>
                    <a
                      className="repo-open"
                      href={repo.html_url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Open ${repo.full_name}`}
                    >
                      <Icon name="external" size={16} />
                    </a>
                  </div>

                  <p className="repo-description">
                    {repo.description || "No repository description is available."}
                  </p>

                  <div className="repo-topics">
                    {repo.topics.slice(0, 5).map((topic) => (
                      <button
                        key={topic}
                        onClick={() => {
                          const next = { ...filters, topics: topic };
                          setFilters(next);
                          void runSearch(1, next);
                        }}
                      >
                        {topic}
                      </button>
                    ))}
                    {repo.topics.length > 5 && <span>+{repo.topics.length - 5}</span>}
                  </div>

                  <div className="repo-metrics">
                    <div>
                      <Icon name="star" size={17} />
                      <strong>{formatNumber(repo.stargazers_count)}</strong>
                      <span>stars</span>
                    </div>
                    <div>
                      <Icon name="issue" size={17} />
                      <strong>{formatNumber(repo.open_issues_count)}</strong>
                      <span>open issues</span>
                    </div>
                    <div>
                      <Icon name="fork" size={17} />
                      <strong>{formatNumber(repo.forks_count)}</strong>
                      <span>forks</span>
                    </div>
                  </div>

                  <div className="repo-meta">
                    <span>
                      <i
                        className="language-dot"
                        style={{
                          background: languageColor(repo.language),
                        }}
                      />
                      {repo.language || "Not specified"}
                    </span>
                    <span>{repo.license?.spdx_id || "No license"}</span>
                    <span>{formatSize(repo.size)}</span>
                  </div>
                  <div className="repo-dates">
                    <span>
                      <Icon name="calendar" size={14} />
                      Created {formatDate(repo.created_at)}
                    </span>
                    <span>Last pushed {formatDate(repo.pushed_at)}</span>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <span>
                <Icon name="search" size={28} />
              </span>
              <h2>No repositories found</h2>
              <p>Broaden a date range, lower the star threshold, or remove a topic.</p>
              <button className="button button-red" onClick={resetFilters}>
                Reset filters
              </button>
            </div>
          )}

          {!loading && repositories.length > 0 && (
            <div className="pagination">
              <div>
                <span>Rows per page</span>
                <select
                  value={pageSize}
                  onChange={(event) => {
                    const nextPageSize = Number(event.target.value);
                    setPageSize(nextPageSize);
                    void runSearch(1, filters, sort, order, nextPageSize);
                  }}
                >
                  {[10, 25, 50, 100].map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>
              <span>
                Page {page} of {maxPage}
              </span>
              <div className="page-buttons">
                <button
                  disabled={page <= 1}
                  onClick={() => void runSearch(page - 1)}
                  aria-label="Previous page"
                >
                  <Icon name="chevron" size={17} />
                </button>
                <button
                  disabled={page >= maxPage}
                  onClick={() => void runSearch(page + 1)}
                  aria-label="Next page"
                >
                  <Icon name="chevron" size={17} />
                </button>
              </div>
            </div>
          )}
        </section>
      </div>

      <footer>
        <div>
          <span className="brand-mark small">
            <Icon name="star" size={15} />
          </span>
          <strong>StarSearch</strong>
          <span>Open-source GitHub repository discovery.</span>
        </div>
        <div>
          <a
            href="https://docs.github.com/en/search-github/searching-on-github/searching-for-repositories"
            target="_blank"
            rel="noreferrer"
          >
            Search syntax
          </a>
          <a
            href="https://docs.github.com/en/rest/search/search"
            target="_blank"
            rel="noreferrer"
          >
            API docs
          </a>
          <span>Not affiliated with GitHub, Inc.</span>
        </div>
      </footer>

      {tokenOpen && (
        <div className="modal-backdrop" role="presentation" onMouseDown={() => setTokenOpen(false)}>
          <section
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="token-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setTokenOpen(false)}
              aria-label="Close token dialog"
            >
              <Icon name="x" size={18} />
            </button>
            <span className="modal-icon">
              <Icon name="key" size={23} />
            </span>
            <h2 id="token-title">Connect your GitHub token</h2>
            <p>
              Increase API limits and search private repositories you can access.
              The token is stored only in this browser tab and is sent exclusively
              to <code>api.github.com</code>.
            </p>
            <label>
              Personal access token
              <input
                type="password"
                value={tokenDraft}
                onChange={(event) => setTokenDraft(event.target.value)}
                placeholder="github_pat_••••••••••••"
                autoComplete="off"
              />
            </label>
            <div className="modal-note">
              <Icon name="shield" size={17} />
              For public search, a token does not need repository permissions. Private
              results require the minimum read permission appropriate to your account.
            </div>
            <div className="modal-actions">
              {token && (
                <button
                  className="button button-quiet danger"
                  onClick={() => {
                    setTokenDraft("");
                    setToken("");
                    sessionStorage.removeItem("starsearch-token");
                    setTokenOpen(false);
                  }}
                >
                  Remove token
                </button>
              )}
              <button className="button button-red" onClick={saveToken}>
                Save for this session
              </button>
            </div>
          </section>
        </div>
      )}

      {savedOpen && (
        <div className="modal-backdrop" role="presentation" onMouseDown={() => setSavedOpen(false)}>
          <section
            className="modal saved-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="saved-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setSavedOpen(false)}
              aria-label="Close saved searches"
            >
              <Icon name="x" size={18} />
            </button>
            <span className="modal-icon">
              <Icon name="bookmark" size={22} />
            </span>
            <h2 id="saved-title">Saved searches</h2>
            <p>Stored locally on this device. Select one to rerun it.</p>
            {savedSearches.length ? (
              <div className="saved-list">
                {savedSearches.map((saved) => (
                  <div key={saved.id}>
                    <button className="saved-content" onClick={() => loadSavedSearch(saved)}>
                      <strong>{saved.name}</strong>
                      <code>{buildQuery(saved.filters)}</code>
                    </button>
                    <button
                      className="saved-remove"
                      onClick={() => removeSavedSearch(saved.id)}
                      aria-label={`Delete ${saved.name}`}
                    >
                      <Icon name="x" size={15} />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="saved-empty">
                <Icon name="bookmark" size={24} />
                <span>No saved searches yet.</span>
              </div>
            )}
          </section>
        </div>
      )}
    </main>
  );
}

function RangeFields({
  label,
  min,
  max,
  onMin,
  onMax,
  placeholderMin = "Minimum",
  placeholderMax = "Maximum",
}: {
  label: string;
  min: string;
  max: string;
  onMin: (value: string) => void;
  onMax: (value: string) => void;
  placeholderMin?: string;
  placeholderMax?: string;
}) {
  return (
    <fieldset className="range-fields">
      <legend>{label}</legend>
      <input
        type="number"
        min="0"
        value={min}
        onChange={(event) => onMin(event.target.value)}
        placeholder={placeholderMin}
        aria-label={`${label} minimum`}
      />
      <span>to</span>
      <input
        type="number"
        min="0"
        value={max}
        onChange={(event) => onMax(event.target.value)}
        placeholder={placeholderMax}
        aria-label={`${label} maximum`}
      />
    </fieldset>
  );
}

function DateFields({
  label,
  from,
  to,
  onFrom,
  onTo,
}: {
  label: string;
  from: string;
  to: string;
  onFrom: (value: string) => void;
  onTo: (value: string) => void;
}) {
  return (
    <fieldset className="date-fields">
      <legend>{label}</legend>
      <label>
        <small>From</small>
        <input type="date" value={from} onChange={(event) => onFrom(event.target.value)} />
      </label>
      <label>
        <small>To</small>
        <input type="date" value={to} onChange={(event) => onTo(event.target.value)} />
      </label>
    </fieldset>
  );
}

function languageColor(language: string | null) {
  const colors: Record<string, string> = {
    C: "#555555",
    "C#": "#178600",
    "C++": "#f34b7d",
    CSS: "#563d7c",
    Dart: "#00b4ab",
    Go: "#00add8",
    HTML: "#e34c26",
    Java: "#b07219",
    JavaScript: "#f1e05a",
    "Jupyter Notebook": "#da5b0b",
    Kotlin: "#a97bff",
    PHP: "#4f5d95",
    Python: "#3572a5",
    Ruby: "#701516",
    Rust: "#dea584",
    Shell: "#89e051",
    Swift: "#f05138",
    TypeScript: "#3178c6",
  };
  return language ? colors[language] ?? "#768390" : "#a8afb8";
}
