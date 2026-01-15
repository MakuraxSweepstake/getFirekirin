"use client";
import { useAppDispatch, useAppSelector } from "@/hooks/hook";
import { useGetGamesPasswordStatusQuery } from "@/services/userApi";
import { openPasswordDialog } from "@/slice/updatePasswordSlice";
import { useRouter } from "next/navigation";
import React from "react";

interface Props {
    href: string;
    className?: string;
    children: React.ReactNode;
    target?: boolean;
    rel?: string;
    provider?: string;
}

export default function ProtectedLink({ href, className, children, target, rel, provider }: Props) {
    const user = useAppSelector((s) => s ? s.auth.user : "");
    const dispatch = useAppDispatch();
    const router = useRouter();

    const { data } = useGetGamesPasswordStatusQuery({ provider: provider || "" }, { skip: !provider });

    console.log("user data", { data, provider });

    const handleClick = (e: React.MouseEvent) => {
        if (!user) {
            e.preventDefault();
            router.push("/login");
            return;
        }
        if (user && data?.data?.has_changed_password) {
            e.preventDefault();
            dispatch(
                openPasswordDialog({
                    provider: provider || ""
                })
            )
        }

        if (target) {
            return;
        }
    };

    return (
        <a href={href} onClick={handleClick} className={className} target={target ? "_blank" : "_self"} rel={rel}>
            {children}
        </a>
    );
}
