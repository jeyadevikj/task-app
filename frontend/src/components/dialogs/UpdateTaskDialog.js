import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, FormGroup, Stack, TextField } from "@mui/material"
import { useState } from "react"
import "../../styles/Modal.css"
import axiosApi from "../../api/axiosApi"
import { enqueueSnackbar } from "notistack"

const UpdateTaskModal = ({ openState, onCloseDialog, task }) => {
    const [updatedTaskDetails, setUpdatedTaskDetails] = useState({
        title: task.title,
        description: task.description,
        completed: task.completed,
        hasPriority: task.hasPriority,
        colName: task.colName
    })
    const [checkedState, setCheckedState] = useState({
        title: false,
        description: false,
        completed: false,
        hasPriority: false,
        colName: false
    })

    const performUpdate = async (updatedDetails) => {
        try {
            await axiosApi.patch(`/tasks/${task._id}`, updatedDetails)
            enqueueSnackbar('Task updated successfully!', {
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

    const handleSubmit = () => {
        console.log("Update clicked");
        const updatedDetails = {}
        for(const key in updatedTaskDetails) {
            if(checkedState[key] && task[key] !== updatedTaskDetails[key]) {
                updatedDetails[key] = updatedTaskDetails[key]
            }
        }

        performUpdate(updatedDetails)
    }
    return (
        <Dialog open={openState} onClose={onCloseDialog} fullWidth disableEscapeKeyDown>
            <DialogTitle align="center">Choose and update</DialogTitle>
            <DialogContent>
                <FormGroup row={true}>
                    <FormControlLabel control={<Checkbox checked={checkedState.title} onChange={() => setCheckedState({ ...checkedState, title: !checkedState.title })} />} label="Title" />
                    <FormControlLabel control={<Checkbox checked={checkedState.description} onChange={() => setCheckedState({ ...checkedState, description: !checkedState.description })} />} label="Description" />
                    <FormControlLabel control={<Checkbox checked={checkedState.completed} onChange={() => setCheckedState({ ...checkedState, completed: !checkedState.completed })} />} label="Completed" />
                    <FormControlLabel control={<Checkbox checked={checkedState.hasPriority} onChange={() => setCheckedState({ ...checkedState, hasPriority: !checkedState.hasPriority })} />} label="Priority" />
                    <FormControlLabel control={<Checkbox checked={checkedState.colName} onChange={() => setCheckedState({ ...checkedState, colName: !checkedState.colName })} />} label="Collection" />
                </FormGroup>
                <Stack direction={"column"} spacing={2}>
                    {checkedState.title && (
                        <TextField type="text" variant="outlined" label="Title" name="title" value={updatedTaskDetails.title} onChange={(event) => { setUpdatedTaskDetails({ ...updatedTaskDetails, title: event.target.value }) }} />
                    )}
                    {checkedState.description && (
                        <TextField type="text" variant="outlined" label="Description" name="description" value={updatedTaskDetails.description} onChange={(event) => { setUpdatedTaskDetails({ ...updatedTaskDetails, description: event.target.value }) }} />
                    )}
                    {checkedState.colName && (
                        <TextField type="text" variant="outlined" label="Collection" name="colName" value={updatedTaskDetails.colName} onChange={(event) => { setUpdatedTaskDetails({ ...updatedTaskDetails, colName: event.target.value }) }} />
                    )}
                    <Stack direction={"row"} justifyContent={"space-between"}>
                        {checkedState.completed && (
                            <FormControlLabel control={<Checkbox checked={updatedTaskDetails.completed} onChange={() => { setUpdatedTaskDetails({...updatedTaskDetails, completed: !updatedTaskDetails.completed}) }} />} label="Completed" />
                        )}
                        {checkedState.hasPriority && (
                            <FormControlLabel control={<Checkbox checked={updatedTaskDetails.hasPriority} onChange={() => { setUpdatedTaskDetails({...updatedTaskDetails, hasPriority: !updatedTaskDetails.hasPriority}) }} />} label="Priority" />
                        )}
                    </Stack>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button variant="delete" onClick={() => onCloseDialog()}>
                    Cancel
                </Button>
                <Button variant="contained" onClick={() => handleSubmit()}>
                    Update
                </Button>
            </DialogActions>
        </Dialog>
    )
}



export default UpdateTaskModal