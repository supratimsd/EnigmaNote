// "use client";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import * as z from "zod";
// import Link from "next/link";
// import { useEffect, useState } from "react";
// import {  useDebounceCallback} from "usehooks-ts";
// import { toast } from "sonner";
// import { useRouter } from "next/navigation";
// import { signUpSchema } from "@/schemas/signUpSchema";
// // import { set } from "mongoose";
// import axios, { AxiosError } from "axios";
// import { ApiResponse } from "@/types/ApiResponse";
// import {
//   Form,
//   // FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Loader2 } from "lucide-react";

// export default function SignUpForm() {
//   const [username, setUsername] = useState("");
//   const [usernameMessage, setUsernameMessage] = useState("");
//   const [isCheckingUsername, setIsCheckingUsername] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const debounced = useDebounceCallback(setUsername, 2000);
//   // toast("Event has been created.");
//   const router = useRouter();
//   const form = useForm<z.infer<typeof signUpSchema>>({
//     resolver: zodResolver(signUpSchema),
//     defaultValues: {
//       username: "",
//       email: "",
//       password: "",
//     },
//   });

//   useEffect(() => {
//     const checkUsernameUnique = async () => {
//       if (username) {
//         setIsCheckingUsername(true);
//         setUsernameMessage("Checking username...");
//         try {
//           const response = await axios.get<ApiResponse>(
//             `/api/checkUsernameUnique?username=${username}`
//           );
//         //   console.log(response.data.message);
//           setUsernameMessage(response.data.message);
//         } catch (error) {
//           const axiosError = error as AxiosError<ApiResponse>;
//           setUsernameMessage(
//             axiosError.response?.data.message ?? "failed to check username"
//           );
//         } finally {
//           setIsCheckingUsername(false);
//         }
//       }
//     };
//     checkUsernameUnique();
//   }, [username]);

//   const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
//     setIsSubmitting(true);
//     try {
//       const response = await axios.post<ApiResponse>("/api/signUp", data);
//       toast(
//         <div>
//           <p className="font-semibold">Success</p>
//           <p className="text-sm text-muted-foreground">
//             {response.data.message}
//           </p>
//         </div>
//       );
//       router.replace(`/verify/${username}`);
//       setIsSubmitting(false);
//     } catch (error) {
//       console.error("error in signup", error);
//       const axiosError = error as AxiosError<ApiResponse>;
//       let errorMessage = axiosError.response?.data.message;
//       toast(
//         <div>
//           <p className="font-semibold">Sign up failed</p>
//           <p className="text-sm text-muted-foreground">{errorMessage}</p>
//         </div>,
//         {
//           className: "bg-destructive text-destructive-foreground",
//         }
//       );
//       setIsSubmitting(false);
//     }
//   };

  
//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 px-4">
//       <div className="w-full max-w-md p-10 space-y-8 bg-white rounded-3xl border border-indigo-200 shadow-2xl transition-transform duration-300 hover:scale-[1.02] hover:shadow-3xl">
//         <div className="text-center">
//           <h1 className="text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-700 to-pink-600 mb-6">
//             Join EnigmaNote
//           </h1>
//           <p className="text-gray-600 text-lg font-medium">
//             Sign up to start your anonymous journey
//           </p>
//         </div>
  
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//             {/* Username Field */}
//             <FormField
//               control={form.control}
//               name="username"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel className="text-gray-700 font-semibold">Username</FormLabel>
//                   <div className="relative">
//                     <Input
//                       {...field}
//                       placeholder="Choose a unique username"
//                       className="mt-2 rounded-lg border border-indigo-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
//                       onChange={(e) => {
//                         field.onChange(e);
//                         setUsername(e.target.value);
//                       }}
//                     />
//                     {isCheckingUsername && (
//                       <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-indigo-500 animate-spin" />
//                     )}
//                   </div>
//                   {!isCheckingUsername && usernameMessage && (
//                     <p
//                       className={`text-sm mt-1 ${
//                         usernameMessage === 'Username is unique'
//                           ? 'text-green-500'
//                           : 'text-red-500'
//                       }`}
//                     >
//                       {usernameMessage}
//                     </p>
//                   )}
//                   <FormMessage className="text-red-600 mt-1" />
//                 </FormItem>
//               )}
//             />
  
//             {/* Email Field */}
//             <FormField
//               control={form.control}
//               name="email"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel className="text-gray-700 font-semibold">Email</FormLabel>
//                   <Input
//                     {...field}
//                     placeholder="Enter your email"
//                     className="mt-2 rounded-lg border border-indigo-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
//                   />
//                   <p className="text-gray-400 text-sm mt-1">
//                     We’ll send you a verification code
//                   </p>
//                   <FormMessage className="text-red-600 mt-1" />
//                 </FormItem>
//               )}
//             />
  
//             {/* Password Field */}
//             <FormField
//               control={form.control}
//               name="password"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel className="text-gray-700 font-semibold">Password</FormLabel>
//                   <Input
//                     type="password"
//                     placeholder="Create a strong password"
//                     {...field}
//                     className="mt-2 rounded-lg border border-indigo-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
//                   />
//                   <FormMessage className="text-red-600 mt-1" />
//                 </FormItem>
//               )}
//             />
  
//             {/* Submit Button */}
//             <Button
//               type="submit"
//               disabled={isSubmitting}
//               className="w-full bg-gradient-to-r from-indigo-600 via-purple-700 to-pink-600 text-white font-semibold py-3 rounded-lg shadow-md hover:from-indigo-700 hover:via-purple-800 hover:to-pink-700 transition"
//             >
//               {isSubmitting ? (
//                 <>
//                   <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
//                 </>
//               ) : (
//                 'Sign Up'
//               )}
//             </Button>
//           </form>
//         </Form>
  
//         {/* Footer */}
//         <div className="text-center mt-6 text-gray-700 font-medium">
//           Already a member?{' '}
//           <Link
//             href="/signin"
//             className="text-indigo-600 hover:text-indigo-800 font-semibold transition"
//           >
//             Sign in
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
  
// }




"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { useEffect, useState } from "react";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { signUpSchema } from "@/schemas/signUpSchema";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function SignUpForm() {
  const [username, setUsername] = useState("");
  const [usernameMessage, setUsernameMessage] = useState("");
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    const checkUsernameUnique = async () => {
      if (username) {
        setIsCheckingUsername(true);
        setUsernameMessage("Checking username...");
        try {
          const response = await axios.get<ApiResponse>(
            `/api/checkUsernameUnique?username=${username}`
          );
          setUsernameMessage(response.data.message);
        } catch (error) {
          const axiosError = error as AxiosError<ApiResponse>;
          setUsernameMessage(
            axiosError.response?.data.message ?? "failed to check username"
          );
        } finally {
          setIsCheckingUsername(false);
        }
      }
    };
    checkUsernameUnique();
  }, [username]);

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post<ApiResponse>("/api/signUp", data);
      toast(
        <div>
          <p className="font-semibold">Success</p>
          <p className="text-sm text-muted-foreground">
            {response.data.message}
          </p>
        </div>
      );
      router.replace(`/verify/${username}`);
      setIsSubmitting(false);
    } catch (error) {
      console.error("error in signup", error);
      const axiosError = error as AxiosError<ApiResponse>;
      const errorMessage = axiosError.response?.data.message;
      toast(
        <div>
          <p className="font-semibold">Sign up failed</p>
          <p className="text-sm text-muted-foreground">{errorMessage}</p>
        </div>,
        {
          className: "bg-destructive text-destructive-foreground",
        }
      );
      setIsSubmitting(false);
    }
  };

  
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 px-4">
      <div className="w-full max-w-md p-10 space-y-8 bg-white rounded-3xl border border-indigo-200 shadow-2xl transition-transform duration-300 hover:scale-[1.02] hover:shadow-3xl">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-700 to-pink-600 mb-6">
            Join EnigmaNote
          </h1>
          <p className="text-gray-600 text-lg font-medium">
            Sign up to start your anonymous journey
          </p>
        </div>
  
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Username Field */}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-semibold">Username</FormLabel>
                  <div className="relative">
                    <Input
                      {...field}
                      placeholder="Choose a unique username"
                      className="mt-2 rounded-lg border border-indigo-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                      onChange={(e) => {
                        field.onChange(e);
                        setUsername(e.target.value);
                      }}
                    />
                    {isCheckingUsername && (
                      <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-indigo-500 animate-spin" />
                    )}
                  </div>
                  {!isCheckingUsername && usernameMessage && (
                    <p
                      className={`text-sm mt-1 ${
                        usernameMessage === 'Username is unique'
                          ? 'text-green-500'
                          : 'text-red-500'
                      }`}
                    >
                      {usernameMessage}
                    </p>
                  )}
                  <FormMessage className="text-red-600 mt-1" />
                </FormItem>
              )}
            />
  
            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-semibold">Email</FormLabel>
                  <Input
                    {...field}
                    placeholder="Enter your email"
                    className="mt-2 rounded-lg border border-indigo-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  />
                  <p className="text-gray-400 text-sm mt-1">
                    We'll send you a verification code
                  </p>
                  <FormMessage className="text-red-600 mt-1" />
                </FormItem>
              )}
            />
  
            {/* Password Field */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-semibold">Password</FormLabel>
                  <Input
                    type="password"
                    placeholder="Create a strong password"
                    {...field}
                    className="mt-2 rounded-lg border border-indigo-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  />
                  <FormMessage className="text-red-600 mt-1" />
                </FormItem>
              )}
            />
  
            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-indigo-600 via-purple-700 to-pink-600 text-white font-semibold py-3 rounded-lg shadow-md hover:from-indigo-700 hover:via-purple-800 hover:to-pink-700 transition"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                </>
              ) : (
                'Sign Up'
              )}
            </Button>
          </form>
        </Form>
  
        {/* Footer */}
        <div className="text-center mt-6 text-gray-700 font-medium">
          Already a member?{' '}
          <Link
            href="/signin"
            className="text-indigo-600 hover:text-indigo-800 font-semibold transition"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}