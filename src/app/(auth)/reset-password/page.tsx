import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ResetPasswordForm } from "./components/resetPasswordForm";
import Header from "@/components/auth/header";
import Footer from "@/components/auth/footer";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ResetPasswordPage() {
  return (
    <div className="w-full max-w-md space-y-6">
      <Header title="Bem-vindo" subtitle="Entre na sua conta para continuar" />

      <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
        <CardHeader className="space-y-1 pb-4">
          <CardTitle className="text-xl">Redefinir senha</CardTitle>
          <CardDescription>Digite sua nova senha abaixo</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <ResetPasswordForm />
        </CardContent>
      </Card>

      <Footer>
        <Link
          href="/login"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar para login
        </Link>
      </Footer>
    </div>
  );
}
