'use client';

import { Box, CircularProgress, Dialog, DialogContent, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';

export interface PaymentModalProps {
    /**
     * The payment URL to load in the iframe
     */
    url: string;

    /**
     * Whether the modal is open
     */
    isOpen: boolean;

    /**
     * Callback when modal is closed (user clicked X or payment cancelled)
     */
    onClose: () => void;

    /**
     * Callback when payment is successful
     * Called when the payment provider sends success message
     */
    onSuccess?: () => void;

    /**
     * Callback when payment fails
     */
    onError?: (error: PaymentError) => void;

    /**
     * Custom payment status message to listen for
     * Examples: 'verified', 'success', 'completed'
     */
    successMessage?: string;

    /**
     * Title shown while loading
     */
    title?: string;

    /**
     * Max width of the dialog
     */
    maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';

    /**
     * Height of the iframe in pixels
     */
    height?: number;
}

export interface PaymentError {
    code: string;
    message: string;
    details?: unknown;
}

/**
 * PaymentModal Component
 * 
 * Handles payment processing in an iframe with message-based communication
 * Supports:
 * - Payment providers that send postMessage on completion
 * - TrySpeed, Acuity Tech, Stripe, and other iframe-based payment systems
 * - Secure origin verification
 * - Automatic modal closing on success
 * 
 * @example
 * ```tsx
 * const [showPayment, setShowPayment] = useState(false);
 * const [paymentUrl, setPaymentUrl] = useState('');
 * 
 * const handlePaymentSuccess = () => {
 *   showToast("Payment successful!");
 *   // Update user balance, close modal, redirect, etc.
 * };
 * 
 * return (
 *   <PaymentModal
 *     url={paymentUrl}
 *     isOpen={showPayment}
 *     onClose={() => setShowPayment(false)}
 *     onSuccess={handlePaymentSuccess}
 *     successMessage="success"
 *     title="Processing Payment..."
 *   />
 * );
 * ```
 */
export default function PaymentModal({
    url,
    isOpen,
    onClose,
    onSuccess,
    onError,
    successMessage = 'success',
    title = 'Processing Payment',
    maxWidth = 'sm',
    height = 600
}: PaymentModalProps) {
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<PaymentError | null>(null);

    useEffect(() => {
        if (!isOpen) {
            setIsLoading(true);
            setError(null);
            return;
        }

        const handleMessage = (event: MessageEvent): void => {
            try {
                // Security: Verify message origin
                const paymentOrigin = new URL(url).origin;
                if (event.origin !== paymentOrigin) {
                    console.warn(
                        `[PaymentModal] Ignoring message from untrusted origin: ${event.origin}`
                    );
                    return;
                }

                console.log('[PaymentModal] Received message:', event.data);

                // Check for success status
                const data = event.data;
                if (!data) return;

                // Support multiple success indicators
                const isSuccess =
                    data.status === successMessage ||
                    data.status === 'success' ||
                    data.type === 'payment:success' ||
                    data.type === `payment:${successMessage}` ||
                    data.result === 'success' ||
                    data.result === successMessage ||
                    (typeof data === 'string' && (
                        data === successMessage ||
                        data === 'success'
                    ));

                if (isSuccess) {
                    console.log('[PaymentModal] Payment successful! Closing modal...');
                    onSuccess?.();
                    setTimeout(() => onClose(), 500); // Small delay for animation
                    return;
                }

                // Check for error status
                const isError =
                    data.status === 'error' ||
                    data.type === 'payment:error' ||
                    data.error !== undefined;

                if (isError) {
                    const paymentError: PaymentError = {
                        code: data.error_code || 'PAYMENT_ERROR',
                        message: data.message || data.error || 'Payment failed',
                        details: data
                    };
                    console.error('[PaymentModal] Payment error:', paymentError);
                    setError(paymentError);
                    onError?.(paymentError);
                }
            } catch (error) {
                console.error('[PaymentModal] Error handling message:', error);
            }
        };

        // Add message listener
        window.addEventListener('message', handleMessage);

        // Notify iframe that parent is ready (for some providers)
        setTimeout(() => {
            if (iframeRef.current?.contentWindow) {
                iframeRef.current.contentWindow.postMessage(
                    { type: 'parent:ready' },
                    new URL(url).origin
                );
            }
        }, 1000);

        return () => {
            window.removeEventListener('message', handleMessage);
        };
    }, [isOpen, url, onClose, onSuccess, onError, successMessage]);

    const handleIframeLoad = (): void => {
        console.log('[PaymentModal] iframe loaded');
        setIsLoading(false);
    };

    const handleIframeError = (): void => {
        const error: PaymentError = {
            code: 'IFRAME_LOAD_ERROR',
            message: 'Failed to load payment page'
        };
        console.error('[PaymentModal] iframe load error');
        setError(error);
        onError?.(error);
    };

    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            maxWidth={maxWidth}
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, rgba(0,0,0,0.8), rgba(184,1,192,0.1))',
                    backdropFilter: 'blur(10px)'
                }
            }}
        >
            <DialogContent
                sx={{
                    p: 0,
                    position: 'relative',
                    background: 'rgba(20, 20, 20, 0.95)'
                }}
            >
                {error ? (
                    // Error State
                    <Box
                        sx={{
                            height: `${height}px`,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: 3,
                            textAlign: 'center'
                        }}
                    >
                        <Typography color="error" variant="h6" sx={{ mb: 1 }}>
                            Payment Failed
                        </Typography>
                        <Typography color="textSecondary" variant="body2">
                            {error.message}
                        </Typography>
                        <Typography
                            color="textSecondary"
                            variant="caption"
                            sx={{ mt: 1, opacity: 0.7 }}
                        >
                            Error Code: {error.code}
                        </Typography>
                    </Box>
                ) : (
                    // Loading or iframe state
                    <>
                        {isLoading && (
                            <Box
                                sx={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    zIndex: 1000,
                                    background: 'rgba(20, 20, 20, 0.95)'
                                }}
                            >
                                <CircularProgress sx={{ mb: 2, color: '#B801C0' }} />
                                <Typography sx={{ color: '#fff' }}>
                                    {title}...
                                </Typography>
                            </Box>
                        )}

                        <Box sx={{ height: `${height}px`, width: '100%' }}>
                            <iframe
                                ref={iframeRef}
                                src={url}
                                title="Payment Processing"
                                onLoad={handleIframeLoad}
                                onError={handleIframeError}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    border: 'none',
                                    borderRadius: '12px'
                                }}
                                allow="camera; microphone; geolocation; payment"
                                sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox"
                            />
                        </Box>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
}
