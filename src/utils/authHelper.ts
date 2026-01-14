// utils/auth.ts
import { cookies } from "next/headers";

export async function getServerAuth() {
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;

    if (!token) return { isAuthenticated: false, user: null };

    try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        const now = Math.floor(Date.now() / 1000);
        if (payload.exp < now) return { isAuthenticated: false, user: null };

        return { isAuthenticated: true, user: payload };
    } catch (err) {
        console.error(err);
        return { isAuthenticated: false, user: null };
    }
}
