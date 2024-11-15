import React from 'react'
import {getMembers} from "@/actions/memberAction";
import MemberCard from "@/app/members/MemberCard";
import {fetchCurrentUserLikeIds} from "@/actions/likeAction";

const Page = async () => {

    const members = await getMembers()
    // console.log('memebers', members)

    const likeIds = await fetchCurrentUserLikeIds();

    return (
        <div>
            <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8">
                {members &&
                    members.map((member) => (
                        <MemberCard
                            member={member}
                            key={member.id}
                            likeIds={likeIds}
                        />
                    ))}
            </div>
        </div>
    )
}
export default Page
