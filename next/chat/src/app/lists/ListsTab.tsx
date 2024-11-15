'use client'

import {Member} from "@prisma/client";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {Key, useTransition} from "react";
import {Tab, Tabs} from "@nextui-org/tabs";
import LoadingComponent from "@/components/Loading";
import MemberCard from "@/app/members/MemberCard";

type Props = {
    members: Member[];
    likeIds: string[];
};


const ListsTab = ({members, likeIds}: Props) => {

    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const [isPending, startTransition] = useTransition();

    const tabs = [
        {
            id: "source",
            label: "I agree",
        },
        {
            id: "target",
            label: "They Agree",
        },
        { id: "mutual", label: "We Agree" },
    ];

    function handleTabChange (key: Key) {
        startTransition(() => {
            const params = new URLSearchParams(searchParams);
            params.set("type", key.toString());
            router.replace(`${pathname}?${params.toString()}`);
        })
    }



    return (
        <div className="flex w-full flex-col mt-10 gap-5">
            <Tabs
                aria-label="Like tabs"
                items={tabs}
                color="default"
                onSelectionChange={(key) =>
                    handleTabChange(key)
                }
            >
                {(item) => (
                    <Tab key={item.id} title={item.label}>
                        {isPending ? (
                            <LoadingComponent/>
                        ) : (
                            <>
                                {members.length > 0 ? (
                                    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-8">
                                        {members.map((member) => (
                                            <MemberCard
                                                key={member.id}
                                                member={member}
                                                likeIds={likeIds}
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <div>
                                        No members for this filter
                                    </div>
                                )}
                            </>
                        )}
                    </Tab>
                )}
            </Tabs>
        </div>
    );
};
export default ListsTab;
