import connectDB from "@/config/database";
import Property from "@/models/Property"

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