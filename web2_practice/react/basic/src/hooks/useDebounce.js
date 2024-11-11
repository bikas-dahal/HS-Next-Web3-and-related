import {useRef} from "react";

export function useDebounce(fn, delay) {
    const timeout = useRef();
    const ch = () => {
        clearTimeout(timeout.current);
        timeout.current = setTimeout(fn, delay);
    }

    return ch
}