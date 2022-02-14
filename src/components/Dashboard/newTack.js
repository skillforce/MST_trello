import React, {useCallback, useState} from 'react';
import {observer} from "mobx-react-lite";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    FormLabel,
    Select,
    TextField
} from "@mui/material";
import useStore from "../../hooks/useStore";

export const NewTack = observer(({
                                     open, handleClose = () => {
    },activeSectionId
                                 }) => {
    const {users,boards} = useStore()
    const [taskState, setTaskState] = useState({})


    const updateFormState = useCallback((e) => {
        const {value, name} = e.target;

        setTaskState(prevState => ({
            ...prevState,
            [name]: value ? value.trim() : ''
        }))
    }, [setTaskState])

    const addNewTack=useCallback((e)=>{
        e.preventDefault()
        boards.activeBoard.addTask(taskState,activeSectionId)
        handleClose()
        setTaskState({})
    },[handleClose,activeSectionId,taskState,boards])


    return (
        <Dialog open={open}>
            <DialogTitle>
                Creating A New Task:
            </DialogTitle>
            <form onSubmit={addNewTack}>
                <DialogContent style={{minWidth: 500}}>
                    <Box p={2}>
                        <TextField fullWidth
                                   required
                                   variant="standard"
                                   type={'text'}
                                   name={'title'}
                                   label={"Title"}
                                   onChange={updateFormState}
                                   value={taskState?.title || ''}>
                        </TextField>
                    </Box>
                    <Box p={2}>
                        <TextField fullWidth
                                   required
                                   variant="standard"
                                   type={'text'}
                                   name={'description'}
                                   label={"Description"}
                                   onChange={updateFormState}
                                   value={taskState?.description || ''}>
                        </TextField>
                    </Box>
                    <Box p={1}>
                        <FormControl fullWidth>
                            <FormLabel shrink={"true"}>
                                Assignee
                            </FormLabel>
                            <Select native
                                    name={'assignee'}
                                    variant="standard"
                                    value={taskState?.assignee || ''}
                                    style={{backgroundColor: '#ffffff', marginLeft: 10}}
                                    onChange={updateFormState}>
                                <option value={''} disabled>
                                    ---
                                </option>
                                {users.list.map((t) => (
                                    <option key={t.id} value={t.id}>
                                        {t?.name}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color={'error'}>
                        Close
                    </Button>
                    <Button type={'submit'} color={'success'}>
                        Create
                    </Button>
                </DialogActions>
            </form>

        </Dialog>
    );
});

