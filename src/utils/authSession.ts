// utils/authSession.ts

import Cookies from 'js-cookie';

const AUTH_KEYS = ['token', 'access_token', 'authToken', 'user', 'refresh_token'];
const BACKUP_PREFIX = '__payment_backup__';
const COOKIE_EXPIRY = 1 / 24; // 1 hour (in days)

export function backupAuthToCookies() {
    if (typeof window === 'undefined') return;

    AUTH_KEYS.forEach((key) => {
        const value = localStorage.getItem(key);
        if (value !== null) {
            // Store in cookie with 1 hour expiry
            Cookies.set(`${BACKUP_PREFIX}${key}`, value, {
                expires: COOKIE_EXPIRY,
                secure: true,
                sameSite: 'lax'
            });
        }
    });
    Cookies.set(`${BACKUP_PREFIX}redirected`, 'true', {
        expires: COOKIE_EXPIRY,
        secure: true,
        sameSite: 'lax'
    });
}

export function restoreAuthFromCookies(): boolean {
    if (typeof window === 'undefined') return false;

    const wasRedirected = Cookies.get(`${BACKUP_PREFIX}redirected`);
    if (!wasRedirected) return false;

    let restored = false;

    AUTH_KEYS.forEach((key) => {
        const backup = Cookies.get(`${BACKUP_PREFIX}${key}`);
        if (backup !== undefined && backup !== null) {
            if (localStorage.getItem(key) === null) {
                localStorage.setItem(key, backup);
                restored = true;
            }
        }
    });

    // Clean up cookies
    AUTH_KEYS.forEach((key) => {
        Cookies.remove(`${BACKUP_PREFIX}${key}`);
    });
    Cookies.remove(`${BACKUP_PREFIX}redirected`);

    return restored;
}

export function clearAuthBackup() {
    if (typeof window === 'undefined') return;

    AUTH_KEYS.forEach((key) => {
        Cookies.remove(`${BACKUP_PREFIX}${key}`);
    });
    Cookies.remove(`${BACKUP_PREFIX}redirected`);
}