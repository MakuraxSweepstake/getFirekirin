// app/buy-coins/[slug]/success/page.tsx

"use client"

import GlassWrapper from '@/components/molecules/GlassWrapper'
import { useAppDispatch, useAppSelector } from '@/hooks/hook'
import { setTokens } from '@/slice/authSlice'
import { clearAuthBackup, restoreAuthFromCookies } from '@/utils/authSession'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function PaymentSuccess() {
    const params = useParams();
    const slug = params?.slug as string;
    const [isReady, setIsReady] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.auth.user);

    useEffect(() => {
        const hydrateAuthOnSuccess = async () => {
            try {

                // Try to restore auth from backup
                const result = restoreAuthFromCookies();

                if (result.success && result.data) {

                    // Update Redux store
                    dispatch(setTokens({
                        access_token: result.data.access_token,
                        user: result.data.user,
                        refreshToken: result.data.refresh_token
                    }));

                    // Dispatch custom event for other components
                    window.dispatchEvent(new CustomEvent('auth:hydrated', {
                        detail: {
                            source: result.source,
                            user: result.data.user
                        }
                    }));

                    console.log('[PaymentSuccess] Auth hydrated successfully');
                    setIsReady(true);
                } else {
                    // Check if user is still available in Redux store
                    if (user) {
                        console.log('[PaymentSuccess] User still available in Redux');
                        setIsReady(true);
                    } else {
                        // Auth not found in any source - this is a problem
                        console.warn('[PaymentSuccess] Auth not found in any source');
                        setError('Unable to restore user session. Please try logging in again.');
                        setIsReady(true);
                    }
                }
            } catch (error) {
                console.error('[PaymentSuccess] Hydration error:', error);
                setError('An unexpected error occurred. Please try again shortly.');
                setIsReady(true);
            }
        };

        hydrateAuthOnSuccess();

        // Cleanup - clear backups after 10 seconds to ensure restoration is complete
        const cleanupTimer = setTimeout(() => {
            clearAuthBackup();
        }, 10000);

        return () => {
            clearTimeout(cleanupTimer);
        };
    }, [dispatch, user]);

    if (!isReady) {
        return (
            <div className="flex items-center justify-center min-h-[200px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            </div>
        );
    }

    // Show error state if no user
    if (error || !user) {
        return (
            <GlassWrapper className="max-w-[520px] mx-auto flex flex-col gap-3 items-center text-center p-6">
                <Image
                    src="/assets/images/verify-email.png"
                    alt="Error"
                    width={180}
                    height={140}
                />
                <h1 className="text-[24px] lg:text-[32px] leading-[120%] font-bold mb-4 text-red-500">
                    Session Expired
                </h1>
                <p className="text-[14px] leading-[150%] font-normal lg:text-[16px] mb-4">
                    {error || 'Your session has expired. Please log in again to continue.'}
                </p>
                <Link
                    href="/login"
                    className="ss-btn bg-primary-grad"
                >
                    Log In Again
                </Link>
            </GlassWrapper>
        );
    }

    // Success state
    return (
        <GlassWrapper className="max-w-[520px] mx-auto flex flex-col gap-3 items-center text-center p-6">
            <Image
                src="/assets/images/verify-email.png"
                alt="Payment Success"
                width={180}
                height={140}
            />
            <h1 className="text-[24px] lg:text-[32px] leading-[120%] font-bold mb-4 text-green-500">
                Payment Successful!
            </h1>
            <p className="text-[14px] leading-[150%] font-normal lg:text-[16px] mb-4">
                Your payment has been processed successfully. Your coins are now available in your account.
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