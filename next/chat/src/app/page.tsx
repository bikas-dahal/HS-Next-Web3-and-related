import Image from "next/image";
import {Button} from "@nextui-org/react";
import Link from "next/link";
import {auth, signOut} from "@/auth";

export default async function Home() {
    const session = await auth()
    console.log(session)

  return (
      <div>
        <Button as={Link} href={'/members'} variant={'faded'}>Hi there</Button>
          <div>
              {session && session?.user?.name}
              {JSON.stringify(session, null, 2)}
          </div>
          <form action={
              async () => {
                  'use server'
                  await signOut()
              }
          }>
              <Button type={'submit'}>Sign out</Button>
          </form>
      </div>
  );
}
