import { DeleteOutlined, SystemUpdateAltRounded } from "@mui/icons-material"
import { Button, Card, CardActions, CardContent, CardHeader, Divider, Stack, Typography } from "@mui/material"
import { useState } from "react"
import "../styles/TaskCard.css"
import theme from "../theme"
import UpdateTaskDialog from "./dialogs/UpdateTaskDialog"
import DeleteTaskDialog from "./dialogs/DeleteTaskDialog"

const TaskCard = ({ item }) => {
    const [updateDialogOpen, setUpdateDialogOpen] = useState(false)
    const [deleteDialoagOpen, setDeleteDialogOpen] = useState(false)

    const handleUpdateClick = () => {
        setUpdateDialogOpen(true)
    }

    const handleDeleteClick = () => {
        setDeleteDialogOpen(true)
    }

    const handleUpdateDialogClose = () => {
        setUpdateDialogOpen(false)
    }

    const handleDeleteDialogClose = () => {
        setDeleteDialogOpen(false)
    }

    return (
        <Card className="card" variant="outlined" key={item._id}>
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
                <Button variant="text" className="action-btn" startIcon={<SystemUpdateAltRounded />} size="small" onClick={() => handleUpdateClick()}>
                    Update
                </Button>
                <Button variant="delete" className="action-btn" startIcon={<DeleteOutlined/>} size="small" onClick={() => handleDeleteClick()}>
                    Delete
                </Button>
            </CardActions>

            <UpdateTaskDialog openState={updateDialogOpen} onCloseDialog={handleUpdateDialogClose} task={item}/>
            <DeleteTaskDialog openState={deleteDialoagOpen} onCloseDialog={handleDeleteDialogClose} task={item}/>
        </Card>
    )
}

export default TaskCard