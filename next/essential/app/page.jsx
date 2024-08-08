import Hero from "@/components/Hero";
import InfoBoxes from "@/components/InfoBoxes";
import Footer from "@/components/Footer";
import HomeProperties from "@/components/HomeProperties";
import connectDB from "@/config/database";

const HomePage = async () => {

    await connectDB()
    console.log(process.env.MONGODB_URI)

    return (
        <>
            <Hero />
            <InfoBoxes />
            <HomeProperties />
            <Footer />
            Hyalo
            <button className='bg-pink-300 p-2'>

            </button>
        </>
    )
}

export  default HomePage