"use client";
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import messages from "@/messages.json";

function Home() {
  // return (
  //   <>
  //     <main className="flex-grow flex flex-col items-center justify-center px-4 md:px-24 py-12 ">
  //       <section className="text-center mb-8 md:mb-12">
  //         <h1 className="text-3xl md:text-5xl font-bold">
  //           Lessss go with EnigmaNote!!!!
  //         </h1>
  //         <p className="mt-3 md:mt-4 text-base md:text-lg">
  //           Explore the power of EnigmaNote-where your identity remains hidden
  //         </p>
  //       </section>
  //       <Carousel
  //         plugins={[Autoplay({ delay: 5000 })]}
  //         className="w-full max-w-xs"
  //       >
  //         <CarouselContent>
  //           {messages.map((message, index) => (
  //             <CarouselItem key={index}>
  //               <div className="p-1">
  //                 <Card>
  //                   <CardHeader>{message.title}</CardHeader>
  //                   <CardContent className="flex aspect-square items-center justify-center p-6">
  //                     <span className="text-lg font-semibold">
  //                       {message.content}
  //                     </span>
  //                   </CardContent>
  //                 </Card>
  //               </div>
  //             </CarouselItem>
  //           ))}
  //         </CarouselContent>

  //         <CarouselPrevious />
  //         <CarouselNext />
  //       </Carousel>
  //     </main>
  //     <footer className="text-center bg-gray-900 text-white">
  //       © 2025 EnigmaNote. All rights reserved.
  //     </footer>
  //   </>
  // );
  return (
    <>
      <main className="min-h-screen flex flex-col items-center justify-center px-4 md:px-20 py-16 bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 text-gray-800">
        <section className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 bg-clip-text text-transparent">
            Let’s go with EnigmaNote 🧬 
            
          </h1>
          <p className="mt-4 md:mt-6 text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
            Explore the power of EnigmaNote — where your identity remains hidden and your voice shines bright.
          </p>
        </section>
  
        <Carousel
          plugins={[Autoplay({ delay: 4000 })]}
          className="w-full max-w-md"
        >
          <CarouselContent>
            {messages.map((message, index) => (
              <CarouselItem key={index}>
                <div className="p-2">
                  <Card className="shadow-xl rounded-2xl border-2 border-white bg-gradient-to-tr from-pink-200 via-purple-200 to-blue-200 transition-all duration-300 hover:scale-[1.02]">
                    <CardHeader className="text-purple-800 text-center font-bold text-lg border-b border-white bg-white/60 backdrop-blur px-6 py-4 rounded-t-2xl">
                      {message.title}
                    </CardHeader>
                    <CardContent className="flex aspect-square items-center justify-center p-6 text-center">
                      <span className="text-base md:text-lg text-gray-800 font-medium">
                        {message.content}
                      </span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
  
          <CarouselPrevious className="hover:scale-105 hover:bg-pink-200 transition-transform" />
          <CarouselNext className="hover:scale-105 hover:bg-blue-200 transition-transform" />
        </Carousel>
      </main>
  
      <footer className="text-center py-6 bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 text-sm md:text-base text-white tracking-wide">
        © {new Date().getFullYear()} <span className="font-semibold">EnigmaNote</span>. All rights reserved.
      </footer>
    </>
  );
  
  
}

export default Home;
