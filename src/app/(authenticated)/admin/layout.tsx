import { getServerUser } from "@/actions/authServerActions";
import { AdminHeader } from "@/components/admin/adminHeader";
import { AdminNav } from "@/components/admin/adminNav";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default async function AdminLayout({ children }: AdminLayoutProps) {
  const user = await getServerUser();

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      {/* Header - always visible */}
      <AdminHeader user={user} />

      {/* Main content area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Desktop sidebar - hidden on mobile */}
        <div className="hidden sm:flex">
          <AdminNav />
        </div>

        {/* Main content */}
        <main className="flex-1 overflow-hidden">{children}</main>
      </div>
    </div>
  );
}
