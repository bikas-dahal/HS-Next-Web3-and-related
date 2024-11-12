import {atom, selector} from "recoil";

export const counterAtom = atom({
    key: 'counterAtom',
    default: 0,
})

export const evenSelector = selector({
    key: 'evenSelector',
    get: ({ get }) => {
        const currentCount = get(counterAtom)
        return currentCount % 2 === 0
    }
})