"use client"
import { useAppSelector } from '@/hooks/hook';
import React from 'react';
import AdminDashboardRoot from '../../(admin)/AdminDashboard';

export default function DashboardProvider({ children }: { children: React.ReactNode }) {

    const user = useAppSelector(state => state?.auth.user);
    if (user?.role && user.role.toUpperCase() === "ADMIN") {
        return <AdminDashboardRoot />
    }
    return (
        <div>{children}</div>
    )
}
