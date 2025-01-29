import React from "react";
import Image from "next/image";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "../ui/button";
import Searchbar from "./Searchbar";

const Header = () => {
   return (
      <div className="border-b">
         <div className="flex flex-col lg:flex-row items-center gap-4 p-4">
            <div className="w-full lg:w-auto flex items-center justify-between bg-white/10">
               <Link href="/">
                  <Image
                     src="/assets/images/logo.png"
                     alt="logo"
                     width={1000}
                     height={1000}
                     className="w-24 lg:w-28"
                  />
               </Link>
               <div className="lg:hidden">
                  <SignedIn>
                     <UserButton />
                  </SignedIn>
                  <SignedOut>
                     <SignInButton mode="modal">
                        <Button variant={"ghost"} className=" text-gray-800 px-3 py-1.5 hover:bg-gray-50">Sign In</Button>
                     </SignInButton>
                  </SignedOut>
               </div>
            </div>
            <div className="w-full lg:max-w-2xl">
               <Searchbar />
            </div>
         </div>
      </div>
   );
};

export default Header;
