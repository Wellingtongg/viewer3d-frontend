import PageHeader from "@/components/pageHeader";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default async function UsersPage() {
  return (
    <div className="flex h-full flex-col">
      <PageHeader
        title="Usuários"
        subtitle="Gerencie membros da equipe"
        actions={
          <Button size="sm" className="gap-1.5 self-start">
            <Plus className="h-4 w-4" />
            Convidar
          </Button>
        }
      />
    </div>
  );
}
