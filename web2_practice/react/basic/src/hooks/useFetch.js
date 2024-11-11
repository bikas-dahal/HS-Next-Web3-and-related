import {useEffect, useState} from "react";

export function useTodoFetch() {
    const [todo, setTodo] = useState([])

    const fetchTodo =async () => {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos/1')
        const data = await response.json()
        setTodo( data)
    }

    useEffect(() => {
        fetchTodo()
    }, [])

    // console.log(todo)
    return todo
}

export function useFetch(url) {
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(true);

    const loadData = async () => {
        setLoading(true);
        const response = await fetch(url)
        const resData = await response.json()
        setData(resData)
        setLoading(false)
    }

    useEffect(() => {
        loadData()
    }, [url])

    return {
        data,
        loading,
    }
}