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
        // Check if this is a fresh redirect (not a refresh)
        const hasLoaded = sessionStorage.getItem(`payment-success-${slug}`);

        if (!hasLoaded) {
            sessionStorage.setItem(`payment-success-${slug}`, 'true');
            window.location.reload();
        }

        // Cleanup on unmount (so it works again if they revisit)
        return () => {
            sessionStorage.removeItem(`payment-success-${slug}`);
        }
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