import { cookies } from "next/headers";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

type RequestOptions = {
  method?: "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
  body?: unknown;
};

export async function apiServer<T>(
  endpoint: string,
  options: RequestOptions = {},
): Promise<{ data: T | null; error: string | null; status: number }> {
  const { method = "GET", body } = options;

  // Pega os cookies do request para enviar ao Rails
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  const config: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieHeader,
    },
    cache: "no-store", // Não cachear requests autenticados
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

    let data = null;
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    }

    if (!response.ok) {
      return {
        data: data as T,
        error: data?.error || data?.error_messages?.[0] || "Erro na requisição",
        status: response.status,
      };
    }

    return { data, error: null, status: response.status };
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error.message : "Erro de conexão",
      status: 0,
    };
  }
}
