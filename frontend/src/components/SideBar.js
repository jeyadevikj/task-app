import { AddBoxOutlined, ArrowBackIosNewOutlined, ArrowForwardIosOutlined, HomeOutlined, MoreHorizOutlined, PermIdentity } from "@mui/icons-material"
import { Badge, Box, Button, Divider, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, Typography } from "@mui/material"
import "../styles/SideBar.css"
import theme from "../theme"
import { useState } from "react"

const SideBar = () => {
    const categories = ['Home', 'Project 1', 'Project 2']
    const hoverProperties = {
        "&:hover": {
            backgroundColor: theme.palette.selected.main
        },
    }
    const [expanded, setExpandedState] = useState(true)
    return (
        <>
            {expanded ? (
            <Box className="sidebar">
                    <Box className="sidebar-top">
                        <List>
                            <ListItem disablePadding sx={hoverProperties}>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <HomeOutlined />
                                    </ListItemIcon>
                                    <ListItemText>
                                        <Typography variant="body1">
                                            Home
                                        </Typography>
                                    </ListItemText>
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding sx={hoverProperties}>
                                <ListItemButton >
                                    <ListItemIcon>
                                        <PermIdentity />
                                    </ListItemIcon>
                                    <ListItemText>
                                        <Typography variant="body1">
                                            Profile
                                        </Typography>
                                    </ListItemText>
                                </ListItemButton>
                            </ListItem>
                        </List>
                    </Box>
                    <Divider textAlign="right">
                        <IconButton onClick={() => setExpandedState(!expanded)}>
                            <ArrowBackIosNewOutlined />
                        </IconButton>
                    </Divider>
                    <Box className="sidebar-bottom">
                        <Stack direction={"row"} justifyContent={"space-around"} alignItems={"center"}>
                            <Typography variant="body2">
                                Categories
                            </Typography>
                            <IconButton>
                                <AddBoxOutlined />
                            </IconButton>
                        </Stack>
                        <List>
                            {categories.map((category) => {
                                return (
                                    <ListItem disablePadding sx={hoverProperties}>
                                        <ListItemButton >
                                            <ListItemText>
                                                <Typography variant="body1" color={theme.typography.h1.color} fontWeight={600}>
                                                    {category}
                                                </Typography>
                                            </ListItemText>
                                            <IconButton>
                                                <MoreHorizOutlined />
                                            </IconButton>
                                        </ListItemButton>
                                    </ListItem>
                                )
                            })}
                        </List>
                    </Box>
                </Box>
                ) : (
                        <IconButton onClick={() => setExpandedState(!expanded)}>
                            <ArrowForwardIosOutlined/>
                        </IconButton>
                )}
            
        </>
    )
}

export default SideBar