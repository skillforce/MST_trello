import {cast, flow, getParent, onSnapshot, types} from "mobx-state-tree";
import ApiCall from '../api'
import {User} from "./usersStore";
import {v4} from "uuid";


const Task = types.model('Tack', {
    id: types.identifier,
    title: types.string,
    description: types.string,
    assignee: types.safeReference(User)
});

const BoardSection = types.model("BoardSection", {
    id: types.identifier,
    title: types.string,
    tasks: types.array(Task)
}).actions(self => {
    return {
        load: flow(function* () {
            const {id: boardID} = getParent(self, 2);
            const {id: status} = self;
            const {tasks} = yield ApiCall.get(`/boards/${boardID}/tasks/${status}`);

            self.tasks = cast(tasks);

            onSnapshot(self, self.save);
        }),
        afterCreate() {
            self.load();
        },
        save: flow(function* ({tasks}) {
            const {id: boardID} = getParent(self, 2);
            const {id: status} = self;

            yield ApiCall.put(`/boards/${boardID}/tasks/${status}`, {tasks});
        }),
        addTask(taskPayload) {
            self.tasks.push(taskPayload);
        },
        deleteTack(taskId){
            self.tasks.filter(t=>t.id!==taskId)
        }
    };
});

const Board = types.model('Board', {
    id: types.identifier,
    title: types.string,
    sections: types.array(BoardSection)
}).actions(self => {
    return {
        moveTask(id, source, destination) {
            const fromSection = self.sections.find(t => t.id === source.droppableId);
            const toSection = self.sections.find(t => t.id === destination.droppableId);

            const taskToMoveIndex = fromSection.tasks.findIndex(t => t.id === id);
            const [task] = fromSection.tasks.splice(taskToMoveIndex, 1)

            toSection.tasks.splice(destination.index, 0, task.toJSON())
        },
        addTask(payload, sectionId) {
            const section = self.sections.find(t => t.id === sectionId)

            section.tasks.push({
                id: v4(),
                ...payload
            })
        },
        deleteTask(tackId,sectionId){
            const section = self.sections.find(t => t.id === sectionId)
            const taskToDeleteIndex = section.tasks.findIndex(t => t.id === tackId);
            section.tasks.splice(taskToDeleteIndex,1)
        }
    }
});


const BoardStore = types.model('BoardStore', {
    boards: types.optional(types.array(Board), []),
    activeBoard: types.safeReference(Board)
}).views(self => ({
    get list() {
        return self.boards.map(({id, title}) => ({id, title}))
    }
}))
    .actions(self => {
        return {
            selectBoard(newActiveBoard) {
                self.activeBoard = newActiveBoard
            },
            load: flow(function* () {
                self.boards = yield ApiCall.get('/boards')
            }),
            afterCreate() {
                self.load()
            }
        }
    })


export default BoardStore