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

export default function SignupPage() {
  return (
    <div className="w-full max-w-md space-y-6">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Criar conta</CardTitle>
          <CardDescription>
            Preencha os dados para criar sua conta
          </CardDescription>
        </CardHeader>
        <CardContent>
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
