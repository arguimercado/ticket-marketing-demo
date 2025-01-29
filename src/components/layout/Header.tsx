import React from "react";
import Image from "next/image";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "../ui/button";
import Searchbar from "./Searchbar";
import { DollarSign, Ticket } from "lucide-react";

const Header = () => {
   return (
      <div className="border-b">
         <div className="flex flex-col md:flex-row items-center gap-4 p-4 md:justify-between">
            <div className="w-full md:w-auto flex items-center justify-between bg-white/10">
               <Link href="/">
                  <Image
                     src="/assets/images/logo.png"
                     alt="logo"
                     width={1000}
                     height={1000}
                     className="w-24 md:w-28"
                  />
               </Link>
               <div className="md:hidden">
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
            <div className="w-full md:max-w-2xl">
               <Searchbar />
            </div>
            {/* Desktop Application */}
            <div className="hidden md:block w-auto">
               <SignedIn>
                  <div className="flex items-center gap-3">
                        <Link href="/sell" className="flex gap-2 items-center text-sm text-gray-800 hover:text-gray-900">
                           <DollarSign className="w-4 h-4" />
                        </Link>
                        <Link href="/my-tickets">
                           <Ticket className="w-4 h-4" />
                        </Link>
                    
                     <UserButton />
                  </div>
               </SignedIn>
            </div>

            {/* Mobil Application */}
            <div className="md:hidden w-full flex justify-center gap-3">
               <SignedIn>
               <div className="flex items-center gap-3 w-full">
                     <Button asChild variant={"danger"} className="w-full">
                        <Link href="/sell">
                           Sell Tickets
                        </Link>
                     </Button>
                     <Button asChild variant={"info"} className="w-full">
                        <Link href="/my-tickets">
                        My Tickets
                        </Link>
                     </Button>
                  </div>
               </SignedIn>
            </div>
         </div>
      </div>
   );
};

export default Header;
