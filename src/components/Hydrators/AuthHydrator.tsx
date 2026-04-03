'use client';

import { useAppDispatch } from '@/hooks/hook';
import { setTokens } from '@/slice/authSlice';
import { restoreAuthFromCookies } from '@/utils/authSession';
import { useEffect } from 'react';

/**
 * AuthHydrator Component
 * 
 * Runs on app load to restore authentication from cookies/sessionStorage
 * This ensures user remains logged in after payment redirects
 * 
 * Place this component at the root layout level, before main content
 */
export default function AuthHydrator() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const hydrateAuth = async () => {
            try {
                // Attempt to restore auth from backup sources
                const result = restoreAuthFromCookies();

                if (result.success && result.data) {

                    // Dispatch to Redux to update app state
                    dispatch(setTokens({
                        access_token: result.data.access_token,
                        user: result.data.user,
                        refreshToken: result.data.refresh_token
                    }));

                    // Trigger any auth-dependent logic
                    window.dispatchEvent(new CustomEvent('auth:hydrated', {
                        detail: { source: result.source, user: result.data.user }
                    }));
                } else {
                    console.log('[AuthHydrator] No auth restoration needed');
                }
            } catch (error) {
                console.error('[AuthHydrator] Failed to hydrate auth:', error);
            }
        };

        hydrateAuth();
    }, [dispatch]);

    // This component doesn't render anything
    return null;
}
