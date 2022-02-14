import React, {useCallback} from 'react';
import {Box, Button, CardContent, Typography} from "@mui/material";
import DeleteForeverSharpIcon from '@mui/icons-material/DeleteForeverSharp';
import {User} from "../common/User";
import useStore from "../../hooks/useStore";
import {observer} from "mobx-react-lite";

const Task = observer(({task,sectionId}) => {

    const{boards}=useStore()

    const tackDelete=useCallback((tackId,sectionId)=>{
        console.log(tackId,sectionId)
        boards.activeBoard.deleteTask(tackId,sectionId)
    },[boards.activeBoard])


    return (
        <CardContent>
            <Box display={'flex'} justifyContent={'space-between'} flexDirection={'row-reverse'} width={1}>
            <DeleteForeverSharpIcon cursor={'pointer'} onClick={()=>tackDelete(task.id,sectionId)}/>
            <Typography color={"textPrimary"} gutterBottom style={{fontSize:18}}>
                {task?.title}
            </Typography>
            </Box>
            <Typography color={"textSecondary"} gutterBottom>
                {task?.description}
            </Typography>
            <User user={task.assignee}/>
        </CardContent>
    );
});

export default Task;