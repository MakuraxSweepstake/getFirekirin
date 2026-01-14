"use client";
import { ThemeMode } from '@/config';
import { useAppSelector } from '@/hooks/hook';
import { CssBaseline, GlobalStyles } from '@mui/material';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import React from 'react';
import AdminPalette from './adminPalette';
import { NextAppDirEmotionCacheProvider } from './emotionCache';
import Palette from './palette';


export default function ThemeCustomization({ children }: { children: React.ReactNode }) {

    const [theme, setTheme] = React.useState(ThemeMode.DARK);
    const user = useAppSelector((state) => state.auth.user);
    const globalStyles = {

    };

    const [palette, setPalette] = React.useState(() => Palette(ThemeMode.DARK));

    React.useEffect(() => {
        if (!user || !user.role) {
            setTheme(ThemeMode.DARK);
            setPalette(Palette(ThemeMode.DARK));
        } else if (user.role.toUpperCase() === "USER") {
            setTheme(ThemeMode.DARK);
            setPalette(Palette(ThemeMode.DARK));
        } else {
            setTheme(ThemeMode.LIGHT);
            setPalette(AdminPalette(ThemeMode.LIGHT));
        }
    }, [user]);


    console.log(theme)
    return (
        <StyledEngineProvider injectFirst>
            <NextAppDirEmotionCacheProvider options={{ key: 'mui' }}>
                <ThemeProvider theme={palette}>
                    <CssBaseline enableColorScheme />
                    <GlobalStyles styles={globalStyles}
                    />
                    {children}
                </ThemeProvider>
            </NextAppDirEmotionCacheProvider>
        </StyledEngineProvider>
    )
}
