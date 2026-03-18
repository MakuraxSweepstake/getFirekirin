// components/Private.tsx

"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/hook";
import { clearTokens, setTokens } from "@/slice/authSlice";
import { restoreAuthFromCookies } from "@/utils/authSession";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function isTokenExpired(token: string): boolean {
    try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        const exp = payload.exp;
        if (!exp) return true;
        const now = Math.floor(Date.now() / 1000);
        return exp < now;
    } catch (error) {
        console.error("Failed to decode token:", error);
        return true;
    }
}

export default function Private({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [isHydrating, setIsHydrating] = useState(true);

    const user = useAppSelector((state) => state.auth.user);
    const token = useAppSelector((state) => state.auth.access_token);

    useEffect(() => {
        const wasRestored = restoreAuthFromCookies();

        if (wasRestored) {
            const userStr = localStorage.getItem('user');
            const accessToken = localStorage.getItem('access_token');

            if (userStr && accessToken) {
                try {
                    const userData = JSON.parse(userStr);
                    dispatch(setTokens({
                        access_token: accessToken,
                        user: userData
                    }));
                    setIsHydrating(false);
                    return;
                } catch (e) {
                    console.error('Failed to parse user data:', e);
                }
            }
        }

        // Normal flow - check existing auth
        const accessToken = token || Cookies.get("access_token") || localStorage.getItem('access_token');

        if (!accessToken || isTokenExpired(accessToken)) {
            dispatch(clearTokens());
            setIsHydrating(false);
            return;
        }

        if (!token && accessToken) {
            const userStr = localStorage.getItem('user');
            let userData = user;

            if (!userData && userStr) {
                try {
                    userData = JSON.parse(userStr);
                } catch (e) {
                    console.error('Failed to parse user:', e);
                }
            }
            dispatch(setTokens({ access_token: accessToken, user: userData || null }));
        }

        setIsHydrating(false);
    }, [token, user, dispatch, router]);

    if (isHydrating) {
        return (
            <div className="flex items-center justify-center min-h-[200px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            </div>
        );
    }

    if (!user) {
        return null;
    }

    return <>{children}</>;
}