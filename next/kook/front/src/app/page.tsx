import Image from "next/image";
import {Button} from "@/components/ui/button";
import Hero from "@/components/base/Hero";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/options";



export default async function Home() {
    const session = await getServerSession(authOptions)
  return (
    <div className='bg-cyan-800'>
        <p>
            {JSON.stringify(session) }
        </p>
        <Hero />
      Hi,
        <Button >Button</Button>

    </div>
  );
}
