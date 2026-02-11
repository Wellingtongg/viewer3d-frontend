const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

type RequestOptions = {
  method?: "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
  body?: unknown;
  headers?: Record<string, string>;
};

export async function api<T>(
  endpoint: string,
  options: RequestOptions = {},
): Promise<{ data: T | null; error: string | null; status: number }> {
  const { method = "GET", body, headers = {} } = options;

  const config: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    credentials: "include", // IMPORTANTE: envia cookies cross-origin
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

// Helpers
export const apiGet = <T>(endpoint: string) =>
  api<T>(endpoint, { method: "GET" });

export const apiPost = <T>(endpoint: string, body: unknown) =>
  api<T>(endpoint, { method: "POST", body });

export const apiPatch = <T>(endpoint: string, body: unknown) =>
  api<T>(endpoint, { method: "PATCH", body });

export const apiDelete = <T>(endpoint: string) =>
  api<T>(endpoint, { method: "DELETE" });
