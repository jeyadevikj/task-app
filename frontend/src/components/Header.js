import { Avatar, Box, Button, Divider, IconButton, Stack, Typography } from "@mui/material";
import "../styles/Header.css"
import { useEffect, useState } from "react";
import { ArrowBackIosNewOutlined, ArrowForwardIosOutlined } from "@mui/icons-material";

const Header = ({ needAuthButtons }) => {
    const user = JSON.parse(localStorage.getItem('user'))
    return (
        <>
            <Box className="header">
                <Stack direction={"row"} spacing={1} alignItems={"center"}>
                    <Typography variant={"h4"}>
                        RxTasks
                    </Typography>
                </Stack>
                {needAuthButtons || !user ? (
                    <Stack spacing={2} direction={"row"}>
                        <Button variant="outlined">Login</Button>
                        <Button variant="contained">Register</Button>
                    </Stack>
                ) : (
                    <Stack spacing={2} direction={"row"}>
                        <Stack direction={"row"} alignItems={"center"} spacing={1}>
                            <Avatar alt="Profile image" src="avatar.png" />
                            <Typography variant="body2">{user?.name}</Typography>
                        </Stack>
                        <Button variant="contained" >
                            Logout
                        </Button>
                    </Stack>
                )}
            </Box >
        </>


    )
}

export default Header;