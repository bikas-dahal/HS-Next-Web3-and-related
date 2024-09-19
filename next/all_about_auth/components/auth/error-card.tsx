import {Header} from "@/components/auth/header";
import {BackButton} from "@/components/auth/back-button";
import {Card, CardFooter, CardHeader} from "@/components/ui/card";


export const ErrorCard = () => {
    return (
        <Card className="w-[400px] shadow-md">
            <CardHeader className={'text-center'}>
                <Header label={'Please try again'} h={'😕 Opps, Something went wrong! '} />
            </CardHeader>
            <CardFooter>
                <BackButton href={'/auth/login'} label={'Back to Login'} />
            </CardFooter>
        </Card>
    )
}