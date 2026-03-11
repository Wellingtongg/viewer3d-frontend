import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ForgotPasswordForm } from "./components/forgotPasswordForm";
import Header from "@/components/auth/header";
import Footer from "@/components/auth/footer";
import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <div className="w-full max-w-md space-y-6">
      <Header
        title="Recuperar senha"
        subtitle="Insira seu email para receber um link de redefinição"
      />

      <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
        <CardHeader className="space-y-1 pb-4">
          <CardTitle className="text-xl">Esqueci minha senha</CardTitle>
          <CardDescription>
            Nos enviaremos um link para seu email
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ForgotPasswordForm />
        </CardContent>
      </Card>

      <Footer>
        Lembrou a senha?{" "}
        <Link
          href="/login"
          className="font-medium text-primary transition-colors hover:text-primary/80"
        >
          Entrar
        </Link>
      </Footer>
    </div>
  );
}
