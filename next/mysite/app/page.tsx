import Image from "next/image";
import { Button } from "@/components/ui/button";

import { Alert } from 'flowbite-react'

export default function Home() {
  return (
    <>
        <Alert color="info">Alert!</Alert>;
      <Button>Click me</Button>
    </>
  );
}

