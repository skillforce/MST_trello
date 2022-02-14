import {Draggable} from "react-beautiful-dnd";
import {Card} from "@mui/material";
import Task from "./Task";
import {observer} from "mobx-react-lite";


const getItemStyle = (draggableStyle) => {
    return {
        padding: 8,
        marginBottom: 8,
        ...draggableStyle
    }
}

export const Column = observer(({section}) => {
    return (
        <div>
            {section?.tasks?.map((t, i) => (
                <Draggable draggableId={t.id} key={t.id} index={i}>
                    {(provided) => (
                        <Card ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={getItemStyle(provided.draggableProps.style)}>
                            <Task task={t} sectionId={section.id}/>
                        </Card>
                    )}
                </Draggable>
            ))}
        </div>
    )
})