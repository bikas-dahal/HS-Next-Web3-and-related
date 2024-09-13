import connectDB from "@/config/database";
import Property from "@/models/Property"
import { getSessionUser } from "@/utils/getSessionUser";
// import { session } from "next-(auth)/core/routes";
import cloudinary from "@/config/cloudinary";

export const GET = async (request) => {
    try {
        await connectDB()
        const properties = await Property.find({})
        console.log(properties)
        return new Response(JSON.stringify((properties)), {
            status: 200
        });

    } catch (error) {
        console.log(error)
        return new Response (
            'Something went wrong. Please try again later',
            {
                statusCode: 404,
            }

        )
    }
}

export const POST = async (request) => {
    try {

        const sessionUser = await getSessionUser()

        if (!session || !session.user) {
            return new Response(
                'User ID is required',
                {
                    status: 401
                }
            )
        }

        const {userId} = sessionUser

        const formData = await request.formData();
        // for amenities
        const amenities= formData.getAll('amenities');
        const images= formData.getAll('images').filter(
            (image) => {
                image.name !== ''
            }
        );

        // property data object
        const propertyData = {
            type: formData.get('type'),
            name: formData.get('name'),
            location: {
                street: formData.get('location.street'),
                city: formData.get('location.city'),
                state: formData.get('location.state'),
                zipcode: formData.get('location.zipcode'),
            },
            beds: formData.get('beds'),
            baths: formData.get('baths'),
            square_feet: formData.get('square_feet'),
            amenities,
            rates: {
                weekly: formData.get('rates.weekly'),
                monthly: formData.get('rates.monthly'),
                nightly: formData.get('rates.nightly'),
            },
            seller_info: {
                name: formData.get('seller_info.name'),
                email: formData.get('seller_info.email'),
                phone: formData.get('seller_info.phone'),
            },
            owner: userId,
        }
            // images with the help of cloudinary
        const imageUploadPromises = []

        for (const image of images) {
            const imageBuffer = await image.arrayBuffer()
            const imageArray = Array.from(new Uint8Array(imageBuffer))

            const imageData = Buffer.from(imageArray)

            // convert image data to bas64
            const imageBase64 = imageData.toString('base64')
            // now to cloudinary

            const result = await cloudinary.uploader.upload(
                `data:image/jpeg;base64,${imageBase64}`, {
                    folder: 'homestay'
                }
            )
            imageUploadPromises.push(result.secure_url);

            // wait
            const uploadedImages = await Promise.all(imageUploadPromises)

            propertyData.images = uploadedImages
        }




        const newProperty = new Property(propertyData)
        newProperty.save()

        return Response.redirect(
            `${process.env.NEXTAUTH_URL}/properties/${newProperty._id}`,
        )



        return new Response(JSON.stringify({
            message: 'hyalo',
        }),
        {
            status: 200
        })

    } catch (error) {
        return new Response(
            'Something went wrong. Please try again later',
            {
                statusCode: 404,
            }
        )
    }
}