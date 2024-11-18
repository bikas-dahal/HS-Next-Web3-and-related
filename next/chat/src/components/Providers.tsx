'use client'

import {ReactNode, useCallback, useEffect, useRef} from "react";
import {NextUIProvider} from "@nextui-org/react";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import useMessageStore from "@/hooks/useMessageStore";
import {getUnreadMessageCount} from "@/actions/messageAction";
import {usePresenceChannel} from "@/hooks/usePresenceChannel";
import {useNotificationChannel} from "@/hooks/useNotificationChannel";
import {SessionProvider} from "next-auth/react";

export default function Providers({ children, userId } : { children: ReactNode, userId: string | null }) {

    const isUnreadCountSet = useRef(false);

    const { updateUnreadCount } = useMessageStore(
        (state) => ({
            updateUnreadCount: state.updateUnreadCount,
        })
    );

    const setUnreadCount = useCallback((amount: number) => {
            updateUnreadCount(amount);
        },
        [updateUnreadCount]
    );

    useEffect(() => {
        if (!isUnreadCountSet.current && userId) {
            getUnreadMessageCount().then((count) => {
                setUnreadCount(count);
            });
            isUnreadCountSet.current = true;
        }
    }, [setUnreadCount, userId]);

    usePresenceChannel();

    useNotificationChannel(userId);

    return (
            <NextUIProvider>
                <ToastContainer position={'bottom-right'}  />
                {children}
            </NextUIProvider>
    )
}