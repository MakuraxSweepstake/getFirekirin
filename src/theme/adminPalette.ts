// src/theme/Palette.ts
import { ThemeMode } from "@/config";
import { PaletteThemeProps } from "@/types/theme";
import { createTheme, PaletteMode } from "@mui/material/styles";

export default function Palette(mode: ThemeMode) {
    const contrastText = "#fff";


    let primaryColors = ['#71717A', '#B801C0', '#3A013F'];
    let secondaryColors = ["#93E0D8", "#69A29D", "#4A7D78"];
    let grayColors = ["#E0E0E3", '#F3F4F6'];
    let titleColors = ["#0E0E11", "rgba(0, 0, 0, 0.80)", "rgba(0, 0, 0, 0.90)"];
    const primaryGradColors = ['linear-gradient(90deg, #B100B8 0%, #F335ED 100%)'];
    const secondaryGradColors = ['linear-gradient(90deg, #69A29D 0%, #93E0D9 100%)'];


    if (mode === ThemeMode.DARK) {
        primaryColors = ['#A0A0A7', '#D958DF', '#7D0182'];
        secondaryColors = ["#93E0D8", "#69A29D", "#4A7D78"];
        grayColors = ["#2D2D30", '#1F1F23'];
        titleColors = ["#F0F0F0", "rgba(0, 0, 0, 0.80)", "rgba(0, 0, 0, 0.90)"];
    }


    const paletteColor: PaletteThemeProps = {
        primary: {
            light: primaryColors[0],
            main: primaryColors[1],
            dark: primaryColors[2],
            contrastText
        },
        secondary: {
            light: secondaryColors[0],
            main: secondaryColors[0],
            dark: secondaryColors[0],
            contrastText
        },
        title: {
            main: titleColors[0],
            contrastText
        },
        lightGray: {
            light: grayColors[1],
            main: grayColors[0],
            contrastText
        },
    };

    // Final MUI Theme
    return createTheme({
        typography: {
            fontFamily: "Inter, sans-serif",
            h1: {
                fontSize: "24px",
                fontWeight: 700,
                lineHeight: "133%"
            },
            h2: {
                fontSize: "20px",
                fontWeight: 600,
                lineHeight: "140%"
            },
            h3: {
                fontSize: "18px",
                fontWeight: 600,
            },
            h4: {
                fontSize: "16px",
                lineHeight: "140%"
            }
        },
        palette: {
            mode: mode as PaletteMode,
            common: {
                black: "#000",
                white: "#fff",
            },
            ...paletteColor,
            background: {
                default: mode === ThemeMode.DARK ? grayColors[1] : "#fff",
                paper: mode === ThemeMode.DARK ? grayColors[0] : "#fff"
            },
            text: {
                primary: mode === ThemeMode.DARK ? titleColors[0] : titleColors[0],
                secondary: mode === ThemeMode.DARK ? grayColors[0] : grayColors[1]
            }
        },
        components: {
            MuiInputLabel: {
                styleOverrides: {
                    root: {
                        color: titleColors[0],
                        fontSize: '16px',
                        fontWeight: 400,
                        lineHeight: 'normal',
                        display: 'block',
                        marginBottom: '4px',
                    },
                },
            },
            MuiOutlinedInput: {
                styleOverrides: {
                    root: {
                        fontSize: "14px",
                        width: "100%",
                        borderRadius: "10px",
                        // border: "1px solid var(--Gray, #E0E0E3)",
                        background: "transparent",
                        color: "inherit",
                        padding: "8px 12px",

                        "&:hover": {
                            borderColor: "#B801C0",
                        },

                        "&.Mui-focused": {
                            borderColor: "#B801C0",
                        },
                    },
                    input: {
                        padding: 0,
                        "&::placeholder": {
                            color: "var(--Gray, #999)",
                            fontWeight: 400,
                            fontSize: "14px",
                        },
                    },
                },
            },
            MuiCheckbox: {
                styleOverrides: {
                    root: {
                        padding: 0,
                        width: 20,
                        height: 20,
                        "& .MuiSvgIcon-root": {
                            fontSize: 20,
                            borderRadius: 4,
                            border: "1px solid #71717A",
                        },
                        "&.Mui-checked .MuiSvgIcon-root": {
                            backgroundColor: "#7C3AED",
                            color: "#fff",
                            border: "1px solid #7C3AED",
                        },
                    },
                },
            },
            MuiIconButton: {
                styleOverrides: {
                    root: {
                        borderRadius: "8px",
                    }
                }
            },
            MuiTextField: {
                styleOverrides: {
                    root: {
                        "& .MuiInputBase-root": {
                            borderRadius: "8px",
                            background: "#FFF",
                        },
                    },
                },
            },
            MuiSelect: {
                styleOverrides: {
                    root: {
                        borderRadius: "8px",
                        background: "#FFF",
                        "&.Mui-focused": {
                            borderColor: "#B801C0",
                        },
                    },
                },
            },
            MuiButton: {
                styleOverrides: {
                    root: {
                        borderRadius: "27px",
                        padding: "12px 24px",
                        textAlign: "center",
                        textTransform: "capitalize",
                        width: "100%",
                        position: "relative",
                        overflow: "hidden",
                        transition: "all 0.3s ease-in-out",
                        color: "#fff",
                        "&:disabled": {
                            // opacity: 0.5,
                            cursor: "not-allowed",
                        },
                        // ✨ Shine effect (pseudo-element)
                        "&::before": {
                            content: '""',
                            position: "absolute",
                            top: 0,
                            left: "-120%",
                            width: "60%",
                            height: "100%",
                            background: "rgba(255, 255, 255, 0.4)",
                            transform: "skew(45deg)",
                            transition: "left 0.75s ease-in-out",
                            zIndex: 1,
                        },
                        "&:hover::before": {
                            left: "155%",
                        },
                        // [baseTheme.breakpoints.down("md")]: {
                        //     padding: "8px 16px",
                        // },
                    },
                },
                variants: [
                    {
                        props: { variant: "contained", color: "primary" },
                        style: {
                            background: primaryGradColors[0],
                            color: "#fff",
                            // "&:hover": {
                            //     opacity: 0.9,
                            // },
                        },
                    },
                    {
                        props: { variant: "contained", color: "secondary" },
                        style: {
                            background: secondaryGradColors[0],
                            color: "#fff",
                            // "&:hover": {
                            //     opacity: 0.9,
                            // },
                        },
                    },
                ],
            },
            MuiList: {
                styleOverrides: {
                    root: {
                        padding: 0
                    }
                }
            },
            MuiListItem: {
                styleOverrides: {
                    root: {
                        display: "block",
                        padding: 0
                    }
                }
            },
            MuiListItemButton: {
                styleOverrides: {
                    root: {
                        // minHeight: 48,
                        // paddingLeft: "20px",
                        // paddingRight: "20px",
                        padding: "12px 12px 12px 16px",
                        transition: "justify-content 0.2s ease",
                        "&.collapsed": {
                            justifyContent: "center"
                        },
                        "&.expanded": {
                            justifyContent: "flex-start"
                        },
                        "&.active": {
                            backgroundColor: "#FEEFFF",
                            color: primaryColors[1],
                            "& .MuiListItemIcon-root": {
                                color: primaryColors[1],
                            }
                        }
                    },
                }
            },
            MuiListItemIcon: {
                styleOverrides: {
                    root: {
                        minWidth: 0,
                        justifyContent: "center",
                        transition: "margin 0.2s ease",
                        "&.collapsed": {
                            marginRight: "auto"
                        },
                        "&.expanded": {
                            marginRight: "12px"
                        }
                    }
                }
            },
            MuiListItemText: {
                styleOverrides: {
                    root: {
                        transition: "opacity 0.2s ease",
                        "&.collapsed": {
                            opacity: 0
                        },
                        "&.expanded": {
                            opacity: 1
                        }
                    }
                }
            },
            MuiPaper: {
                styleOverrides: {
                    root: {
                        padding: "16px 8px"
                    }
                }
            },
            MuiPaginationItem: {
                styleOverrides: {
                    root: {
                        fontSize: "12px",
                        color: "#71717A",
                        width: 28,
                        height: 28,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "4px",
                        border: "1px solid #E0E0E3",
                        fontWeight: 500,

                        "&:hover": {
                            border: "1px solid  #B801C0",
                            background: " #F8B1FE",
                        },

                        "&.Mui-selected": {
                            border: "1px solid #B801C0",
                            background: " #F8B1FE",
                            color: "#B801C0",
                        },
                    },
                },
            },
            MuiPagination: {
                styleOverrides: {
                    ul: {
                        gap: "8px", // sets the spacing between pagination items
                    },
                },
            },
        },

    });
}