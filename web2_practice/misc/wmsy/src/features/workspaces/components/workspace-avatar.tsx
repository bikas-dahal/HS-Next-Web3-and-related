import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface WorkspaceAvatarProps {
    image?: string;
    name: string;
    classname?: string;
}


export const WorkspaceAvatar = ({ image, name, classname }: WorkspaceAvatarProps) => {
    if (image) {
        return (
            <div className={cn('size-10 relative rounded-md overflow-hidden', classname)}>
                <Image src={image} alt={name} fill className={'object-cover'} />
            </div>
        )
    }

    return(
        <Avatar className={cn('size-10 rounded-md', classname)}>
            <AvatarFallback className="text-white bg-blue-600 font-semibold rounded-md text-lg uppercase">
                {name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
        </Avatar>
    )
}