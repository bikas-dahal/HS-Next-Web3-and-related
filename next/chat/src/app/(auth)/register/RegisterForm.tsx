"use client";

import {
    RegisterSchema,
    registerSchema,
} from "@/schema/RegisterSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Card,
    CardHeader,
    CardBody,
    Button,
    Input,
} from "@nextui-org/react";
import React from "react";
import { useForm } from "react-hook-form";
import { GiPadlock } from "react-icons/gi";
import {registerUser} from "@/actions/authAction";
import {handleFormServerErrors} from "@/lib/util";

export default function RegisterForm() {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isValid, isSubmitting },
    } = useForm<RegisterSchema>({
        // resolver: zodResolver(registerSchema),
        // mode: "onTouched",
    });

    const onSubmit = async (data: RegisterSchema) => {
        console.log(data);

        const result = await registerUser(data)

        console.log(result)

        if (result.status === 'success') {
            console.log('User Registered')
        } else {
            // if (Array.isArray(result.error)){
            //     result.error.forEach((error) => {
            //         const fieldName = error.path.join('.') as
            //             | "email"
            //             | "password"
            //             | "name"
            //         setError(fieldName, {
            //             message: error.message,
            //         })
            //     })
            // } else {
            //     setError('root.serverError', {
            //         message: result.error,
            //     })
            // }

            handleFormServerErrors(result, setError)

        }

    };

    return (
        <Card className="w-96 mx-auto">
            <CardHeader className="flex flex-col items-center justify-center">
                <div className="flex flex-col gap-2 items-center text-default">
                    <div className="flex flex-row items-center gap-3">
                        <GiPadlock size={30} />
                        <h1 className="text-3xl text-gray-900 font-semibold">
                            Register
                        </h1>
                    </div>
                    <p className="text-neutral-500">
                        Welcome to Chat
                    </p>
                </div>
            </CardHeader>
            <CardBody>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-4">
                        <Input
                            defaultValue=""
                            label="Name"
                            variant="bordered"
                            {...register("name")}
                            isInvalid={!!errors.name}
                            errorMessage={errors.name?.message}
                        />
                        <Input
                            defaultValue=""
                            label="Email"
                            type={"email"}
                            variant="bordered"
                            {...register("email")}
                            isInvalid={!!errors.email}
                            errorMessage={errors.email?.message}
                        />
                        <Input
                            defaultValue=""
                            label="Password"
                            variant="bordered"
                            type="password"
                            {...register("password")}
                            isInvalid={!!errors.password}
                            errorMessage={
                                errors.password?.message
                            }
                        />
                        <Button
                            isLoading={isSubmitting}
                            isDisabled={!isValid}
                            fullWidth
                            className={'text-gray-800 text-lg'}
                            color="default"
                            type="submit"
                        >
                            Register
                        </Button>
                    </div>
                </form>
            </CardBody>
        </Card>
    );
}