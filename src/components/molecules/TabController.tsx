"use client";

import {
    Box,
    Button,
    ClickAwayListener,
    Fade,
    List,
    ListItem,
    ListItemButton,
    Paper,
    Popper,
    Typography,
} from "@mui/material";
import { ArrowDown2 } from "@wandersonalwes/iconsax-react";
import React, { useRef, useState } from "react";

type TabLink = { label: string; value: string, icon?: React.ReactNode };

export default function TabController({
    links,
    currentTab,
    onTabChange,
    linkClassName,
    controllerClassName
}: {
    links: TabLink[];
    currentTab: string;
    linkClassName?: string;
    controllerClassName?: string;
    onTabChange: (tab: string) => void;
}) {
    const anchorRef = useRef<HTMLButtonElement | null>(null);
    const [open, setOpen] = useState(false);

    const handleToggle = () => setOpen((prev) => !prev);

    const handleClose = (event: MouseEvent | TouchEvent) => {
        if (anchorRef.current?.contains(event.target as Node)) return;
        setOpen(false);
    };

    const handleTabClick = (tab: string) => {
        onTabChange(tab);
        setOpen(false);
    };

    const currentTabLabel = links.find((link) => link.value === currentTab)?.label || "";
    const currentTabIcon = links.find((link) => link.value === currentTab)?.icon || "";
    return (
        <Box >
            {/* Desktop Tabs */}
            <Box className={`hidden md:flex gap-4 border-b-[2px] border-[rgba(255,255,255,0.12)] mb-4 ${controllerClassName}`}>
                {links.map((link) => (
                    <a
                        href="#"
                        key={link.value}
                        color="secondary"
                        onClick={(e) => { e.preventDefault(); handleTabClick(link.value) }}
                        className={`${linkClassName} tab__link p-4 text-[14px] !text-center  ${currentTab === link.value ? "active" : ""}`}
                    >
                        {link.icon}
                        {link.label}
                    </a>
                ))}
            </Box>

            {/* Mobile Tabs as Popper */}
            <Box className="flex md:hidden mb-4">
                <Button ref={anchorRef} onClick={handleToggle} className="!justify-between !p-2 !border !border-solid !border-gray-600 !rounded-lg !text-white !bg-primary" endIcon={<ArrowDown2 size={20} />} >
                    <Typography className="flex gap-4">
                        {currentTabIcon}
                        {currentTabLabel}</Typography>
                </Button>
                <Popper
                    open={open}
                    anchorEl={anchorRef.current}
                    placement="bottom-start"
                    transition
                    style={{
                        zIndex: 1300,
                        width: anchorRef.current ? anchorRef.current.offsetWidth : 'auto'
                    }}
                >
                    {({ TransitionProps }) => (
                        <Fade {...TransitionProps} timeout={300}>
                            <Paper elevation={3}>
                                <ClickAwayListener onClickAway={handleClose}>
                                    <List>
                                        {links.map((link) => (
                                            <ListItem
                                                key={link.value}

                                            >
                                                <ListItemButton
                                                    selected={currentTab === link.value}
                                                    onClick={() => handleTabClick(link.value)}>
                                                    <Typography>{link.label}</Typography>
                                                </ListItemButton>
                                            </ListItem>
                                        ))}
                                    </List>
                                </ClickAwayListener>
                            </Paper>
                        </Fade>
                    )}
                </Popper>
            </Box>
        </Box >
    );
}
