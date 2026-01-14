import DashboardLayout from '@/components/layouts/DashboardLayout'
import ServerPrivate from '@/routes/ServerPrivate'
import React from 'react'

export default function PrivateUserLayout({ children }: { children: React.ReactNode }) {
    return (
        <ServerPrivate>
            <DashboardLayout>
                {children}
            </DashboardLayout>
        </ServerPrivate>
    )
}
