import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");

  if (!url) {
    return NextResponse.json({ error: "url required" }, { status: 400 });
  }

  try {
    const oembed = `https://www.instagram.com/api/v1/oembed/?url=${encodeURIComponent(url)}`;
    const res = await fetch(oembed, {
      headers: { "User-Agent": "Mozilla/5.0" },
      next: { revalidate: 86400 },
    });

    if (!res.ok) {
      // Fallback: try public oEmbed endpoint
      const alt = await fetch(
        `https://graph.facebook.com/v18.0/instagram_oembed?url=${encodeURIComponent(url)}&omitscript=true`
      );
      if (!alt.ok) {
        return NextResponse.json(
          { error: "Could not fetch Instagram embed", thumbnail_url: null },
          { status: 502 }
        );
      }
      const data = await alt.json();
      return NextResponse.json(data);
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Instagram oEmbed failed", thumbnail_url: null },
      { status: 502 }
    );
  }
}
