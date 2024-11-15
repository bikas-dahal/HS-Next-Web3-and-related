
import React from "react";
import MessageBox from "@/app/members/[userId]/chat/MessageBox";
import {getAuthUserId} from "@/actions/authAction";
import {getMessageThread} from "@/actions/messageAction";
import ChatForm from "@/app/members/[userId]/chat/ChatForm";
import CardInnerWrapper from "@/components/CardInnerWrapper";

export default async function ChatPage({ params}: {
    params: { userId: string };
}) {
    const messages = await getMessageThread(
        params.userId
    );

    // console.log('mess',messages)
    const userId = await getAuthUserId();

    const body = (
        <div>
            {messages.length === 0 ? (
                "No messages to display"
            ) : (
                <div>
                    {messages.map((message) => (
                        <MessageBox
                            key={message.id}
                            message={message}
                            currentUserId={userId}
                        />
                    ))}
                </div>
            )}
        </div>
    );
    return(
            <CardInnerWrapper
                header="Chat"
                body={body}
                footer={<ChatForm />}
            />
        )
}