import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SignupForm } from "./components/signupForm";
import Footer from "@/components/auth/footer";
import Link from "next/link";
import Header from "@/components/auth/header";

export default function SignupPage() {
  return (
    <div className="w-full max-w-md space-y-6">
      <Header title="Criar conta" subtitle="Comece a usar gratuitamente" />
      <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
        <CardHeader className="space-y-1 pb-4">
          <CardTitle className="text-xl">Detalhes da conta</CardTitle>
          <CardDescription>Complete seu cadastro</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <SignupForm />
        </CardContent>
      </Card>

      <Footer>
        Já tem uma conta?{" "}
        <Link
          href="/login"
          className="font-medium text-primary transition-colors hover:text-primary/80"
        >
          Faça login
        </Link>
      </Footer>
    </div>
  );
}
