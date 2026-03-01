interface FooterProps {
  children: React.ReactNode;
}

export default function Footer({ children }: FooterProps) {
  return (
    <div className="text-center">
      <p className="text-sm text-muted-foreground">{children}</p>
    </div>
  );
}
