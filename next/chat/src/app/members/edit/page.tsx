import {
    CardHeader,
    Divider,
    CardBody,
} from "@nextui-org/react";
import React from "react";
import EditForm from "./EditForm";
import { getAuthUserId } from "@/actions/authAction"
import { getMemberByUserId } from "@/actions/memberAction"
import { notFound } from "next/navigation";
import CardInnerWrapper from "@/components/CardInnerWrapper";

export default async function MemberEditPage() {
    const userId = await getAuthUserId();

    const member = await getMemberByUserId(userId);

    if (!member) return notFound();
    return (
        <CardInnerWrapper
            header="Edit Profile"
            body={<EditForm member={member} />}
        />
    );
}