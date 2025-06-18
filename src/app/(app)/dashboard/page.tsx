'use client'

import { Button } from "@/components/ui/button"
import { Message } from "@/model/User"
import { acceptMessageSchema } from "@/schemas/acceptMessageSchema"
import { ApiResponse } from "@/types/ApiResponse"
import { zodResolver } from "@hookform/resolvers/zod"
import axios, { AxiosError } from "axios"
import { useSession } from "next-auth/react"
import { useCallback, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import {toast} from 'sonner'
import {Switch} from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Loader2, RefreshCcw } from "lucide-react"
import MessageCard from "@/components/MessageCard"
import { User } from "next-auth"

export default function Page() {
  const [messages,setMessages]=useState<Message[]>([])
  const [isLoading,setIsLoading]=useState(false)
  const [isSwitchLoading,setIsSwitchLoading]=useState(false)

  const handleDeleteMessage=(messageId:string)=>{
    setMessages(messages.filter((message)=>message._id!==messageId))
  }
  const {data:session}=useSession()
  const form=useForm({
    resolver:zodResolver(acceptMessageSchema)
  })
  const {register,watch,setValue}=form;

  const acceptMessages=watch('acceptMessages')

  const fetchAcceptMessage=useCallback(async()=>{
    setIsSwitchLoading(true)
    try {
      const response=await axios.get<ApiResponse>('/api/acceptMessages')
      setValue('acceptMessages', response.data.isAcceptingMessage ?? false)
    } catch (error) {
      const axiosError=error as AxiosError<ApiResponse>;
      toast(
        <div>
          <p className="font-semibold">Error</p>
          <p className="text-sm text-muted-foreground">{axiosError.response?.data.message || "Failed to fetch message settings"}</p>
        </div>
      ),
      {
        className: "bg-destructive text-destructive-foreground"
      }
    }finally{
      setIsSwitchLoading(false)
    }
  },[setValue,toast])

  const fetchMessages=useCallback(async (refresh:boolean=false)=>{
    setIsLoading(true)
    setIsSwitchLoading(false)
    try {
      const response=await axios.get<ApiResponse>(`/api/getMessages`)
      console.log(response)
      setMessages(response.data.messages || [])
      if(refresh){
        toast(
          <div>
            <p className="font-semibold">Refreshed Messages</p>
            <p className="text-sm text-muted-foreground">Showing latest messages</p>
          </div>
        )
      }
    } catch (error) {
      const axiosError=error as AxiosError<ApiResponse>;
      toast(
        <div>
          <p className="font-semibold">Error</p>
          <p className="text-sm text-muted-foreground">{axiosError.response?.data.message || "Failed to fetch message "}</p>
        </div>
      ),
      {
        className: "bg-destructive text-destructive-foreground"
      }
    } finally{
      setIsLoading(false)
      setIsSwitchLoading(false)
    }
  },[setIsLoading,setMessages,toast])

  useEffect(()=>{
    if(!session || !session.user) return;
    fetchMessages()
    fetchAcceptMessage()
  },[session,setValue,fetchAcceptMessage,fetchMessages,toast])

  const handleSwitchChange=async()=>{
    try {
      const response=await axios.post<ApiResponse>('/api/acceptMessages',{
        acceptMessages:!acceptMessages
      })
      setValue('acceptMessages',!acceptMessages)
      toast(
        <div>
          <p className="font-semibold">{response.data.message}</p>
          
        </div>
      ),
      {
        className: "bg-destructive text-destructive-foreground"
      }
    } catch (error) {
      const axiosError=error as AxiosError<ApiResponse>;
      toast(
        <div>
          <p className="font-semibold">Error</p>
          <p className="text-sm text-muted-foreground">{axiosError.response?.data.message || "Failed to update message settings"}</p>
        </div>
      ),
      {
        className: "bg-destructive text-destructive-foreground"
      }
    }
  }
  if (!session || !session.user) {
    return <div></div>;
  }

  const {username}=session.user as User
  const baseUrl=`${window.location.protocol}//${window.location.host}`
  const profileUrl=`${baseUrl}/u/${username}`

  const copyToClipboard=()=>{
    navigator.clipboard.writeText(profileUrl)
    toast(
      <div>
        <p className="font-semibold">URL Copied</p>
        <p className="text-sm text-muted-foreground">Profile url has been copied to clipboard</p>
      </div>
    )
  }

  

  // return (
  //   <div className="my-8 mx-4 md:mx-8 lg:mx-auto p-6 bg-white rounded w-full max-w-6xl">
  //     <h1 className="text-4xl font-bold mb-4">User Dashboard</h1>

  //     <div className="mb-4">
  //       <h2 className="text-lg font-semibold mb-2">Copy Your Unique Link</h2>{' '}
  //       <div className="flex items-center">
  //         <input
  //           type="text"
  //           value={profileUrl}
  //           disabled
  //           className="input input-bordered w-full p-2 mr-2"
  //         />
  //         <Button onClick={copyToClipboard}>Copy</Button>
  //       </div>
  //     </div>

  //     <div className="mb-4">
  //       <Switch
  //         {...register('acceptMessages')}
  //         checked={acceptMessages}
  //         onCheckedChange={handleSwitchChange}
  //         disabled={isSwitchLoading}
  //       />
  //       <span className="ml-2">
  //         Accept Messages: {acceptMessages ? 'On' : 'Off'}
  //       </span>
  //     </div>
  //     <Separator />

  //     <Button
  //       className="mt-4"
  //       variant="outline"
  //       onClick={(e) => {
  //         e.preventDefault();
  //         fetchMessages(true);
  //       }}
  //     >
  //       {isLoading ? (
  //         <Loader2 className="h-4 w-4 animate-spin" />
  //       ) : (
  //         <RefreshCcw className="h-4 w-4" />
  //       )}
  //     </Button>
  //     <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
  //       {messages.length > 0 ? (
  //         messages.map((message, index) => (
  //           <MessageCard
  //             key={message._id}
  //             message={message}
  //             onMessageDelete={handleDeleteMessage}
  //           />
  //         ))
  //       ) : (
  //         <p>No messages to display.</p>
  //       )}
  //     </div>
  //   </div>
  // );
  
  return (
    <div className="my-10 mx-4 md:mx-12 lg:mx-20 p-8 bg-white rounded-3xl shadow-lg border border-gray-200 min-h-screen">
      <h1 className="text-5xl font-extrabold mb-8 bg-gradient-to-r from-indigo-600 via-purple-700 to-pink-600 bg-clip-text text-transparent">
        User Dashboard
      </h1>
  
      {/* Unique Link Section */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Copy Your Unique Link</h2>
        <div className="flex items-center gap-4">
          <input
            type="text"
            value={profileUrl}
            disabled
            className="flex-grow rounded-lg border border-indigo-300 p-4 text-gray-900 bg-indigo-50 placeholder-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-400 transition"
          />
          <Button
            onClick={copyToClipboard}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-4 rounded-lg shadow-lg transition flex items-center"
          >
            Copy
          </Button>
        </div>
      </div>
  
      {/* Accept Messages Toggle */}
      <div className="mb-8 flex items-center">
        <Switch
          {...register('acceptMessages')}
          checked={acceptMessages}
          onCheckedChange={handleSwitchChange}
          disabled={isSwitchLoading}
          className="bg-indigo-200 data-[state=checked]:bg-indigo-600"
        />
        <span className="ml-4 text-gray-700 font-medium select-none text-lg">
          Accept Messages: <span className="font-semibold">{acceptMessages ? 'On' : 'Off'}</span>
        </span>
      </div>
  
      <Separator className="my-8" />
  
      {/* Refresh Messages Button */}
      <Button
        className="mt-4 border-indigo-600 text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700 transition flex items-center justify-center px-6 py-3 rounded-lg"
        variant="outline"
        onClick={(e) => {
          e.preventDefault();
          fetchMessages(true);
        }}
        disabled={isLoading}
      >
        {isLoading ? (
          <Loader2 className="h-6 w-6 animate-spin mr-3 text-indigo-600" />
        ) : (
          <RefreshCcw className="h-6 w-6 mr-3" />
        )}
        Refresh Messages
      </Button>
  
      {/* Messages Grid */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-10">
        {messages.length > 0 ? (
          messages.map((message) => (
            <MessageCard
              key={message._id}
              message={message}
              onMessageDelete={handleDeleteMessage}
            />
          ))
        ) : (
          <p className="text-center text-gray-500 italic text-lg">No messages to display.</p>
        )}
      </div>
    </div>
  );
  
  
  
  
}

// export default page
