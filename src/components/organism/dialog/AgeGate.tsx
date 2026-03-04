"use client";

import { useGetAgeGateUuidQuery, useVerifyAgeGateMutation } from "@/services/authApi";
import { useCallback, useEffect } from "react";

export default function AgeGate() {
    const { data, isSuccess } = useGetAgeGateUuidQuery();
    const [verifyAgeGate] = useVerifyAgeGateMutation();

    const handleSuccess = useCallback(async (uuid: string) => {
        try {
            await verifyAgeGate({ age_verify_uuid: uuid }).unwrap();
            window.location.reload();
        } catch (err) {
            console.error("[AgeGate] Backend verification failed:", err);
        }
    }, [verifyAgeGate]);

    console.log("AgeGate data:", data?.data?.age_verify_uuid, "isSuccess:", isSuccess);

    useEffect(() => {
        if (!isSuccess || !data?.data?.age_verify_uuid) return;
        if (data.data.is_age_verified) return;
        const uuid = data.data.age_verify_uuid;

        (window as any).AgeCheckerConfig = {
            key: process.env.NEXT_PUBLIC_AGE_CHECKER_KEY,
            mode: "manual",
            autoload: true,
            show_close: true,
            onready: () => {
                (window as any).AgeCheckerAPI.show(uuid);
            },
            onstatuschanged: (verification: { uuid: string; status: string }) => {
                if (verification.status === "accepted") {
                    handleSuccess(verification.uuid);
                }
            },
            onpagehide: () => {
                (window as any).AgeCheckerAPI.close();
                // Optional: Handle page hide if needed
            }
        };

        // 3. Now load the script
        const existing = document.querySelector('script[src*="agechecker.net"]');
        if (existing) {
            // Script already loaded, just show
            (window as any).AgeCheckerAPI?.show(uuid);
            return;
        }

        const script = document.createElement("script");
        script.src = "https://cdn.agechecker.net/static/popup/v1/popup.js";
        script.crossOrigin = "anonymous";
        script.onerror = () => {
            window.location.href = "https://agechecker.net/loaderror";
        };
        document.head.insertBefore(script, document.head.firstChild);

    }, [isSuccess, data, handleSuccess]);

    return null;
}