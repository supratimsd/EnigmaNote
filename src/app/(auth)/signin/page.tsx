// 'use client'
// import { useSession, signIn, signOut } from "next-auth/react"

// export default function Component() {
//   const { data: session } = useSession()
//   if (session) {
//     return (
//       <>
//         Signed in as {session.user.email} <br />
//         <button onClick={() => signOut()}>Sign out</button>
//       </>
//     )
//   }
//   return (
//     <>
//       Not signed in <br />
//       <button onClick={() => signIn()}>Sign in</button>
//     </>
//   )
// }

"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
// import { useEffect, useState } from "react";
// import { useDebounceValue, useDebounceCallback } from "usehooks-ts";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
// import { signUpSchema } from "@/schemas/signUpSchema";

// import axios, { AxiosError } from "axios";
// import { ApiResponse } from "@/types/ApiResponse";
import {
  Form,
  // FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// import { Loader2 } from "lucide-react";
import { signInSchema } from "@/schemas/signInSchema";
import { signIn } from "next-auth/react";

export default function SignInForm() {
  

  // toast("Event has been created.");
  const router = useRouter();
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    const result = await signIn("credentials", {
      redirect: false,
      identifier: data.identifier,
      password: data.password,
    });

    if (result?.error) {
      toast(
        <div>
          <p className="font-semibold">Login failed</p>
          <p className="text-sm text-muted-foreground">
            Incorrect username or password
          </p>
        </div>,
        {
          className: "bg-destructive text-destructive-foreground",
        }
      );
    }

    if (result?.url) {
      router.replace("/dashboard");
    }
  }
   
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 px-4">
        <div className="w-full max-w-md p-10 space-y-8 bg-white rounded-3xl border border-indigo-200 shadow-2xl transition-transform duration-300 hover:scale-[1.03] hover:shadow-3xl">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-700 to-pink-600 mb-6">
              Join EnigmaNote
            </h1>
            <p className="text-gray-600 text-lg font-medium">
              Sign in to start your anonymous journey
            </p>
          </div>
    
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                name="identifier"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-semibold">Email / Username</FormLabel>
                    <Input
                      {...field}
                      className="mt-2 rounded-lg border border-indigo-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                      placeholder="Enter your email or username"
                    />
                    <FormMessage className="text-red-600 mt-1" />
                  </FormItem>
                )}
              />
    
              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-semibold">Password</FormLabel>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      {...field}
                      className="mt-2 rounded-lg border border-indigo-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                    />
                    <FormMessage className="text-red-600 mt-1" />
                  </FormItem>
                )}
              />
    
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-600 via-purple-700 to-pink-600 text-white font-semibold py-3 rounded-lg shadow-md hover:from-indigo-700 hover:via-purple-800 hover:to-pink-700 transition"
              >
                Sign In
              </Button>
            </form>
          </Form>
    
          <div className="text-center mt-6 text-gray-700 font-medium">
            Not a member yet?{' '}
            <Link href="/signup" className="text-indigo-600 hover:text-indigo-800 font-semibold">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    );
    
    
}

// export default signInForm;
//
