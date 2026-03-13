// app/buy-coins/[slug]/success/page.tsx

"use client"

import GlassWrapper from '@/components/molecules/GlassWrapper'
import { useAppDispatch } from '@/hooks/hook'
import Private from '@/routes/Private'
import { setTokens } from '@/slice/authSlice'
import { restoreAuthFromCookies } from '@/utils/authSession'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function PaymentSuccess() {
    const params = useParams();
    const slug = params?.slug as string;
    const [isReady, setIsReady] = useState(false);
    const dispatch = useAppDispatch();

    useEffect(() => {
        // Restore auth from cookies to localStorage
        const wasRestored = restoreAuthFromCookies();

        if (wasRestored) {
            // Manually hydrate Redux from localStorage (no reload needed)
            const userStr = localStorage.getItem('user');
            const token = localStorage.getItem('access_token');

            if (userStr && token) {
                try {
                    const user = JSON.parse(userStr);
                    dispatch(setTokens({
                        access_token: token,
                        user: user
                    }));
                } catch (e) {
                    console.error('Failed to parse user data:', e);
                }
            }
        }

        setIsReady(true);
    }, [dispatch]);

    if (!isReady) {
        return (
            <div className="flex items-center justify-center min-h-[200px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            </div>
        );
    }

    return (
       <Private>
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
       </Private>
    )
}