import { AddBoxOutlined, HomeOutlined, MoreHorizOutlined, PermIdentity } from "@mui/icons-material"
import { Box, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, Typography } from "@mui/material"
import "../styles/SideBar.css"
import theme from "../theme"

const SideBar = ({ expanded }) => {
    const categories = ['Home', 'Project 1', 'Project 2']
    const hoverProperties = {
        "&:hover": {
            backgroundColor: theme.palette.selected.main
        },
    }
    return (
        <>
            <Box className="sidebar">
                <Drawer variant="permanent" sx={{
                    [`& .MuiDrawer-paper`]: {
                        width: '18vw',
                        position: "relative",
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
                        <Stack direction={"row"} justifyContent={"space-around"} alignItems={"center"}>
                            <Typography variant="caption">
                                Categories
                            </Typography>
                            <IconButton size="small">
                                <AddBoxOutlined />
                            </IconButton>
                        </Stack>
                        <List>
                            {categories.map((category) => {
                                return (
                                    <ListItem disablePadding sx={hoverProperties}>
                                        <ListItemButton >
                                            <ListItemText>
                                                <Typography variant="subtitle2" color={theme.typography.h1.color} fontWeight={600}>
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
                </Drawer>
            </Box>
        </>
    )
}

export default SideBar