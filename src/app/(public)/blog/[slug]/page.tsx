import { getBlogPostBySlug, getBlogPosts } from "@/lib/data";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return { title: "Blog" };
  return { title: post.title, description: post.excerpt };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  const paragraphs = post.body.split("\n").filter(Boolean);

  return (
    <article className="bg-cream">
      {post.cover_image && (
        <div className="relative h-[40vh] min-h-[240px] max-h-[420px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.cover_image}
            alt={post.title}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
      )}
      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12 sm:py-16">
        <Link
          href="/blog"
          className="text-sm text-maroon hover:underline underline-offset-4"
        >
          ← Back to blog
        </Link>
        <h1 className="font-serif text-3xl sm:text-5xl text-maroon mt-4 leading-tight">
          {post.title}
        </h1>
        {post.published_at && (
          <p className="mt-3 text-sm text-muted">
            {new Date(post.published_at).toLocaleDateString("en-IN", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        )}
        <div className="mt-10 space-y-4 prose-wedding">
          {paragraphs.map((line, i) => {
            if (line.startsWith("## ")) {
              return (
                <h2
                  key={i}
                  className="font-serif text-2xl text-maroon pt-4"
                >
                  {line.replace("## ", "")}
                </h2>
              );
            }
            return (
              <p key={i} className="text-ink/85 leading-relaxed">
                {line}
              </p>
            );
          })}
        </div>
      </div>
    </article>
  );
}
