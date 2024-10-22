import {Card, CardHeader, CardTitle} from "@/components/ui/card";
import {DottedSeparator} from "@/components/dotted-separator";

export const SignInCard = () => {
    return (
        <Card className={'w-full border-none h-full  md:w-[487px] shadow-none'}>
            <CardHeader className={'flex items-center justify-center p-6 text-center'}>
                <CardTitle className={'text-2xl'}>
                    Welcome back 🙏
                </CardTitle>
                <div className={'px-6 mb-2'}>
                    <DottedSeparator />
                    hi
                </div>
            </CardHeader>
        </Card>
    )
}