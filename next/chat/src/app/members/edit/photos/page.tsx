import {getAuthUserId} from "@/actions/authAction";
import {getMemberByUserId, getMemberPhotosByUserId} from "@/actions/memberAction";
import {CardBody, CardHeader, Divider} from "@nextui-org/react";
import MemberPhotoUpload from "@/app/members/edit/photos/MemberPhotoUpload";
import MemberPhotos from "@/components/MemberPhotos";
import EditForm from "@/app/members/edit/EditForm";
import CardInnerWrapper from "@/components/CardInnerWrapper";

export default async function PhotosPage() {
    const userId = await getAuthUserId();
    const member = await getMemberByUserId(userId);
    const photos = await getMemberPhotosByUserId(
        userId
    );

    return (
        <CardInnerWrapper
            header="Edit Profile"
            body={
                <>
                    <MemberPhotoUpload />
                    <MemberPhotos
                        photos={photos}
                        editing={true}
                        mainImageUrl={member?.image}
                    />
                </>
            }
        />
    );
}