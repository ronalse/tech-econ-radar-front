const API_URL = ( process.env.NEXT_PUBLIC_API_KEY || "http://127.0.0.1:8000" );
// si falla el api key, se asume que estamos en local y se apunta al backend local. Esto es util para desarrollo y testing.
export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.name = "ApiError";
  }
}

interface RequestOptions {
  method?: "GET" | "POST";
  params?: Record<string, string | number | boolean | undefined>;
}

function buildUrl(path: string, params?: RequestOptions["params"]): string {
  const url = new URL(`${API_URL}${path}`);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        url.searchParams.set(key, String(value));
      }
    });
  }
  return url.toString();
}

/**
 * BaseService equivalente: unico punto que sabe hablar HTTP con el backend.
 * Los *Service.ts especificos (ArticlesService, etc.) llaman a estas
 * funciones en vez de usar fetch directamente.
 */
export async function apiGet<T>(path: string, params?: RequestOptions["params"]): Promise<T> {
  const response = await fetch(buildUrl(path, params), { method: "GET" });
  if (!response.ok) {
    throw new ApiError(`GET ${path} fallo con status ${response.status}`, response.status);
  }
  return response.json() as Promise<T>;
}

export async function apiPost<T>(path: string, params?: RequestOptions["params"]): Promise<T> {
  const response = await fetch(buildUrl(path, params), { method: "POST" });
  if (!response.ok) {
    throw new ApiError(`POST ${path} fallo con status ${response.status}`, response.status);
  }
  return response.json() as Promise<T>;
}
