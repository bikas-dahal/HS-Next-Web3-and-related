import {atom, selector} from "recoil";
import {counterAtom} from "./counter.js";

export const coursesAtom = atom({
    key: 'coursesAtom',
    default: 10
})

export const notificationsAtom = atom({
    key: 'notificationsAtom',
    default: 5
})

export const messagesAtom = atom({
    key: 'messagesAtom',
    default: 7
})

export const jobsAtom = atom({
    key: 'jobsAtom',
    default: 14
})

export const totalCountSelector = selector({
    key: 'totalCount',
    get: ({ get }) => {
        const coursesCount = get(coursesAtom)
        const notificationsCount = get(notificationsAtom)
        const messagesCount = get(notificationsAtom)
        const jobsCount = get(jobsAtom)
        return coursesCount + notificationsCount + messagesCount + jobsCount
    }
})