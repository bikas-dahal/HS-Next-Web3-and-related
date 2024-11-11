import {useEffect, useRef} from "react";

export function usePrev(value) {
    const ref = useRef();

    useEffect(() => { // this run later this is a rule of react
        ref.current = value;
    }, [value]);

    return ref.current; // this run first and
}