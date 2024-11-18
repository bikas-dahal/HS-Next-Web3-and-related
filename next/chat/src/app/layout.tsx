import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import TopNav from "@/components/navbar/TopNav";
import {auth} from "@/auth";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Let's chat,",
  description: "Let's hope i will complete this properly, lol.",
};

export default async function  RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

    const session = await auth();
    const userId = session?.user?.id || null;

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers userId={userId}>
            <TopNav />
            <main className={'container mx-auto'}>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
