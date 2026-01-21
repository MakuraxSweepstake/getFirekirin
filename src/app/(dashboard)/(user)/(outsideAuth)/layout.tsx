"use client";

import DashboardLayout from '@/components/layouts/DashboardLayout';
import AgeVerificationModal from '@/components/organism/dialog';
import { useSearchParams } from 'next/navigation';
import React from 'react';

export default function DashboardRootLayout({ children }: { children: React.ReactNode }) {
    const searchParams = useSearchParams();
    const visitorId = searchParams.get("visitor_id");

    localStorage.setItem("visitor_id", visitorId || "");

    return (
        <DashboardLayout>
            {children}
            <AgeVerificationModal />
        </DashboardLayout>
    )
}
