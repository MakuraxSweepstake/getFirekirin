"use client";

import ComingSoon from "@/components/pages/ComingSoon";
import { useGetSiteAvailabilityQuery } from "@/services/settingApi";

import React from "react";

export default function ComingSoonGate({ children }: { children: React.ReactNode }) {
    const { data, isLoading } = useGetSiteAvailabilityQuery();

    if (isLoading) return null;

    if (data?.data?.coming_soon === false) {
        return <ComingSoon />;
    }

    return <>{children}</>;
}
