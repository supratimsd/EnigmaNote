// "use client";
// import {
//   Card,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog";
// import { Button } from "./ui/button";
// import { X } from "lucide-react";
// import { Message } from "@/model/User";
// import { toast } from "sonner";
// import { ApiResponse } from "@/types/ApiResponse";
// import axios, { AxiosError } from "axios";
// import dayjs from "dayjs";

// type MessageCardProps = {
//   message: Message;
//   onMessageDelete: (messageId: string) => void;
// };
// function MessageCard({ message, onMessageDelete }: MessageCardProps) {
//   const handleDeleteConfirm = async () => {
//     try {
//       const response = await axios.delete<ApiResponse>(
//         `/api/deletemessage/${message._id}`
//       );
//       toast(response.data.message);
//       onMessageDelete(message._id);
//     } catch (error) {
//       const axiosError = error as AxiosError<ApiResponse>;
//       toast(
//         <div>
//           <p className="font-semibold">Error</p>
//           <p className="text-sm text-muted-foreground">
//             {axiosError.response?.data.message || "Failed to delete message"}
//           </p>
//         </div>,
//         {
//           className: "bg-destructive text-destructive-foreground",
//         }
//       );
//     }
//   };

//   return (
//     <Card className="bg-gradient-to-br from-violet-100 via-pink-100 to-blue-100 text-gray-800 shadow-md rounded-xl transition-all duration-300 hover:shadow-lg border border-violet-200">
//       <CardHeader className="p-5">
//         <div className="flex justify-between items-start">
//           <CardTitle className="text-lg font-semibold leading-snug">
//             {message.content}
//           </CardTitle>
//           <AlertDialog>
//             <AlertDialogTrigger asChild>
//               <Button
//                 size="icon"
//                 variant="ghost"
//                 className="bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-600 border border-red-200 transition"
//               >
//                 <X className="w-5 h-5" />
//               </Button>
//             </AlertDialogTrigger>
//             <AlertDialogContent className="bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 text-gray-800 rounded-xl shadow-xl border border-purple-200">
//               <AlertDialogHeader>
//                 <AlertDialogTitle className="text-xl font-bold text-purple-900">
//                   Are you absolutely sure?
//                 </AlertDialogTitle>
//                 <AlertDialogDescription className="text-sm text-purple-800 mt-1">
//                   This action cannot be undone. It will permanently delete this
//                   message.
//                 </AlertDialogDescription>
//               </AlertDialogHeader>

//               <AlertDialogFooter className="mt-4">
//                 <AlertDialogCancel className="bg-white text-gray-700 hover:bg-gray-100 border border-gray-300 shadow-sm transition">
//                   Cancel
//                 </AlertDialogCancel>
//                 <AlertDialogAction
//                   onClick={handleDeleteConfirm}
//                   className="bg-red-500 hover:bg-red-600 text-white shadow-sm transition"
//                 >
//                   Continue
//                 </AlertDialogAction>
//               </AlertDialogFooter>
//             </AlertDialogContent>
//           </AlertDialog>
//         </div>
//         <div className="text-xs text-gray-600 mt-2">
//           {dayjs(message.createdAt).format("MMM D, YYYY h:mm A")}
//         </div>
//       </CardHeader>
//     </Card>
//   );
// }

// export default MessageCard;



"use client";
import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import { Message } from "@/model/User";
import { toast } from "sonner";
import { ApiResponse } from "@/types/ApiResponse";
import axios, { AxiosError } from "axios";
import dayjs from "dayjs";

type MessageCardProps = {
  message: Message;
  onMessageDelete: (messageId: string) => void;
};

function MessageCard({ message, onMessageDelete }: MessageCardProps) {
  const handleDeleteConfirm = async () => {
    try {
      const response = await axios.delete<ApiResponse>(
        `/api/deletemessage/${message._id}`
      );
      toast(response.data.message);
      onMessageDelete(message._id);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast(
        <div>
          <p className="font-semibold">Error</p>
          <p className="text-sm text-muted-foreground">
            {axiosError.response?.data.message || "Failed to delete message"}
          </p>
        </div>,
        {
          className: "bg-destructive text-destructive-foreground",
        }
      );
    }
  };

  return (
    <Card className="bg-gradient-to-br from-violet-100 via-pink-100 to-blue-100 text-gray-800 shadow-md rounded-xl transition-all duration-300 hover:shadow-lg border border-violet-200">
      <CardHeader className="p-5">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold leading-snug">
            {message.content}
          </CardTitle>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                className="bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-600 border border-red-200 transition"
              >
                <X className="w-5 h-5" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 text-gray-800 rounded-xl shadow-xl border border-purple-200">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-xl font-bold text-purple-900">
                  Are you absolutely sure?
                </AlertDialogTitle>
                <AlertDialogDescription className="text-sm text-purple-800 mt-1">
                  This action cannot be undone. It will permanently delete this
                  message.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter className="mt-4">
                <AlertDialogCancel className="bg-white text-gray-700 hover:bg-gray-100 border border-gray-300 shadow-sm transition">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDeleteConfirm}
                  className="bg-red-500 hover:bg-red-600 text-white shadow-sm transition"
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        <div className="text-xs text-gray-600 mt-2">
          {dayjs(message.createdAt).format("MMM D, YYYY h:mm A")}
        </div>
      </CardHeader>
    </Card>
  );
}

export default MessageCard;