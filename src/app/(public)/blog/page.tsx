import Link from "next/link";
import { getBlogPosts } from "@/lib/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "Wedding planning tips, venue guides, and stories from Highlight Creations.",
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="bg-cream min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl sm:text-5xl text-maroon">Blog</h1>
          <p className="mt-3 text-muted">
            Ideas, guides, and inspiration for your big day.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group rounded-xl overflow-hidden bg-white border border-border hover:shadow-md transition-shadow"
            >
              {post.cover_image && (
                <div className="aspect-[16/10] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={post.cover_image}
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              )}
              <div className="p-5">
                <h2 className="font-serif text-xl text-ink group-hover:text-maroon transition-colors leading-snug">
                  {post.title}
                </h2>
                <p className="mt-2 text-sm text-muted line-clamp-3">
                  {post.excerpt}
                </p>
                {post.published_at && (
                  <p className="mt-3 text-xs text-muted">
                    {new Date(post.published_at).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
