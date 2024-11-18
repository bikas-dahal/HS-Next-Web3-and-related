
import React from "react";
import MessageBox from "@/app/members/[userId]/chat/MessageBox";
import {getAuthUserId} from "@/actions/authAction";
import {getMessageThread} from "@/actions/messageAction";
import ChatForm from "@/app/members/[userId]/chat/ChatForm";
import CardInnerWrapper from "@/components/CardInnerWrapper";
import MessageList from "@/app/members/[userId]/chat/MessageList";
import {createChatId} from "@/lib/util";

export default async function ChatPage({ params}: {
    params: { userId: string };
}) {
    const messages = await getMessageThread(
        params.userId
    );
    const userId = await getAuthUserId();

    const chatId = createChatId( userId, params.userId );

    return(
            <CardInnerWrapper
                header="Chat"
                body={
                    <MessageList
                        initialMessages={messages}
                        currentUserId={userId}
                        chatId={chatId}
                    />
                }
                footer={<ChatForm />}
            />
        )
}