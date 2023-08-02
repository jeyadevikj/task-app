import { Button, Card, CardActions, CardContent, CardHeader, Divider, Stack, Typography } from "@mui/material"
import theme from "../theme"
import { DeleteOutlined, SystemUpdateAltRounded } from "@mui/icons-material"
import "../styles/TaskCard.css"

const TaskCard = ({ item }) => {
    return (
        <Card className="card" variant="outlined">
            <CardHeader titleTypographyProps={{ variant: "subtitle2", textAlign: "left" }} title={item.title} sx={{ paddingBottom: 0 }} />
            <CardContent sx={{height: "100%"}}>
                <Typography variant="body2" textAlign={"left"}>
                    {item.description}
                </Typography>
            </CardContent>
            <CardContent sx={{ paddingTop: 0 }}>
                <Stack direction={"row"} justifyContent={"space-between"}>
                    {item.completed ? (
                        <Typography variant="caption" color={theme.palette.success.main}>
                            Completed
                        </Typography>
                    ) : (
                        <Typography variant="caption" color={theme.palette.warning.main}>
                            Incomplete
                        </Typography>
                    )}
                    {item.hasPriority ? (
                        <Typography variant="caption" color={theme.palette.priority.main}>
                            High Priority
                        </Typography>
                    ) : (
                        <Typography variant="caption" color={theme.palette.success.main}>
                            Low Priority
                        </Typography>
                    )}
                </Stack>
            </CardContent>
            <Divider />
            <CardActions sx={{ display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                <Button variant="text" className="action-btn" startIcon={<SystemUpdateAltRounded />} size="small" >
                    Update
                </Button>
                <Button variant="delete" className="action-btn" startIcon={<DeleteOutlined/>} size="small">
                    Delete
                </Button>
            </CardActions>
        </Card>
    )
}

export default TaskCard