'use client'

import {Button} from "@/components/ui/button";
import {useCurrent} from "@/features/auth/api/use-current";
import {useEffect} from "react";
import {useRouter} from "next/navigation";
import {useLogout} from "@/features/auth/api/use-logout";

export default function Home() {

  const router = useRouter();
  const { data, isLoading } = useCurrent()

  const { mutate } = useLogout()

  useEffect(() => {
    if (!data && !isLoading) {
      router.push("/sign-up");
    }
  }, [data]);

  return(
      <div>
        <Button onClick={() => mutate()}>Logout</Button>
        You are authorized
      </div>
  )
}
