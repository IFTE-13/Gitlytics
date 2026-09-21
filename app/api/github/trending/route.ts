import { NextResponse } from "next/server";
import { githubFetch } from "@/lib/github";

export interface TrendingRepo {
  name: string;
  fullName: string;
  owner: string;
  ownerAvatar: string;
  description: string;
  stars: number;
  forks: number;
  language: string | null;
  url: string;
  topics: string[];
}

const FALLBACK_TRENDING: TrendingRepo[] = [
  {
    name: "ui",
    fullName: "shadcn-ui/ui",
    owner: "shadcn",
    ownerAvatar: "https://avatars.githubusercontent.com/u/124599?v=4",
    description: "A set of beautifully-designed, accessible components and a code distribution platform.",
    stars: 84200,
    forks: 7100,
    language: "TypeScript",
    url: "https://github.com/shadcn-ui/ui",
    topics: ["react", "tailwind", "ui", "radix-ui", "components"],
  },
  {
    name: "next.js",
    fullName: "vercel/next.js",
    owner: "vercel",
    ownerAvatar: "https://avatars.githubusercontent.com/u/14985020?v=4",
    description: "The React Framework for the Web. Used by some of the world's largest companies.",
    stars: 131500,
    forks: 27400,
    language: "JavaScript",
    url: "https://github.com/vercel/next.js",
    topics: ["react", "framework", "ssr", "fullstack", "jamstack"],
  },
  {
    name: "linux",
    fullName: "torvalds/linux",
    owner: "torvalds",
    ownerAvatar: "https://avatars.githubusercontent.com/u/1024025?v=4",
    description: "Linux kernel source tree maintained by Linus Torvalds.",
    stars: 194000,
    forks: 55600,
    language: "C",
    url: "https://github.com/torvalds/linux",
    topics: ["operating-system", "kernel", "c", "systems"],
  },
  {
    name: "uv",
    fullName: "astral-sh/uv",
    owner: "astral-sh",
    ownerAvatar: "https://avatars.githubusercontent.com/u/115962839?v=4",
    description: "An extremely fast Python package and project manager, written in Rust.",
    stars: 52000,
    forks: 2100,
    language: "Rust",
    url: "https://github.com/astral-sh/uv",
    topics: ["python", "rust", "packaging", "performance"],
  },
  {
    name: "bun",
    fullName: "oven-sh/bun",
    owner: "Jarred-Sumner",
    ownerAvatar: "https://avatars.githubusercontent.com/u/961176?v=4",
    description: "Incredibly fast JavaScript runtime, bundler, test runner, and package manager.",
    stars: 77000,
    forks: 2800,
    language: "Zig",
    url: "https://github.com/oven-sh/bun",
    topics: ["javascript", "runtime", "zig", "bundler"],
  },
  {
    name: "supabase",
    fullName: "supabase/supabase",
    owner: "kiwicopple",
    ownerAvatar: "https://avatars.githubusercontent.com/u/8291514?v=4",
    description: "The open source Firebase alternative. Build production apps with Postgres, Auth, and APIs.",
    stars: 81000,
    forks: 6900,
    language: "TypeScript",
    url: "https://github.com/supabase/supabase",
    topics: ["postgres", "database", "auth", "realtime", "storage"],
  },
];

export async function GET() {
  try {
    // Try to fetch latest highly-starred trending repos from GitHub API
    const data = await githubFetch<{
      items: Array<{
        name: string;
        full_name: string;
        owner: { login: string; avatar_url: string };
        description: string | null;
        stargazers_count: number;
        forks_count: number;
        language: string | null;
        html_url: string;
        topics?: string[];
      }>;
    }>("https://api.github.com/search/repositories?q=stars:>40000&sort=stars&order=desc&per_page=8");

    if (data?.items && data.items.length > 0) {
      const repos: TrendingRepo[] = data.items.map((item) => ({
        name: item.name,
        fullName: item.full_name,
        owner: item.owner.login,
        ownerAvatar: item.owner.avatar_url,
        description: item.description || "Open source software project.",
        stars: item.stargazers_count,
        forks: item.forks_count,
        language: item.language,
        url: item.html_url,
        topics: item.topics?.slice(0, 3) || [],
      }));
      return NextResponse.json(repos);
    }

    return NextResponse.json(FALLBACK_TRENDING);
  } catch {
    // If rate limited or error, return the verified fallback trending repos
    return NextResponse.json(FALLBACK_TRENDING);
  }
}
