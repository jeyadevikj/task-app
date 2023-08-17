import { CheckBox } from "@mui/icons-material"
import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, Stack, TextField } from "@mui/material"
import { useState } from "react"
import axiosApi from "../../api/axiosApi"
import { enqueueSnackbar } from "notistack"

const AddTaskDialog = ({ openState, onCloseDialog }) => {
    const [checkedState, setCheckedState] = useState({
        completed: false,
        hasPriority: false
    })
    const addTask = async (title, description, colName, completed, hasPriority) => {
        try {
            await axiosApi.post('/tasks', {
                title,
                description,
                colName,
                completed,
                hasPriority
            })
            enqueueSnackbar('Task created!', {
                variant: "success",
                preventDuplicate: true
            })
        } catch (error) {
            enqueueSnackbar(error.response.data.message, {
                variant: "error",
                preventDuplicate: true
            })
        }
    }
    const handleSubmit = (event) => {
        // console.log(event.target.title.value + " " + event.target.description.value + " " + event.target.colName.value + " " + event.target.completed.checked + " " + event.target.hasPriority.checked);
        event.preventDefault()
        const title = event.target.title.value
        const description = event.target.description.value
        const colName = event.target.colName.value
        const completed = event.target.completed.checked
        const hasPriority = event.target.hasPriority.checked
        addTask(title, description, colName, completed, hasPriority)
    }
    return (
        <Dialog open={openState} onClose={onCloseDialog} disableEscapeKeyDown fullWidth>
            <DialogTitle align="center">
                Add New Task
            </DialogTitle>
            <DialogContent>
                <form onSubmit={(event) => handleSubmit(event)} method="post">
                    <Stack direction={"column"} spacing={2}>
                        <TextField variant="outlined" type="text" label="Title" name="title" required />
                        <TextField variant="outlined" type="text" label="Description" name="description" required />
                        <TextField variant="outlined" type="text" label="Collection" name="colName" required />
                        <Stack direction={"row"} justifyContent={"space-between"}>
                            <FormControlLabel control={<Checkbox />} label="Completed" name="completed" />
                            <FormControlLabel control={<Checkbox />} label="Priority" name="hasPriority" />
                        </Stack>
                    </Stack>
                    <DialogActions>
                        <Button variant="delete" onClick={() => onCloseDialog()}>
                            Cancel
                        </Button>
                        <Button variant="contained" type="submit">
                            Create task
                        </Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default AddTaskDialog