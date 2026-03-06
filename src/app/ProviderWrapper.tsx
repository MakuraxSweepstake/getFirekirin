import UpdatePassword from '@/components/organism/UpdatePassword'
import { ThemeContextProvider } from '@/context/ThemeContext'
import { ClientProvider } from '@/hooks/ReduxProvider'
import ThemeCustomization from '@/theme'
import React from 'react'

export default function ProviderWrapper({ children }: { children: React.ReactNode }) {
    return (
        <ThemeContextProvider>
            <ClientProvider>
                <ThemeCustomization>
                    {children}

                    <UpdatePassword />
                    {/* <AgeChecker
                        apiKey="lwU8lOYysWXrIZaijSG3Hfcxmzc4DlS9"
                        onVerified={() => { }}
                        onSkipped={() => { }}
                    /> */}
                </ThemeCustomization>
            </ClientProvider>
        </ThemeContextProvider>
    )
}
