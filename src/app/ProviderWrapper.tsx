import Chatbot from '@/components/atom/ChatbotIcon'
import Toast from '@/components/molecules/Toast'
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
                    <div className="fixed bottom-1 right-2 lg:bottom-2 lg:right-4 flex flex-col justify-end  items-end z-[9999] gap-8">
                        <Chatbot />
                        <Toast />
                    </div>
                    <UpdatePassword />
                </ThemeCustomization>
            </ClientProvider>
        </ThemeContextProvider>
    )
}
