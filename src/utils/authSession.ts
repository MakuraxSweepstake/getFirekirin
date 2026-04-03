// utils/authSession.ts

import { PlayerProps } from '@/types/player';
import Cookies from 'js-cookie';

interface AuthData {
    access_token: string;
    token?: string;
    user: PlayerProps | null;
    refresh_token?: string;
}

interface AuthRestorationResult {
    success: boolean;
    source: 'localStorage' | 'cookies' | 'sessionStorage' | 'none';
    data: AuthData | null;
}

const AUTH_KEYS = ['token', 'access_token', 'authToken', 'user', 'refresh_token'];
const BACKUP_PREFIX = '__payment_backup__';
const SESSION_BACKUP_PREFIX = '__payment_session_backup__';
const COOKIE_EXPIRY = 1 / 24; // 1 hour (in days)
const TIMESTAMP_KEY = `${BACKUP_PREFIX}timestamp`;

/**
 * Backup authentication data to cookies and sessionStorage
 * Called before payment redirects to prevent auth loss
 */
export function backupAuthToCookies(): void {
    if (typeof window === 'undefined') return;

    try {
        const timestamp = Date.now();

        // Backup to cookies (primary)
        AUTH_KEYS.forEach((key) => {
            const value = localStorage.getItem(key);
            if (value !== null) {
                Cookies.set(`${BACKUP_PREFIX}${key}`, value, {
                    expires: COOKIE_EXPIRY,
                    secure: true,
                    sameSite: 'lax'
                });
            }
        });

        // Backup to sessionStorage (fallback for same-tab scenarios)
        AUTH_KEYS.forEach((key) => {
            const value = localStorage.getItem(key);
            if (value !== null) {
                try {
                    sessionStorage.setItem(`${SESSION_BACKUP_PREFIX}${key}`, value);
                } catch (e) {
                    console.warn(`Failed to backup ${key} to sessionStorage:`, e);
                }
            }
        });

        // Set redirect marker with timestamp
        Cookies.set(`${BACKUP_PREFIX}redirected`, 'true', {
            expires: COOKIE_EXPIRY,
            secure: true,
            sameSite: 'lax'
        });

        sessionStorage.setItem(TIMESTAMP_KEY, timestamp.toString());
    } catch (error) {
        console.error('[Auth] Failed to backup auth data:', error);
    }
}

/**
 * Restore authentication from multiple sources with priority:
 * 1. sessionStorage (fastest, same-tab redirect)
 * 2. Cookies (cross-tab, payment provider redirect)
 * 3. localStorage (existing data)
 */
export function restoreAuthFromCookies(): AuthRestorationResult {
    if (typeof window === 'undefined') {
        return { success: false, source: 'none', data: null };
    }

    try {
        // Try sessionStorage first (same-tab scenario)
        const sessionToken = sessionStorage.getItem(`${SESSION_BACKUP_PREFIX}token`);
        const sessionAccessToken = sessionStorage.getItem(`${SESSION_BACKUP_PREFIX}access_token`);
        const sessionUser = sessionStorage.getItem(`${SESSION_BACKUP_PREFIX}user`);

        if (sessionAccessToken && sessionUser) {
            const userData = JSON.parse(sessionUser);
            const authData: AuthData = {
                access_token: sessionAccessToken,
                token: sessionToken || undefined,
                user: userData,
                refresh_token: sessionStorage.getItem(`${SESSION_BACKUP_PREFIX}refresh_token`) || undefined
            };

            // Restore to localStorage
            if (sessionToken) localStorage.setItem('token', sessionToken);
            localStorage.setItem('access_token', sessionAccessToken);
            localStorage.setItem('user', sessionUser);

            return { success: true, source: 'sessionStorage', data: authData };
        }

        // Try cookies (cross-tab scenario from payment provider)
        const wasRedirected = Cookies.get(`${BACKUP_PREFIX}redirected`);
        if (!wasRedirected) {
            return { success: false, source: 'none', data: null };
        }

        const cookieToken = Cookies.get(`${BACKUP_PREFIX}token`);
        const cookieAccessToken = Cookies.get(`${BACKUP_PREFIX}access_token`);
        const cookieUser = Cookies.get(`${BACKUP_PREFIX}user`);

        if (cookieAccessToken && cookieUser) {
            const userData = JSON.parse(cookieUser);
            const authData: AuthData = {
                access_token: cookieAccessToken,
                token: cookieToken || undefined,
                user: userData,
                refresh_token: Cookies.get(`${BACKUP_PREFIX}refresh_token`) || undefined
            };

            // Restore to localStorage
            if (cookieToken) localStorage.setItem('token', cookieToken);
            localStorage.setItem('access_token', cookieAccessToken);
            localStorage.setItem('user', cookieUser);

            // Clean up cookies after restoration for security
            cleanupAuthCookies();
            cleanupAuthSessionStorage();

            return { success: true, source: 'cookies', data: authData };
        }

        return { success: false, source: 'none', data: null };
    } catch (error) {
        console.error('[Auth] Failed to restore auth data:', error);
        return { success: false, source: 'none', data: null };
    }
}

/**
 * Clean up authentication cookies after successful restoration
 */
function cleanupAuthCookies(): void {
    if (typeof window === 'undefined') return;

    AUTH_KEYS.forEach((key) => {
        Cookies.remove(`${BACKUP_PREFIX}${key}`);
    });
    Cookies.remove(`${BACKUP_PREFIX}redirected`);
}

/**
 * Clean up sessionStorage backup
 */
function cleanupAuthSessionStorage(): void {
    if (typeof window === 'undefined') return;

    AUTH_KEYS.forEach((key) => {
        sessionStorage.removeItem(`${SESSION_BACKUP_PREFIX}${key}`);
    });
    sessionStorage.removeItem(TIMESTAMP_KEY);
}

/**
 * Force cleanup of all auth backups
 */
export function clearAuthBackup(): void {
    if (typeof window === 'undefined') return;

    cleanupAuthCookies();
    cleanupAuthSessionStorage();
}

/**
 * Get current auth data from localStorage
 */
export function getCurrentAuthData(): AuthData | null {
    if (typeof window === 'undefined') return null;

    try {
        const token = localStorage.getItem('token');
        const accessToken = localStorage.getItem('access_token');
        const userStr = localStorage.getItem('user');

        if (!accessToken || !userStr) return null;

        const user = JSON.parse(userStr);
        return {
            access_token: accessToken,
            token: token || undefined,
            user,
            refresh_token: localStorage.getItem('refresh_token') || undefined
        };
    } catch (error) {
        console.error('[Auth] Failed to get current auth data:', error);
        return null;
    }
}