import MessageSidebar from "@/app/messages/MessageSidebar";
import MessageTable from "@/app/messages/MessageTable";
import {getMessagesByContainer} from "@/actions/messageAction";

export default async function MessagesPage({
                                               searchParams,
                                           }: {
    searchParams: { container: string };
}) {
    const messages = await getMessagesByContainer(
        searchParams.container
    );

    return (
        <div className="grid grid-cols-12 gap-5 h-[80vh] mt-10">
            <div className="col-span-2">
                <MessageSidebar/>
            </div>
            <div className="col-span-10">
                <MessageTable messages={messages}/>
            </div>
        </div>
    );
}