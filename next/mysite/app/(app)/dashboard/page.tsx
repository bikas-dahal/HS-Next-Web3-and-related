'use client'

import {useCallback, useEffect, useState} from "react";
import { Message } from '@/models/userModel'
import {useToast} from "@/components/ui/use-toast";
import {useSession} from "next-auth/react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {acceptMessageSchema} from "@/schemas/signUpSchema";
import {AxiosError} from "axios";
import {ApiResponse} from "@/types/apiResponse";
import Link from "next/link";
import {Switch} from "@/components/ui/switch";
import {Separator} from "@/components/ui/separator";
import {Button} from "@react-email/components";
import {Loader2, RefreshCcw} from "lucide-react";
import MessageCard from "@/components/MessageCard";

const Dashboard = () => {
    const [messages, setMessages] = useState<Message[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isSwitchLoading, setIsSwitchLoading] = useState<boolean>(false)


    const { toast } = useToast();

    const handleDeleteMessage = (messageId: string) => {
        setMessages(messages.filter((m) => m._id !== messageId))
    }

    const { data: session } = useSession()

    const form = useForm({
        resolver: zodResolver(acceptMessageSchema),
    })

    const {register, watch, setValue } = form

    const acceptMessages = watch('acceptMessages')

    const fetchAcceptMessages = useCallback(async () => {
        setIsSwitchLoading(true)

        try {
            const response = await axios.get<ApiResponse>(`/api/accept_messages`)
            setValue('acceptMessages', response.data.isAcceptingMessage)
        } catch(err) {
            const axiosError = err as AxiosError<ApiResponse>
            console.log("error occurred", err)
            toast({
                title: 'Error',
                description: axiosError.response?.data.message ?? 'Error fetching message setting',
                variant: 'destructive'
            })

        } finally {
            setIsLoading(false)
        }

    }, [setValue])

    const fetchMessages = useCallback(async (refresh: boolean = false) => {
        setIsLoading(true)
        setIsSwitchLoading(false)
        try {

                const response = axios.get<ApiResponse>(`/api/get_messages`)
            setMessages(response.data.messages || [])

            if (refresh) {
                toast({
                    title: 'Refreshed messages',
                    description: 'Showing latest messages'
                })
            }

        } catch(err) {
                    const axiosError = err as AxiosError<ApiResponse>
            toast({
                title: "Error",
                description: axiosError.response?.data.message ?? 'Error fetching message setting',
                variant: 'destructive'
            })

        } finally {
            setIsLoading(false)
            setIsSwitchLoading(false)
        }

    }, [setIsLoading, setMessages])

    useEffect(() => {
        if (!session || !session.user) return
        fetchMessages()
        fetchAcceptMessages()
    }, [session, setValue, fetchAcceptMessages, fetchMessages])

    const handleSwitchChange = async () => {
        try {
            const response = await axios.post<ApiResponse>('api/accept_messages', {
                acceptMessages: !acceptMessages
            })
            setValue('acceptMessages', !acceptMessages)
            toast({
                title: response.data.message ?? 'Success',
                variant: 'default'
            })
        } catch (error) {
            const axiosError = error as AxiosError<ApiResponse>
            toast({
                title: 'Error',
                description: axiosError.response?.data.message ?? 'Error fetching message setting',
                variant: 'destructive'
            })
        }
    }

    const { username } = session?.user as User
    const baseUrl = `${window.location.protocol}//${window.location.host}`
    const profileUrl = `${baseUrl}/u/${username}`

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(profileUrl)
        toast({
            title: "URL Copied.",
            description: 'Profile url copied to clipboard'
        })
    }

    if (!session || !session.user) {
        return (
            <div className='flex justify-center items-center min-h-screen bg-gray-100'>
                No available message, Please <Link href='/login'>Login</Link>.
            </div>
        )
    }

    return(
        <div>
            <h1>User Dashboard</h1>
            <div>
                <h2>
                    Copy your unique link
                </h2>
            <div>
                <input type='text' value={profileUrl} disabled />
                <Button onClick={copyToClipboard()}>Copy</Button>
            </div>
            </div>

            <div>
                <Switch {...register('acceptMessages')}
                    checked={acceptMessages}
                    onCheckedChange={handleSwitchChange}
                    disabled={isSwitchLoading}
                    />
                <span>Accept Messages: {acceptMessages ? 'On' : 'Off'}</span>
            </div>
            <Separator />
            <Button onClick={(e) => {
                e.preventDefault();
                fetchMessages(true)
            }}>
                {isLoading ? (
                    <Loader2 className='animate-spin' />
                ) : (
                    <RefreshCcw />
                )}
            </Button>

            <div>
                {messages.length > 0 ? (
                    messages.map((message, index) => (
                        <MessageCard key={message._id} message={message} onMessageDelete={handleDeleteMessage} />
                    ))
                ) : (
                    <p>No message to display</p>
                )}
            </div>

        </div>
    )
}

export default Dashboard;