"use client";

import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { usePathname } from 'next/navigation';
import React from 'react';
import Header from '../organism/Header';
import Sidebar from '../organism/Sidebar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const [open, setOpen] = React.useState(true);
    const [openMobile, setOpenMobile] = React.useState(false);
    const pathname = usePathname();
    const handleDrawerOpen = () => {
        setOpen((prev) => !prev);
    };

    React.useEffect(() => {
        // Close menu when route changes
        if (openMobile) {
            setOpenMobile(false);
        }
    }, [pathname]);

    const handleMobileMenuToggle = () => {
        setOpenMobile((prev) => !prev);
    }
    // const handleDrawerClose = () => {
    //     setOpen(false);
    // };
    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),

        ...theme.mixins.toolbar,
    }));


    return (
        <Box sx={{ display: 'flex' }}>
            <Header open={open} handleDrawerOpen={handleDrawerOpen} handleMobileMenuToggle={handleMobileMenuToggle} />
            <Sidebar open={open} handleDrawerOpen={handleDrawerOpen} handleMobileMenuToggle={handleMobileMenuToggle} mobileMenuOpen={openMobile

            } />
            <div className="root_container w-full overflow-hidden">
                <DrawerHeader sx={{
                    mb: { xs: '16px', lg: 0 }
                }} />
                <div className="content_box p-4 lg:pl-11 lg:pr-12 lg:py-8">
                    {/* {pathname !== '/' && <Breadcrumb />} */}
                    {children}</div>
            </div>
        </Box>
    )
}
