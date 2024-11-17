import { deleteMessage } from "@/actions/messageAction";
import { MessageDto } from "@/types";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import {
    useState,
    useCallback,
    Key,
    useEffect,
} from "react";
import useMessageStore from "./useMessageStore";

const outboxColumns = [
    { key: "recipientName", label: "Recipient" },
    { key: "text", label: "Message" },
    { key: "created", label: "Date sent" },
    { key: "actions", label: "Actions" },
];

const inboxColumns = [
    { key: "senderName", label: "Sender" },
    { key: "text", label: "Message" },
    { key: "created", label: "Date received" },
    { key: "actions", label: "Actions" },
];

export const useMessages = (
    initialMessages: MessageDto[]
) => {
    const {
        set,
        remove,
        messages,
        updateUnreadCount,
    } = useMessageStore((state) => ({
        set: state.set,
        remove: state.remove,
        messages: state.messages,
        updateUnreadCount: state.updateUnreadCount,
    }));
    const searchParams = useSearchParams();
    const router = useRouter();
    const isOutbox =
        searchParams.get("container") === "outbox";
    const [isDeleting, setDeleting] = useState({
        id: "",
        loading: false,
    });

    useEffect(() => {
        set(initialMessages);

        return () => {
            set([]);
        };
    }, [initialMessages, set]);

    const columns = isOutbox
        ? outboxColumns
        : inboxColumns;

    const handleDeleteMessage = useCallback(
        async (message: MessageDto) => {
            setDeleting({
                id: message.id,
                loading: true,
            });
            await deleteMessage(message.id, isOutbox);
            remove(message.id);
            if (!message.dateRead && !isOutbox)
                updateUnreadCount(-1);
            setDeleting({ id: "", loading: false });
        },
        [isOutbox, remove, updateUnreadCount]
    );

    const handleRowSelect = (key: Key) => {
        const message = messages.find(
            (m) => m.id === key
        );
        const url = isOutbox
            ? `/members/${message?.recipientId}`
            : `/members/${message?.senderId}`;
        router.push(url + "/chat");
    };

    return {
        isOutbox,
        columns,
        deleteMessage: handleDeleteMessage,
        selectRow: handleRowSelect,
        isDeleting,
        messages,
    };
};