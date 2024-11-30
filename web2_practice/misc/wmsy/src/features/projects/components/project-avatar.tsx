import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface ProjectAvatarProps {
    image?: string;
    name?: string;
    classname?: string;
    fallbackClassName?: string;
}


export const ProjectAvatar = ({ image, name, classname, fallbackClassName }: ProjectAvatarProps) => {
    if (image) {
        return (
            <div className={cn('size-5 relative rounded-md overflow-hidden', classname)}>
                <Image src={image} alt={name!} fill className={'object-cover'} />
            </div>
        )
    }

    return(
        <Avatar className={cn('size-5 rounded-md', classname)}>
            <AvatarFallback className={cn("text-white bg-pink-600 font-semibold rounded-md text-sm uppercase", fallbackClassName)}>
                {name?.slice(0, 1).toUpperCase()}
            </AvatarFallback>
        </Avatar>
    )
}