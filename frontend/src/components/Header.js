import { Avatar, Box, Button, Stack, Typography } from "@mui/material";
import "../styles/Header.css"

const Header = ({needAuthButtons, username}) => {
    return (
        <>
            <Box className="header">
                <Typography variant={"h4"}>
                    RxTasks
                </Typography>
                {needAuthButtons? (
                    <Stack spacing={2} direction={"row"}>
                    <Button variant="outlined">Login</Button>
                    <Button variant="contained">Register</Button>
                </Stack>
                ): (
                    <Stack spacing={2} direction={"row"}>
                        <Stack direction={"column"}>
                            <Avatar alt="Profile image" src="avatar.png"/>
                            <span>{username}</span>
                        </Stack>
                    </Stack>
                )}
                
            </Box>
        </>


    )
}

export default Header;