import Image from "next/image";
import { Button } from "@/components/ui/button";

import { Alert } from 'flowbite-react'
import Header from '@/components/Header'
import Cards from '@/components/Cards'
import {auth} from "@/auth";
import {cookies} from "next/headers";
import {decode} from "@auth/core/jwt";
import {InfiniteMovingCards} from "@/components/ui/infinite-moving-cards";
import {Gyan} from "@/models/data";


export default async function Home() {
    const session = await auth()
    const user = (session?.user?.name)
    // console.log('session', session)

    // const cokks = cookies().get('authjs.session-token')
    // console.log(await decode({
    //     token: cokks?.value!,
    //     salt: cokks?.name,
    //     scret: process.env.AUTH_TOKEN
    // }))
    // console.log(cokks)

  return (
      <div className='pt-10 bg-gray-200'>
          Welcome {user}
          <div className='m-4 p-2 rounded-xl bg-gray-400'>
          <span className='p-2 text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-900 to-blue-800'>
              Wisdom (Gyan)
          </span>
          <div
              className="h-[16rem] mx-3 bg-slate-400 rounded-md flex flex-col antialiased  dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
              <InfiniteMovingCards items={Gyan} direction='left' speed='slow'/>
          </div>
          <div
              className="h-[16rem] rounded-md flex flex-col antialiased mx-3 bg-slate-400 dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">

              <InfiniteMovingCards items={Gyan} direction='right' speed='slow'/>
          </div>
          </div>
          <Cards/>
      </div>
  );
}
