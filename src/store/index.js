import {types} from "mobx-state-tree";
import UsersStore from "./usersStore";
import BoardStore from "./boardsStore";


const RootStore = types.model('RootStore', {
    users: types.optional(UsersStore, {}),
    boards: types.optional(BoardStore, {}),
})

export default RootStore