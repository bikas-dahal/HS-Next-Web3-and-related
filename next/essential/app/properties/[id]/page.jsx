'use client'

import {useEffect, useState} from "react";
import { useParams} from "next/navigation";
import { fetchProperty} from "@/utils/requests";
import PropertyHeaderImage from "@/components/PropertyHeaderImage";
import PropertyDetails from "@/components/PropertyDetails";
import Link from "next/link";
import  { FaArrowLeft } from "react-icons/fa";
import Spinner from "@/components/Spinner";
import {load} from "next/dist/compiled/@edge-runtime/primitives/load";

const PropertyPage = () => {
    const [property, setProperty] = useState('null');
    const [loading, setLoading] = useState(true);

    const { id } = useParams();
    console.log(id)

    // const data = await fetchProperty('66b4dc6102a3c3e872c9b5f6')
    // console.log(data)

    useEffect(() => {
        const fetchPropertyData = async () => {
            if (!id) {
                return
            }
            try {
                // console.log('hi')
                const property = await fetchProperty(id)
                console.log(property)
                setProperty(property)
            } catch (error) {
                console.error('Failed to fetch property', error)
            } finally {
                setLoading(false)
            }
        }
        console.log(property)
    //     console.log(loading)

        if (property === null) {
            fetchPropertyData()
        }
    }, [id, property])
    console.log(property)

    if (!property && !loading) {
        return (
            <h1 className='text-center font-bold text-2xl mt-10'>
                 Property Not Found
             </h1>
         )
     }

    return(

        <>
            {loading && <Spinner loading={loading} />}
            {/*{console.log(property)}*/}
            {!loading && property && (
                <>
                    <PropertyHeaderImage image={property.images[0]} />
                    <section>
                        <div className='container m-auto p-6'>
                            <Link href='/properties'
                                  className='text-blue-500 hover:text-blue-600 flex items-center'
                            >
                            <FaArrowLeft className='mr-2' /> Back to Properties
                            </Link>

                        </div>
                    </section>

                    {/*// <!-- Property Info -->*/}
                    <section className="bg-blue-50">
                        <div className="container m-auto py-10 px-6">
                            <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">

                                <PropertyDetails property={property} />
                                {/*// <!-- Sidebar -->*/}
                                <aside className="space-y-4">
                                    <button
                                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
                                    >
                                        <i className="fas fa-bookmark mr-2"></i> Bookmark Property
                                    </button>
                                    <button
                                        className="bg-orange-500 hover:bg-orange-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
                                    >
                                        <i className="fas fa-share mr-2"></i> Share Property
                                    </button>

                                    {/*// <!-- Contact Form -->*/}
                                    <div className="bg-white p-6 rounded-lg shadow-md">
                                        <h3 className="text-xl font-bold mb-6">Contact Property Manager</h3>
                                        <form>
                                            <div className="mb-4">
                                                <label
                                                    className="block text-gray-700 text-sm font-bold mb-2"
                                                    htmlFor="name"
                                                >
                                                    Name:
                                                </label>
                                                <input
                                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                    id="name"
                                                    name="name"
                                                    type="text"
                                                    placeholder="Enter your name"
                                                    required
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <label
                                                    className="block text-gray-700 text-sm font-bold mb-2"
                                                    htmlFor="email"
                                                >
                                                    Email:
                                                </label>
                                                <input
                                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    placeholder="Enter your email"
                                                    required
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <label
                                                    className="block text-gray-700 text-sm font-bold mb-2"
                                                    htmlFor="phone"
                                                >
                                                    Phone:
                                                </label>
                                                <input
                                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                    id="phone"
                                                    name="phone"
                                                    type="text"
                                                    placeholder="Enter your phone number"
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <label
                                                    className="block text-gray-700 text-sm font-bold mb-2"
                                                    htmlFor="message"
                                                >
                                                    Message:
                                                </label>
                                                <textarea
                                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 h-44 focus:outline-none focus:shadow-outline"
                                                    id="message"
                                                    name="message"
                                                    placeholder="Enter your message"
                                                ></textarea>
                                            </div>
                                            <div>
                                                <button
                                                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline flex items-center justify-center"
                                                    type="submit"
                                                >
                                                    <i className="fas fa-paper-plane mr-2"></i> Send Message
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </aside>
                            </div>
                        </div>
                    </section>

                    {/*// <!-- Images -->*/}
                    <section className="bg-blue-50 p-4">
                        <div className="container mx-auto">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="col-span-2">
                                    <img
                                        src="../../../../../../break/nxt/property-pulse-nextjs-main/property-pulse-nextjs-main/_theme_files/images/properties/a1.jpg"
                                        alt=""
                                        className="object-cover h-[400px] w-full rounded-xl cursor-pointer"
                                    />
                                </div>
                                <div className="col-span-2">
                                    <img
                                        src="../../../../../../break/nxt/property-pulse-nextjs-main/property-pulse-nextjs-main/_theme_files/images/properties/a2.jpg"
                                        alt=""
                                        className="object-cover h-[400px] w-full rounded-xl cursor-pointer"
                                    />
                                </div>
                                <div className="col-span-2">
                                    <img
                                        src="../../../../../../break/nxt/property-pulse-nextjs-main/property-pulse-nextjs-main/_theme_files/images/properties/a3.jpg"
                                        alt=""
                                        className="object-cover h-[400px] w-full rounded-xl cursor-pointer"
                                    />
                                </div>
                                <div className="col-span-2">
                                    <img
                                        src="../../../../../../break/nxt/property-pulse-nextjs-main/property-pulse-nextjs-main/_theme_files/images/properties/a4.jpg"
                                        alt=""
                                        className="object-cover h-[400px] w-full rounded-xl cursor-pointer"
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                </>
            )}

            no property
        </>
    )
}

export default PropertyPage;