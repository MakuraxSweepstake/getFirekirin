"use client";

import DashboardLayout from '@/components/layouts/DashboardLayout';
import AgeVerificationModal from '@/components/organism/dialog';
import { useSearchParams } from 'next/navigation';
import React, { Suspense, useEffect } from 'react';


function LayoutContent({ children }: { children: React.ReactNode }) {
    const searchParams = useSearchParams();
    const visitorId = searchParams.get("visitor_id");

    useEffect(() => {
        if (visitorId) {
            localStorage.setItem("visitor_id", visitorId);
        }
    }, [visitorId]);

    return (
        <DashboardLayout>
            {children}
            <AgeVerificationModal />
        </DashboardLayout>
    )
}
export default function DashboardRootLayout({ children }: { children: React.ReactNode }) {


    return (
        <Suspense fallback={<div>Loading...</div>}>
            <LayoutContent>{children}</LayoutContent>
        </Suspense>
    )
}
