import {
    Card,
    CardContent,
    CardDescription, CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

type MyCardProps = {
    title: string;
    description: string;
    content: string;
};

const MyCard: React.FC<MyCardProps> = ({ title, description, content }) => {
    return (
        <>
                <Card className="bg-cyan-800 bg-opacity-25 m-2 rounded-lg shadow-lg overflow-hidden relative transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl  text-black">
                    <Link className='bg-cyan-800' href={title.toLowerCase()} >
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold">{title}</CardTitle>
                        <CardDescription className="text-lg  text-black">{description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>{content}</p>
                    </CardContent>
        </Link>
                </Card>
        </>

    );
};

export default MyCard;
