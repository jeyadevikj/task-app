import { createTheme } from "@mui/material/styles"

const theme = createTheme({
    typography: {
        fontFamily: "Poppins",
        h1: {
            color: "#26282E"
        },
        h2: {
            color: "#26282E"
        },
        h3: {
            color: "#26282E"
        },
        h4: {
            color: "#26282E"
        },
        h5: {
            color: "#26282E"
        },
        h6: {
            color: "#26282E"
        },
        subtitle1: {
            color: "#26282E"
        },
        body1: {
            color: "#B0BCCE"
        },
        body2: {
            color: "#BBC6D7"
        }
    },
    palette: {
        primary: {
            main: "#2B47E8",
            contrastText: "#ffffff" // Replace with your desired primary color
        },
        selected: {
            main: "#EFF2F6", // Replace with your desired background color for selected items
        },
        outline: {
            main: "#BBC6D7"
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
            }
        }
    }
})

export default theme;