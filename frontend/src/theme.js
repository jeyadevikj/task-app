import { createTheme } from "@mui/material/styles"

const theme = createTheme({
    typography: {
        fontFamily: "Poppins",
        h1: {
            color: "#26282E",
            fontWeight: "bold"
        },
        h2: {
            color: "#26282E",
            fontWeight: "bold"
        },
        h3: {
            color: "#26282E",
            fontWeight: "bold"
        },
        h4: {
            color: "#26282E",
            fontWeight: "bold"
        },
        h5: {
            color: "#26282E",
            fontWeight: "bold"
        },
        h6: {
            color: "#26282E",
            fontWeight: "bold"
        },
        subtitle2: {
            color: "#26282E",
            fontWeight: "bold"
        },
        body1: {
            color: "#B0BCCE"
        },
        body2: {
            color: "#BBC6D7"
        },
        caption: {
            color: "#BBC6D7"
        }
    },
    palette: {
        primary: {
            main: "#2B47E8",
            contrastText: "#ffffff" // Replace with your desired primary color
        },
        secondary: {
            main: "#d32f2f",
            contrastText: "ffffff"
        },
        selected: {
            main: "#EFF2F6", // Replace with your desired background color for selected items
        },
        outline: {
            main: "#BBC6D7"
        },
        priority: {
            main: "#d32f2f"
        },
        warning: {
            main: "#ff9800"
        },
        success: {
            main: "#43a047"
        }
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: ({ownerState}) => ({
                    ...(ownerState.variant !== 'contained') && {
                        ':hover': {
                            backgroundColor: theme.palette.primary.main,
                            color: theme.palette.primary.contrastText,
                            transition: '500ms'
                        }
                    }
                })
            },
        }
    }
})

theme.components.MuiButton.variants = [
    {
        props: {
            variant: 'delete'
        },
        style: {
            color: theme.palette.secondary.main,
            ':hover': {
                backgroundColor: theme.palette.secondary.main,
                color: theme.palette.secondary.contrastText,
                transition: '500ms'
            }
        }
    }
]

export default theme;