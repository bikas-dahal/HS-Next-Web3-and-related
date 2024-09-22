import {ExtendedUser} from "@/next-auth";
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";

interface UserInfoProps {
    user?: ExtendedUser;
    label: string
}

export const UserInfo = ({
    user,
    label
}: UserInfoProps) => {
    return (
    <Card className={'w-[600px] shadow-lg'}>
        <CardHeader className={'text-2xl font-semibold text-center'}>
            <p>{label}</p>
        </CardHeader>
        <CardContent className={'space-y-4'}>
            <div className={'flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'}>
                <p>ID</p>
                <p>{user?.id}</p>
            </div>
            <div className={'flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'}>
                <p>Name</p>
                <p>{user?.name}</p>
            </div>
            <div className={'flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'}>
                <p>Email</p>
                <p>{user?.email}</p>
            </div>
            <div className={'flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'}>
                <p>Role</p>
                <p>{user?.role}</p>
            </div>
            <div className={'flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'}>
                <p>2FA</p>
                <Badge variant={user?.isTwoFactorEnabled ? 'default' : 'destructive'}>{user?.isTwoFactorEnabled ? 'Yes' : 'No'}</Badge>
            </div>
        </CardContent>
    </Card>
    )
}