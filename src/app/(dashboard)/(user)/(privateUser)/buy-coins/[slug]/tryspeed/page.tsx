"use client"

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function TryspeedRoot() {
    const { slug } = useParams();
    const router = useRouter();

    useEffect(() => {
        if (slug) {
            console.log(slug);
            router.replace(`/buy-coins/${slug}/success`);
        }
    }, [slug, router]);

    return null;
}