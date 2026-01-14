"use client";

import BonusIcon from "@/app/customIcons/BonusIcon";
import FireIcon from "@/app/customIcons/FireIcon";
import HomeIcon from "@/app/customIcons/HomeIcon";
import { PATH } from "@/routes/PATH";
import Private from "@/routes/Private";
import {
    Box,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import {
    CardPos,
    Coin
} from "@wandersonalwes/iconsax-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import PrimaryMenu from "./PrimaryMenu";

// ✅ Define menu array for static items
const staticMenus = [
    {
        name: "Lobby",
        icon: <HomeIcon />,
        path: PATH.DASHBOARD.ROOT,
        match: (pathname: string) => pathname === PATH.DASHBOARD.ROOT,
    },
    {
        name: "Exclusive Games",
        icon: <FireIcon />,
        path: PATH.USER.GAMES.ROOT,
        match: (pathname: string) => pathname.startsWith(PATH.USER.GAMES.ROOT),
    },
    {
        name: "Credentials",
        icon: <BonusIcon />,
        path: "/credentials",
        match: (pathname: string) => pathname.startsWith("/credentials"),
        requireAuth: true
    },
];

export default function UserMenu({ open }: { open: boolean }) {
    const pathname = usePathname();
    const [glassStyle, setGlassStyle] = React.useState({ top: 0, height: 0, opacity: 0 });
    const menuListRef = React.useRef<HTMLUListElement>(null);

    // Glass Morph Hover Effect
    const handleMouseEnter = (e: React.MouseEvent<HTMLLIElement>) => {
        const item = e.currentTarget;
        const list = menuListRef.current;

        if (item && list) {
            const itemRect = item.getBoundingClientRect();
            const listRect = list.getBoundingClientRect();
            const topPosition = itemRect.top - listRect.top;

            setGlassStyle({
                top: topPosition,
                height: itemRect.height,
                opacity: 1,
            });
        }
    };

    const handleMouseLeave = () => {
        setGlassStyle((prev) => ({ ...prev, opacity: 0 }));
    };

    return (
        <>
            {/* Buy Coins & Withdraw */}
            {open && (
                <Private>
                    <div className="flex justify-between items-center gap-1 mb-6 px-3">
                        <Link href="/buy-coins" className="ss-btn bg-primary-grad flex items-center gap-2 text-[12px]">
                            <Coin size={24} />
                            Buy Coins
                        </Link>
                        <Link href="/withdrawl" className="ss-btn bg-secondary-grad flex items-center gap-2 text-[12px]">
                            <CardPos size={24} />
                            Withdraw
                        </Link>
                    </div>
                </Private>
            )}
            <Box sx={{
                maxHeight: "calc(100vh - 210px)",
                overflowY: "auto"
            }} >


                <div className="flex flex-col gap-16 lg:gap-28">
                    <List
                        ref={menuListRef}
                        onMouseLeave={handleMouseLeave}
                        style={{ position: "relative" }}
                        className={` ${open ? "!px-3" : ""}`}
                    >
                        {/* ✨ Glass Morphism Layer */}
                        <div
                            style={{
                                position: "absolute",
                                left: "0",
                                right: "0",
                                top: `${glassStyle.top}px`,
                                height: `${glassStyle.height}px`,
                                background: "rgba(255, 255, 255, 0.15)",
                                backdropFilter: "blur(12px)",
                                WebkitBackdropFilter: "blur(12px)",
                                border: "1px solid rgba(255, 255, 255, 0.25)",
                                borderRadius: "38px",
                                boxShadow: `
                                0 8px 32px 0 rgba(0, 0, 0, 0.37),
                                inset 0 1px 0 0 rgba(255, 255, 255, 0.4),
                                0 0 20px rgba(255, 255, 255, 0.1)
                            `,
                                transition: "all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
                                pointerEvents: "none",
                                zIndex: 1,
                                opacity: glassStyle.opacity,
                                transform:
                                    glassStyle.opacity === 1
                                        ? "translateY(0) scale(1)"
                                        : "translateY(0) scale(0.95)",
                            }}
                        />

                        {/* 🧩 Loop Static Menus */}
                        {staticMenus.map((menu) => {
                            const isActive = menu.match(pathname);

                            const menuItem = (
                                <ListItem
                                    key={menu.name}
                                    onMouseEnter={handleMouseEnter}
                                    style={{ position: "relative", zIndex: 2, padding: 0 }}
                                >
                                    <Link
                                        href={menu.path}
                                        className={`flex gap-2 items-start px-4 py-2 transition-all rounded-[38px] ${[open ? "expanded" : "collapsed", isActive ? "active__menu" : ""].join(" ")
                                            }`}
                                    >
                                        <ListItemIcon>{menu.icon}</ListItemIcon>
                                        <ListItemText
                                            primary={menu.name}
                                            className={open ? "expanded" : "collapsed"}
                                        />
                                    </Link>
                                </ListItem>
                            );

                            // Wrap with <Private> only if requireAuth is true
                            return menu.requireAuth ? <Private key={menu.name}>{menuItem}</Private> : menuItem;
                        })}
                    </List>

                    {/* 🌐 Dynamic Menus */}
                    <PrimaryMenu open={open} />
                </div>

            </Box>

        </>
    );
}
