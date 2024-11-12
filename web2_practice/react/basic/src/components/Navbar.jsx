import React, {useMemo} from 'react'
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import {coursesAtom, jobsAtom, messagesAtom, notificationsAtom, totalCountSelector} from "../store/atoms/navbar.js";
import {todoAtomFamily} from "../store/atoms/todo.js";

const Navbar = () => {

    const courseCount = useRecoilValue(coursesAtom)
    const messageCount = useRecoilValue(messagesAtom)
    const notificationCount = useRecoilValue(notificationsAtom)
    const [jobCount, setJobCount] = useRecoilState(jobsAtom)

    // const totalCount = useMemo(() => (() => {
    //     return jobCount + notificationCount + messageCount + courseCount
    // }), [jobCount, notificationCount, messageCount, courseCount]);

    const totalCount = useRecoilValue(totalCountSelector)

    const navItems = [{
        label: 'Home',
        count: null
    }, {
        label: 'Courses',
        count: courseCount
    }, {
        label: 'Notification',
        count: notificationCount
    }, {
        label: 'Messages',
        count: messageCount
    }, {
        label: 'Job',
        count: jobCount
    }]

    return (
        <div className={'flex justify-between mt-4 rounded-md px-28  '}>
            <div className={'flex gap-x-5 items-center p-2 rounded-md'}>
                <div className={'text-2xl'}>Logo</div>
                <div className={'flex gap-x-5 text-xl'}>
                    {navItems.map((item, i) => (
                        <div className={'hover:underline cursor-pointer'} key={i}>{item.label}<span>{item.count && `(${item.count})` }</span></div>
                    ))}
                </div>
            </div>
            <div>
                <button
                    onClick={() => {
                        setJobCount((count) => count + 1)
                    }}
                    className={'bg-red-400 p-2 rounded-md hover:p-2.5'}
                >
                    Test button

                </button>
                <div className={'bg-red-500 m-2 p-1 rounded-md'}>

                    Total Notification: {totalCount}
                </div>
                Checking todo
                <Todo id={1} />
                <Todo id={1} />
            </div>
            <div className={'flex items-center gap-x-5 text-xl'}>
                <button className={'border-2 p-2 rounded-md bg-blue-400 hover:underline cursor-pointer'}>Contact</button>
                <button className={' p-2 rounded-md border-blue-400 border-2 hover:underline cursor-pointer'}>Login</button>
            </div>

        </div>
    )
}

const Todo = ({ id }) => {

    const currentTodo = useRecoilValue(todoAtomFamily(id))

    return (
        <div>
            {currentTodo.title}
        </div>
    )
}


export default Navbar
