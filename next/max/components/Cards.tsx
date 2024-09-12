import Card from "@/components/Card";

const Cards = () => {
    return (
        <div className='grid grid-cols-3 h-96 gap-5 p-4  '>
            <Card title='News' />
            <Card title='Hi' />
            <Card title='Hello' />
            <Card title='Ok' />
        </div>
    )
}

export default Cards