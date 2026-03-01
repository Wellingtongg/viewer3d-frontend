import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoginForm } from "./components/loginForm";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="w-full max-w-md space-y-6">
      <div className="space-y-2 text-center">
        <div className="flex justify-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary">
            <span className="text-xl font-bold text-primary-foreground">
              3D
            </span>
          </div>
        </div>
        <h1 className="text-2xl font-bold text-foreground">Bem-vindo</h1>
        <p className="text-sm text-muted-foreground">
          Entre na sua conta para continuar
        </p>
      </div>

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
