

const PropertyImages = ({ images }) => {
    return (
        <section className='bg-blue-50 p-4'>
            <div className='container mx-auto'>
                {images.length === 1 ? (
                    <Image
                        src={images[0]}
                        alt = ''
                        className='object-cover h-[400px] w-ful mx-auto rounded-xl'
                        width={1800}
                        height={400}
                    />
                ) : (
                    <div className='grid grid-cols-2 gap-4'>
                        {images.map((image, i) => (
                            <div key={i} className=>

                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}

export default PropertyImages