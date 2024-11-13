import Image from "next/image";
import {Button} from "@nextui-org/react";
import Link from "next/link";

export default function Home() {
  return (
      <div>
        <Button as={Link} href={'/members'} variant={'faded'}>Hi there</Button>
      </div>
  );
}
