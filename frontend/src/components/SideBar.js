import { HomeOutlined, PermIdentity } from "@mui/icons-material"
import { Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, Typography } from "@mui/material"
import { useState } from "react"
import "../styles/SideBar.css"
import theme from "../theme"

const SideBar = ({ categories, handleCategoryClick, handleAllTasks }) => {
    // const categories = ['Home', 'Project 1', 'Project 2']
    const [selectedCategory, setSelectedCategory] = useState("All")
    const hoverProperties = {
        "&:hover": {
            backgroundColor: theme.palette.selected.main
        },
    }

    const handleCategorySelect = (category) => {
        setSelectedCategory(category)
        if(category === "All") {
            handleAllTasks()
        } else {
            handleCategoryClick(category)
        }
    }


    return (
        <>
            <Box className="sidebar">
                <Drawer variant="permanent" sx={{
                    [`& .MuiDrawer-paper`]: {
                        minWidth: '14vw',
                        position: "relative",
                        borderRight: "0px solid"
                    }
                }}>
                    <Box>
                        <List>
                            <ListItem disablePadding sx={hoverProperties}>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <HomeOutlined />
                                    </ListItemIcon>
                                    <ListItemText>
                                        <Typography variant="body2">
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
                                        <Typography variant="body2">
                                            Profile
                                        </Typography>
                                    </ListItemText>
                                </ListItemButton>
                            </ListItem>
                        </List>
                        <Divider>
                        </Divider>
                        <Stack direction={"row"} alignItems={"center"} p={1}>
                            <Typography variant="caption">
                                Categories
                            </Typography>
                        </Stack>
                        <List>
                            <ListItem disablePadding sx={{hoverProperties, backgroundColor: selectedCategory === "All" ? theme.palette.selected.main : {}}}>
                                <ListItemButton onClick={() => handleCategorySelect("All")}>
                                    <ListItemText>
                                        <Typography variant="subtitle2" color={theme.typography.h1.color} fontWeight={600}>
                                            All
                                        </Typography>
                                    </ListItemText>
                                </ListItemButton>
                            </ListItem>
                            {categories?.map((category, index) => {
                                return (
                                    <ListItem disablePadding sx={{hoverProperties, backgroundColor: selectedCategory === category ? theme.palette.selected.main : {}}} key={index}>
                                        <ListItemButton onClick={() => handleCategorySelect(category)}>
                                            <ListItemText>
                                                <Typography variant="subtitle2" color={theme.typography.h1.color} fontWeight={600}>
                                                    {category}
                                                </Typography>
                                            </ListItemText>
                                        </ListItemButton>
                                    </ListItem>
                                )
                            })}
                        </List>
                    </Box>
                </Drawer>
            </Box>
        </>
    )
}

export default SideBar