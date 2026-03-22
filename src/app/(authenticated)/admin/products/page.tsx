import PageHeader from "@/components/pageHeader";

export default async function ProductsPage() {
  return (
    <div className="flex h-full flex-col">
      <PageHeader
        title="Produtos"
        subtitle="Gerencie seus modelos 3D"
      ></PageHeader>
    </div>
  );
}
