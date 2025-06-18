"use client";
import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { User } from "next-auth";
import { Button } from "./ui/button";
function Navbar() {
  const { data: session } = useSession();
  const user: User = session?.user as User;
  //   return (
  //     <nav className="p-4 md:p-6 shadow-md bg-blue-950">
  //       <div className="container mx-auto flex flex-col md:flex-row justify-between items-center ">
  //         <a className="text-2xl font-bold mb-4 md:mb-0 text-white" href="#">
  //           EnigmaNote
  //         </a>
  //         {session ? (
  //           <>
  //             <span className="mr-4">
  //               Welcome, {user?.username || user?.email}
  //             </span>
  //             <Button className="w-full md:w-auto" onClick={() => signOut()}>
  //               Logout
  //             </Button>
  //           </>
  //         ) : (
  //           <Link href="/signin">
  //             <Button className="w-full md:w-auto">Login</Button>
  //           </Link>
  //         )}
  //       </div>
  //     </nav>
  //   );

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/30 border-b border-white/20 shadow-md px-6 py-4 md:py-5">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <a
          href="#"
          className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 tracking-wide mb-3 md:mb-0"
        >
          EnigmaNote
        </a>

        {session ? (
          <div className="flex flex-col md:flex-row items-center gap-3 text-gray-900 font-medium">
            <span className="text-sm md:text-base ">
              Welcome, {user?.username || user?.email}
            </span>
            <Button
              onClick={() => signOut()}
              className="bg-gradient-to-r from-purple-100 via-pink-100 to-blue-100 text-indigo-700 font-medium hover:brightness-105 transition px-5 py-2 rounded-md border border-indigo-200 shadow-sm"
            >
              Logout
            </Button>
          </div>
        ) : (
          <Link href="/signin">
            <Button className="bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 text-purple-700 font-semibold hover:from-pink-300 hover:via-purple-300 hover:to-blue-300 transition-all px-5 py-2 rounded-md backdrop-blur-sm shadow-md">
              Login
            </Button>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
