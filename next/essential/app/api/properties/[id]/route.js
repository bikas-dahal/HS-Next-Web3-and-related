import connectDB from "@/config/database";
import Property from "@/models/Property"

// GET /api/properties/:id
export const GET = async (request, {params}) => {
    try {
        await connectDB()
        const property = await Property.findById(params.id)

        if (!property){
            return new Response(
                'Property not found.', {
                    status: 404
            }
            )
        }
        // console.log(property)
        return new Response(JSON.stringify((property)), {
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