'use client'
import { useParams, useRouter } from 'next/navigation'
import {toast} from 'sonner'
import React from 'react'
import { useForm } from 'react-hook-form'
import { verifySchema } from '@/schemas/verifySchema'
import * as  z  from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import axios, { AxiosError } from 'axios'
import { ApiResponse } from '@/types/ApiResponse'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

function VerifyAccount() {
    const router=useRouter()
    const params=useParams<{username:string}>()
    // const {toast}=useToast()
    const form = useForm<z.infer<typeof verifySchema>>({
        resolver: zodResolver(verifySchema),
        defaultValues: {
          code: "",
        },
        
      });

      const onSubmit=async(data:z.infer<typeof verifySchema>)=>{
        try {
            const response=await axios.post(`/api/verifyCode`,{
                username:params.username,
                code:data.code
            })
            toast(
               <div>
                <p className="font-semibold">Success</p>
                <p className="text-sm text-muted-foreground">{response.data.message}</p>
               </div>
            )
            router.replace('/signin')

        } catch (error) {
           console.error("error in signup", error);
                 const axiosError = error as AxiosError<ApiResponse>;
                //  let errorMessage = axiosError.response?.data.message;
                 toast(
                   <div>
                     <p className="font-semibold">Error</p>
                     <p className="text-sm text-muted-foreground">{axiosError.response?.data.message}</p>
                   </div>,
                   {
                     className: "bg-destructive text-destructive-foreground",
                   }
                 );
                  
        }
      }
  // return (
  //   <div className='flex justify-center items-center min-h-screen bg-gray-100'>
  //     <div className='w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md'>
  //        <div className='text-center'>
  //           <h1 className='text-4xl font-extrabold tracking-tight lg:text-5xl mb-6 '>
  //               Verify your account
  //           </h1>
  //           <p className='mb-4'>
  //               Enter the verification code sent to your email address
  //           </p>
  //        </div>
  //        <Form {...form}>
  //        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
  //        <FormField
  //         control={form.control}
  //         name="code"
  //         render={({ field }) => (
  //           <FormItem>
  //             <FormLabel>Verification Code</FormLabel>
  //             <FormControl>
  //               <Input placeholder="code" {...field} />
  //             </FormControl>
              
  //             <FormMessage />
  //           </FormItem>
  //         )}
  //       />
  //       <Button type="submit">Submit</Button>
  //     </form>
  //   </Form>
  //     </div>
  //   </div>
  // )
  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="w-full max-w-md p-8 space-y-8 bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 rounded-2xl shadow-xl border border-purple-200">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold tracking-tight mb-4 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 text-transparent bg-clip-text">
            Verify Your Account
          </h1>
  
          <p className="text-sm text-slate-800">
            Enter the verification code sent to your email address.
          </p>
        </div>
  
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-900 font-medium">Verification Code</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter code"
                      className="bg-white/70 border border-purple-300 focus:ring-2 focus:ring-purple-400 focus:border-purple-400 text-purple-900 placeholder-purple-400"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-400 via-purple-500 to-blue-400 hover:brightness-110 text-white font-semibold shadow-md rounded-lg"
            >
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
  
  
  
}

export default VerifyAccount
