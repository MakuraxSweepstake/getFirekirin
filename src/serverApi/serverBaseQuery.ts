// lib/baseQuery.ts


export async function serverBaseQuery<T>(
    endpoint: string,
    {
        method = "GET",
        token,
        body,
        cache = "no-store",
        withAuth = false,
    }: {
        method?: string;
        token?: string;
        body?: unknown;
        cache?: RequestCache;
        withAuth?: boolean;
    } = {}
): Promise<T> {

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${endpoint}`, {
        method,
        cache,
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        ...(body ? { body: JSON.stringify(body) } : {}),
    });

    if (!res.ok) throw new Error(`Request failed: ${res.status} ${res.statusText}`);
    return res.json();
}
