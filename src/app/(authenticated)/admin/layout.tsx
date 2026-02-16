import { AdminHeader } from "@/components/admin/adminHeader";
import { getServerUser } from "@/actions/authServerActions";

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
      {/* Main content */}
      <main className="flex-1 overflow-hidden">{children}</main>
    </div>
  </div>
  );
}
