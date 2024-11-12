import {atomFamily} from "recoil";
import { TODOS} from "../../../try.js";

export const todoAtomFamily = atomFamily({
    key: 'todosAtomFamily',
    default: id => {
        return TODOS.find(x => x.id === id)
    }
})