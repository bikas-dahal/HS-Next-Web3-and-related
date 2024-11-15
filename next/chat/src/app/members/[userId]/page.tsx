import { getMemberByUserId } from "@/actions/memberAction";

import { notFound } from "next/navigation";
import React from "react";
import CardInnerWrapper from "@/components/CardInnerWrapper";

export default async function MemberDetailedPage({
                                                     params,
                                                 }: {
    params: { userId: string };
}) {
    const member = await getMemberByUserId(
        params.userId
    );

    if (!member) return notFound();

    return (
        <>
            <CardInnerWrapper
                header="Profile"
                body={member.description}
            />
        </>
    );
}