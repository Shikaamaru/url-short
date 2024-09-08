import Image from "next/image";
import localFont from "next/font/local";
import Loginbtn from "@/components/login-btn";
import Homepage from "@/components/homepage";
import { useSession, signIn, signOut } from "next-auth/react"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home() {
  const { data: session } = useSession()
 
  return (
    <div>
      {session ? (
        
        <Homepage />
      ) : (
        <div  className="maindiv flex items-center justify-center h-screen">
          
          <Loginbtn />
        </div>
      )}
    </div>
  );
  
}
