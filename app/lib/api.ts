// app/lib/api.ts
export const API_URL = "http://localhost:3000/api";

export async function apiPost(endpoint: string, data: any, token?: string) {
  const res = await fetch(`${API_URL}/${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function apiGet(endpoint: string, token?: string) {
  const res = await fetch(`${API_URL}/${endpoint}`, {
    method: "GET",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return res.json();
}