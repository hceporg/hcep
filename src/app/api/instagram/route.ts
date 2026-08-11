import { NextResponse } from "next/server";

/**
 * Fetch Instagram oEmbed metadata (thumbnail_url, title, author).
 * Used by the homepage reels cards.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");

  if (!url) {
    return NextResponse.json({ error: "url required" }, { status: 400 });
  }

  // Guard against demo / invalid IDs
  if (/\/reel\/example/i.test(url)) {
    return NextResponse.json({ thumbnail_url: null, title: null });
  }

  const endpoints = [
    `https://www.instagram.com/oembed/?url=${encodeURIComponent(url)}&omitscript=true`,
    `https://api.instagram.com/oembed?url=${encodeURIComponent(url)}&omitscript=true`,
  ];

  for (const endpoint of endpoints) {
    try {
      const res = await fetch(endpoint, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (compatible; HighlightCreationsBot/1.0; +https://hcep.in)",
          Accept: "application/json",
        },
        next: { revalidate: 86400 },
      });
      if (!res.ok) continue;
      const data = await res.json();
      if (data?.thumbnail_url) {
        return NextResponse.json({
          thumbnail_url: data.thumbnail_url as string,
          title: (data.title as string) ?? null,
          author_name: (data.author_name as string) ?? null,
        });
      }
    } catch {
      // try next endpoint
    }
  }

  return NextResponse.json({ thumbnail_url: null, title: null });
}
