"use client"

import GlassWrapper from '@/components/molecules/GlassWrapper'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useEffect } from 'react'

export default function PaymentSuccess() {
    const params = useParams();
    const slug = params?.slug as string;

    useEffect(() => {
        const storageKey = `payment-success-${slug}`;
        const hasLoaded = sessionStorage.getItem(storageKey);

        if (!hasLoaded) {
            console.log("First visit - reloading page");
            sessionStorage.setItem(storageKey, 'true');
            window.location.reload();
            return;
        }

        console.log("Page already loaded once - rendering content");

        // Clean up after 5 seconds (user has seen the page)
        const timeout = setTimeout(() => {
            sessionStorage.removeItem(storageKey);
        }, 5000);

        return () => clearTimeout(timeout);
    }, [slug]);

    return (
        <GlassWrapper className="max-w-[520px] mx-auto flex flex-col gap-3 items-center text-center p-6">
            <Image
                src="/assets/images/verify-email.png"
                alt="Payment Success"
                width={180}
                height={140}
            />
            <h1 className="text-[24px] lg:text-[32px] leading-[120%] font-bold mb-4 text-green-500">
                Payment Successful
            </h1>
            <p className="text-[14px] leading-[150%] font-normal lg:text-[16px] mb-4">
                Your payment was processed successfully.
            </p>
            <Link
                href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/exclusive-games/${slug}`}
                className="ss-btn bg-primary-grad"
            >
                View Game Detail
            </Link>
        </GlassWrapper>
    )
}