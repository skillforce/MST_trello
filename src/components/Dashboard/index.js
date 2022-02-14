import React, {useCallback, useState} from 'react';
import useStore from "../../hooks/useStore";
import {observer} from "mobx-react-lite";
import {DragDropContext, Droppable} from "react-beautiful-dnd";
import {NewTack} from "./newTack";
import {Column} from "./Column";
import {Box, Button, Grid, Paper, Typography} from "@mui/material";


const getListStyle = (isDraggingOver) => {
    return {
        backgroundColor: isDraggingOver ? 'lightBlue' : 'lightgray',
        padding: 8,
        minHeight: 500
    }
}


const Dashboard = () => {
    const {boards} = useStore()

    const [newTaskToSection, setNewTaskToSection]=useState(null)

    const closeNewTaskForm=useCallback(()=>{
        setNewTaskToSection(null)
    },[setNewTaskToSection])

    const onDragEnd = useCallback(event => {
        const {source, destination, draggableId: taskId} = event;
        boards.activeBoard.moveTask(taskId, source, destination);
    }, [boards]);

    return (
        <Box p={2}>
            <DragDropContext onDragEnd={onDragEnd}>
                <Grid container spacing={2}>
                    {boards.activeBoard?.sections?.map(section => {
                        return (
                            <Grid key={section.id} item xs>
                                <Paper>
                                    <Box p={1} display={'flex'} alignItems={"center"} justifyContent={"space-between"}>
                                        <Typography variant={'h5'}>{section?.title}</Typography>
                                        <Button variant={'outlined'} color={'primary'} onClick={()=>{
                                            setNewTaskToSection(section.id)
                                        }
                                        }>New</Button>
                                    </Box>
                                    <Droppable droppableId={section.id}>
                                        {(provided, snapshot) => (
                                            <div {...provided.droppableProps}
                                                 ref={provided.innerRef}
                                                 style={getListStyle(snapshot.isDraggingOver)}>
                                                <Column section={section}/>
                                                {provided.placeholder}
                                            </div>

                                        )}
                                    </Droppable>
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </DragDropContext>
           <NewTack open={!!newTaskToSection} handleClose={closeNewTaskForm} activeSectionId={newTaskToSection} />
        </Box>
    );
};

export default observer(Dashboard);