'use client';

import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CardHeader, CardContent, Card } from '@/components/ui/card';
import { useCompletion } from '@ai-sdk/react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { toast } from "sonner"
import * as z from 'zod';
import { ApiResponse } from '@/types/ApiResponse';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { messageSchema } from '@/schemas/messageSchema';

const specialChar = '||';

const parseStringMessages = (messageString: string): string[] => {
  return messageString.split(specialChar);
};

const initialMessageString =
  "What's your favorite movie?||Do you have any pets?||What's your dream job?";

export default function SendMessage() {
  const params = useParams<{ username: string }>();
  const username = params.username;

  const {
    complete,
    completion,
    isLoading: isSuggestLoading,
    error,
  } = useCompletion({
    api: '/api/suggestMessages',
    initialCompletion: initialMessageString,
  });

  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
  });

  const messageContent = form.watch('content');

  const handleMessageClick = (message: string) => {
    form.setValue('content', message);
  };

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: z.infer<typeof messageSchema>) => {
    setIsLoading(true);
    try {
      const response = await axios.post<ApiResponse>('/api/sendMessage', {
        ...data,
        username,
      });

      toast(<div>
        <p className="font-semibold">{response.data.message}</p>
        
      </div>,
      {
        className: "bg-destructive text-default-foreground",
      });
      form.reset({ ...form.getValues(), content: '' });
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast(<div>
        <p className="font-semibold">Error</p>
        <p className="text-sm text-muted-foreground">
          {axiosError.response?.data.message || "Failed to sent message"}
        </p>
      </div>,
      {
        className: "bg-destructive text-destructive-foreground"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSuggestedMessages = async () => {
    try {
      complete('');
    } catch (error) {
      console.error('Error fetching messages:', error);
      // Handle error appropriately
    }
  };

  // return (
  //   <div className="container mx-auto my-8 p-6 bg-white rounded max-w-4xl">
  //     <h1 className="text-4xl font-bold mb-6 text-center">
  //       Public Profile Link
  //     </h1>
  //     <Form {...form}>
  //       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
  //         <FormField
  //           control={form.control}
  //           name="content"
  //           render={({ field }) => (
  //             <FormItem>
  //               <FormLabel>Send Anonymous Message to @{username}</FormLabel>
  //               <FormControl>
  //                 <Textarea
  //                   placeholder="Write your anonymous message here"
  //                   className="resize-none"
  //                   {...field}
  //                 />
  //               </FormControl>
  //               <FormMessage />
  //             </FormItem>
  //           )}
  //         />
  //         <div className="flex justify-center">
  //           {isLoading ? (
  //             <Button disabled>
  //               <Loader2 className="mr-2 h-4 w-4 animate-spin" />
  //               Please wait
  //             </Button>
  //           ) : (
  //             <Button type="submit" disabled={isLoading || !messageContent}>
  //               Send It
  //             </Button>
  //           )}
  //         </div>
  //       </form>
  //     </Form>

  //     <div className="space-y-4 my-8">
  //       <div className="space-y-2">
  //         <Button
  //           onClick={fetchSuggestedMessages}
  //           className="my-4"
  //           disabled={isSuggestLoading}
  //         >
  //           Suggest Messages
  //         </Button>
  //         <p>Click on any message below to select it.</p>
  //       </div>
  //       <Card>
  //         <CardHeader>
  //           <h3 className="text-xl font-semibold">Messages</h3>
  //         </CardHeader>
  //         <CardContent className="flex flex-col space-y-4">
  //           {error ? (
  //             <p className="text-red-500">{error.message}</p>
  //           ) : (
  //             parseStringMessages(completion).map((message, index) => (
  //               <Button
  //                 key={index}
  //                 variant="outline"
  //                 className="mb-2"
  //                 onClick={() => handleMessageClick(message)}
  //               >
  //                 {message}
  //               </Button>
  //             ))
  //           )}
  //         </CardContent>
  //       </Card>
  //     </div>
  //     <Separator className="my-6" />
  //     <div className="text-center">
  //       <div className="mb-4">Get Your Message Board</div>
  //       <Link href={'/signup'}>
  //         <Button>Create Your Account</Button>
  //       </Link>
  //     </div>
  //   </div>
  // );

  return (
    <div className="container mx-auto my-12 px-6 py-10 bg-white rounded-2xl shadow-xl max-w-4xl">
      <h1 className="text-4xl font-extrabold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500">
        Public Profile Link
      </h1>
  
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold text-gray-700">
                  Send an Anonymous Message to{' '}
                  <span className="text-purple-600">@{username}</span>
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Write your anonymous message here..."
                    className="resize-none rounded-md border border-gray-300 focus:ring-purple-600 focus:border-purple-600 min-h-[120px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-center">
            {isLoading ? (
              <Button
                disabled
                className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-6 py-2"
              >
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={isLoading || !messageContent}
                className="bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:from-purple-700 hover:to-blue-600 transition-colors px-6 py-2"
              >
                Send It
              </Button>
            )}
          </div>
        </form>
      </Form>
  
      <div className="space-y-6 mt-10">
        <div className="text-center">
          <Button
            onClick={fetchSuggestedMessages}
            disabled={isSuggestLoading}
            className="bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600 px-5 py-2"
          >
            Suggest Messages
          </Button>
          <p className="text-sm text-gray-600 mt-2">
            Click any message below to auto-fill the text box.
          </p>
        </div>
  
        <Card className="bg-gradient-to-b from-white via-gray-50 to-white border border-gray-200 shadow-sm">
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-800">Suggestions</h3>
          </CardHeader>
          <CardContent className="flex flex-col space-y-3">
            {error ? (
              <p className="text-red-500">{error.message}</p>
            ) : (
              parseStringMessages(completion).map((message, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="text-left whitespace-normal break-words border-purple-300 hover:border-purple-500"
                  onClick={() => handleMessageClick(message)}
                >
                  {message}
                </Button>
              ))
            )}
          </CardContent>
        </Card>
      </div>
  
      <Separator className="my-10" />
  
      <div className="text-center">
        <p className="text-gray-700 mb-4 text-base font-medium">
          Want your own anonymous message board?
        </p>
        <Link href="/signup">
          <Button className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-6 py-2 rounded-md hover:from-purple-700 hover:to-blue-600 transition-all shadow-md">
            Create Your Account
          </Button>
        </Link>
      </div>
    </div>
  );
  
  
}