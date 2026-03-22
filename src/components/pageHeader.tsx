interface PageHeaderProps {
  title: string;
  subtitle: string;
  actions?: React.ReactNode;
}

export default function PageHeader({
  title,
  subtitle,
  actions,
}: PageHeaderProps) {
  return (
    <header className="flex flex-col gap-3 border-b px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-4">
      <div>
        <h1 className="text-base font-semibold text-foreground sm:text-lg">
          {title}
        </h1>
        <p className="text-xs text-muted-foreground sm:text-sm">{subtitle}</p>
      </div>
      {actions}
    </header>
  );
}
