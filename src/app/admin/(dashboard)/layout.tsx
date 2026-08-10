import Link from "next/link";
import { requireAdmin } from "@/lib/admin-auth";
import { AdminNav } from "@/components/admin/AdminNav";
import { AdminSignOut } from "@/components/admin/AdminSignOut";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await requireAdmin();

  return (
    <div className="min-h-screen bg-[#f5f2ed] flex">
      <aside className="hidden lg:flex w-60 shrink-0 flex-col border-r border-border bg-cream">
        <div className="p-5 border-b border-border">
          <Link href="/admin" className="font-serif text-lg text-maroon">
            Admin
          </Link>
          <p className="text-xs text-muted mt-1 truncate">{user.email}</p>
        </div>
        <AdminNav />
        <div className="mt-auto p-4 border-t border-border space-y-2">
          <Link
            href="/"
            className="block text-xs text-muted hover:text-maroon"
          >
            ← View site
          </Link>
          <AdminSignOut />
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="lg:hidden flex items-center justify-between px-4 h-14 border-b border-border bg-cream">
          <Link href="/admin" className="font-serif text-maroon">
            Admin
          </Link>
          <Link href="/" className="text-xs text-muted">
            View site
          </Link>
        </header>
        <div className="lg:hidden overflow-x-auto border-b border-border bg-cream px-2">
          <AdminNav horizontal />
        </div>
        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
