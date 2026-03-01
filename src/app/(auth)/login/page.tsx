import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoginForm } from "./components/loginForm";
import Link from "next/link";
import Header from "@/components/auth/header";

export default function LoginPage() {
  return (
    <div className="w-full max-w-md space-y-6">
      <Header title="Bem-vindo" subtitle="Entre na sua conta para continuar" />

      <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
        <CardHeader className="space-y-1 pb-4">
          <CardTitle className="text-xl">Fazer Login</CardTitle>
          <CardDescription>Use suas credenciais para acessar</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <LoginForm />
        </CardContent>
      </Card>

      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Nao tem conta?{" "}
          <Link
            href="/signup"
            className="font-medium text-primary transition-colors hover:text-primary/80"
          >
            Criar agora
          </Link>
        </p>
      </div>
    </div>
  );
}
