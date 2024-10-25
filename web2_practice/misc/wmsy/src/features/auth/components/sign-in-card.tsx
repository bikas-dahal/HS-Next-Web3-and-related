import {Card, CardHeader, CardTitle} from "@/components/ui/card";
import {DottedSeparator} from "@/components/dotted-separator";
// import {Separator} from "@/components/ui/separator";

export const SignInCard = () => {
    return (
        <Card className={'w-full border-none h-full  md:w-[487px] shadow-none'}>
            <CardHeader className={'flex items-center justify-center p-5 text-center'}>
                <CardTitle className={'text-2xl'}>
                    Welcome back 🙏
                </CardTitle>
            </CardHeader>
                <div className={'px-6 mb-3'}>
                    <DottedSeparator />
                </div>
        </Card>
    )
}