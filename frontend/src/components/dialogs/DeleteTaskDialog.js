import { Button, Dialog, DialogActions, DialogContentText, DialogTitle } from "@mui/material"
import axiosApi from "../../api/axiosApi"
import { enqueueSnackbar } from "notistack"

const DeleteTaskDialog = ({ openState, onCloseDialog, task }) => {
    const handleDelete = async() => {
        try {
            await axiosApi.delete(`/tasks/${task._id}`)
            enqueueSnackbar('Task deleted successfully!', {
                variant: "success",
                preventDuplicate: true
            })
            onCloseDialog()
            window.location.reload()
        } catch (error) {
            enqueueSnackbar(error.response.data.message, {
                variant: "error",
                preventDuplicate: true
            })
        }
    }

    return (
        <Dialog open={openState} onClose={onCloseDialog} fullWidth disableEscapeKeyDown>
            <DialogTitle align="center">
                Delete task
            </DialogTitle>
            <DialogContentText align="center">
                Are you sure to delete "<strong>{task.title}</strong>" task?
            </DialogContentText>
            <DialogActions>
                <Button variant="text" onClick={() => onCloseDialog()}>
                    Cancel
                </Button>
                <Button variant="delete" onClick={() => handleDelete()}>
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default DeleteTaskDialog