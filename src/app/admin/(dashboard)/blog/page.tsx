"use client";

import { useState } from "react";
import { mockBlogPosts } from "@/lib/mock-data";
import type { BlogPost } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { BlogImageUpload } from "@/components/admin/BlogImageUpload";
import { slugify } from "@/lib/utils";

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>(mockBlogPosts);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [coverImage, setCoverImage] = useState<string | null>(null);

  function openNew() {
    setEditing(null);
    setCoverImage(null);
    setShowForm(true);
  }

  function openEdit(post: BlogPost) {
    setEditing(post);
    setCoverImage(post.cover_image);
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
    setEditing(null);
    setCoverImage(null);
  }

  function save(form: FormData) {
    const title = String(form.get("title"));
    const status = form.get("status") as "draft" | "published";
    const payload: BlogPost = {
      id: editing?.id ?? `bp${Date.now()}`,
      title,
      slug: String(form.get("slug") || slugify(title)),
      cover_image: coverImage,
      excerpt: String(form.get("excerpt")),
      body: String(form.get("body")),
      status,
      published_at:
        status === "published"
          ? editing?.published_at ?? new Date().toISOString()
          : null,
      created_at: editing?.created_at ?? new Date().toISOString(),
    };
    setPosts((prev) => {
      if (prev.find((p) => p.id === payload.id)) {
        return prev.map((p) => (p.id === payload.id ? payload : p));
      }
      return [payload, ...prev];
    });
    closeForm();
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-serif text-3xl text-maroon">Blog Manager</h1>
          <p className="text-sm text-muted mt-1">
            Create posts with a cover image upload (Supabase Storage, max 5 MB)
            and markdown body.
          </p>
        </div>
        <Button onClick={openNew}>New post</Button>
      </div>

      {showForm && (
        <form
          className="mt-6 rounded-xl border border-border bg-white p-5 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            save(new FormData(e.currentTarget));
          }}
        >
          <Field name="title" label="Title" defaultValue={editing?.title} required />
          <Field
            name="slug"
            label="Slug"
            defaultValue={editing?.slug}
            placeholder="auto from title"
          />

          <BlogImageUpload value={coverImage} onChange={setCoverImage} />

          <Field
            name="excerpt"
            label="Excerpt"
            defaultValue={editing?.excerpt}
            required
          />
          <label className="block text-sm">
            Body (markdown)
            <textarea
              name="body"
              required
              rows={10}
              defaultValue={editing?.body}
              className="mt-1 w-full rounded-lg border border-border px-3 py-2 font-mono text-sm outline-none focus:border-maroon"
            />
          </label>
          <label className="block text-sm">
            Status
            <select
              name="status"
              defaultValue={editing?.status ?? "draft"}
              className="mt-1 w-full rounded-lg border border-border px-3 py-2 outline-none focus:border-maroon"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </label>
          <div className="flex gap-2">
            <Button type="submit">Save</Button>
            <Button type="button" variant="ghost" onClick={closeForm}>
              Cancel
            </Button>
          </div>
        </form>
      )}

      <div className="mt-6 space-y-3">
        {posts.map((p) => (
          <div
            key={p.id}
            className="rounded-xl border border-border bg-white p-4 flex flex-col sm:flex-row gap-4"
          >
            {p.cover_image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={p.cover_image}
                alt=""
                className="w-full sm:w-28 h-20 object-cover rounded-lg shrink-0"
              />
            )}
            <div className="flex-1 min-w-0">
              <p className="font-medium">{p.title}</p>
              <p className="text-xs text-muted mt-1">
                /blog/{p.slug} · {p.status}
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="!px-3 !py-1.5 text-xs"
                onClick={() => openEdit(p)}
              >
                Edit
              </Button>
              <Button
                variant="ghost"
                className="!px-3 !py-1.5 text-xs"
                onClick={() =>
                  setPosts((prev) => prev.filter((x) => x.id !== p.id))
                }
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Field(props: {
  name: string;
  label: string;
  defaultValue?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="block text-sm">
      {props.label}
      <input
        name={props.name}
        required={props.required}
        defaultValue={props.defaultValue}
        placeholder={props.placeholder}
        className="mt-1 w-full rounded-lg border border-border px-3 py-2 outline-none focus:border-maroon"
      />
    </label>
  );
}
