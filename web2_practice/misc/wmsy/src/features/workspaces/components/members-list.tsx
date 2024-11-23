'use client'
import React, { Fragment } from 'react'
import { useWorkspaceId } from '../hooks/use-workspace-id'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeftIcon, MoreVertical } from 'lucide-react'
import Link from 'next/link'
import { Separator } from '@/components/ui/separator'
import { useGetMembers } from '@/features/members/api/use-get-members'
import { MemberAvatar } from '@/features/members/components/member-avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useDeleteMember } from '@/features/members/api/use-delete-member'
import { useUpdateMember } from '@/features/members/api/use-update-member'
import { MemberRole } from '@/schemas/memberTypes'
import { useConfirm } from '@/hooks/use-confirm'

const MembersList = () => {

    const [ConfirmDialog, confirm] = useConfirm(
        'Delete Member',
        'Are you sure you want to remvoe this member?',
        'destructive'
    )

    const workspaceId = useWorkspaceId()
    const { data } = useGetMembers({ workspaceId })

    const {mutate: deleteMember, isPending: isDeletingMember} = useDeleteMember() 
    const {mutate: updateMember, isPending: isUpdatingMember} = useUpdateMember() 

    const handleUpdateMember = (memberId: string, role: MemberRole) => {
        updateMember({param: {memberId}, json: {role}})
    }

    const handleDeleteMember = async (memberId: string) => {
        const ok = await confirm()
        if (!ok) return

        deleteMember({ param: {memberId} }, {
            onSuccess: () => {
                window.location.reload()
            }
        })

  return (
    <Card className='h-full w-full'>
        <ConfirmDialog />
        <CardHeader className='flex flex-row items-center gap-x-4'>
            <Button asChild variant={'secondary'} size={'sm'}>
                <Link href={`/workspaces/${workspaceId}`}>
                    <ArrowLeftIcon />
                    Back
                </Link>
            </Button>
            <CardTitle className='text-xl font-bold'>Members List</CardTitle>
        </CardHeader>
        <Separator className='' />
        <CardContent className='p-4'>
            {data?.documents.map((member, index) => (
                <Fragment key={member.$id}>
                    <div className='flex items-center gap-2'>
                        <MemberAvatar classname='size-10' fallbackClassname='text-lg' name={member.name} />
                        <div className='flex flex-col'>
                            <span className='font-semibold'>{member.name}</span>
                            <span className='text-neutral-500'>{member.email}</span>
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button className='ml-auto' variant='secondary' size='icon'>
                                    <MoreVertical size={4} className='text-muted-foreground'/>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent side='bottom' align='end'>
                                <DropdownMenuItem className='font-medium' onClick={() => handleUpdateMember(member.$id, MemberRole.ADMIN)} disabled={isUpdatingMember}>
                                    Set as Admin
                                </DropdownMenuItem>
                                <DropdownMenuItem className='font-medium' onClick={() => handleUpdateMember(member.$id, MemberRole.MEMBER)} disabled={isUpdatingMember}>
                                    Set as Member
                                </DropdownMenuItem>
                                <DropdownMenuItem className='font-medium text-amber-900' onClick={() => handleDeleteMember(member.$id)} disabled={isDeletingMember}>
                                    Remove {member.name}
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    {index !== data.documents.length - 1 && <Separator className='mt-4' />}
                </Fragment>
            ))}
        </CardContent>
    </Card>
  )
}

export default MembersList
