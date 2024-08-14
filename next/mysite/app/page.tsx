import Image from "next/image";
import { Button } from "@/components/ui/button";

import { Alert } from 'flowbite-react'
import Header from '@/components/Header'
import Cards from '@/components/Cards'

export default function Home() {
    console.log(process.env.HI)
  return (
    <div className='pt-20'>
        <Cards />
        <Alert color="info">Alert!</Alert>;
      <Button>Click me</Button>
    </div>
  );
}

