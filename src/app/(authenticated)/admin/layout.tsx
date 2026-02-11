import Link from "next/link";
import { Home } from "lucide-react";

import { cn } from "@/lib/utils";
import { LogoutButton } from "@/components/auth/logoutButton";
import { getServerUser } from "@/actions/authServerActions";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const sidebarItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: Home },
];

export default async function AdminLayout({ children }: AdminLayoutProps) {
  const user = await getServerUser();

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="hidden w-64 border-r bg-card lg:block">
        <div className="flex h-16 items-center border-b px-6">
          <Link href="/admin/dashboard" className="text-xl font-bold">
            Viewer3D
          </Link>
        </div>
        <nav className="flex h-[calc(100vh-4rem)] flex-col justify-between">
          <div className="space-y-1 p-4">
            {sidebarItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-colors",
                  "hover:bg-accent hover:text-accent-foreground",
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1">
        <header className="flex h-16 items-center justify-between border-b px-6">
          <div className="lg:hidden">
            <Link href="/admin/dashboard" className="text-xl font-bold">
              Viewer3D
            </Link>
          </div>
          <div className="ml-auto flex items-center gap-4">
            <span className="hidden text-sm text-muted-foreground sm:block">
              {user?.email}
            </span>
            <LogoutButton variant="outline" showText={false} />
          </div>
        </header>
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
