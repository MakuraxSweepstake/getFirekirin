// routes/Private.tsx
import { cookies } from "next/headers";
import React from "react";
import ReduxHydrator from "./ReduxHydrator";

// function decodeJwt(token: string) {
//     try {
//         return JSON.parse(atob(token.split(".")[1]));
//     } catch {
//         return null;
//     }
// }

export default async function ServerPrivate({ children }: { children: React.ReactNode }) {
    const cookieStore = await cookies();
    const access_token = cookieStore.get("access_token")?.value;
    const user_cookie = cookieStore.get("user")?.value;
    const user = user_cookie ? JSON.parse(user_cookie) : null;
    if (!access_token||!user) return;

    return (
        <>
            {/* ✅ Hydrate Redux store on client */}
            <ReduxHydrator token={access_token} user={user}/>
            {children}
        </>
    );
}