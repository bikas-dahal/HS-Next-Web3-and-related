import Image from "next/image";



const PropertyHeaderImage = ({ image }) => {
    return (
        <section>
            <div className='container-xl margin-auto'>
                <div className='grid grid-cols-1'>
                    <Image
                        src={`/images/properties/${image}`}
                        alt=''
                        className='object-cover h-[400px] w-full'
                        width={0}
                        height={0}
                        property={true}
                    />
                </div>
            </div>
        </section>
    )
}

export default PropertyHeaderImage