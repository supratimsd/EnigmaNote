import Navbar from "@/components/Navbar";
import { GoogleAnalytics } from '@next/third-parties/google'
// import { SessionProvider } from "next-auth/react";
// import { Providers } from "./providers";
interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    
    <div className="flex flex-col min-h-screen">
      <Navbar />
      {children}
      <GoogleAnalytics gaId="G-60V96XTBM0" />
    </div>
     
  );
}
