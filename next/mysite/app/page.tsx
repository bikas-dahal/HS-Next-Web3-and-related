import Image from "next/image";
import { Button } from "@/components/ui/button";

import { Alert } from 'flowbite-react'
import Header from '@/components/Header'
import Cards from '@/components/Cards'
import {auth} from "@/auth";
import {cookies} from "next/headers";
import {decode} from "@auth/core/jwt";


export default async function Home() {
    const session = await auth()
    const user = (session?.user?.name)

    // const cokks = cookies().get('authjs.session-token')
    // console.log(await decode({
    //     token: cokks?.value!,
    //     salt: cokks?.name,
    //     scret: process.env.AUTH_TOKEN
    // }))
    // console.log(cokks)

  return (
      <div className='pt-20'>
          Welcome {user}
          <Cards/>
      </div>
  );
}

