'use client' 

import { useRouter } from "next/navigation"; 
import { FarcasterContextProvider } from "@/context/farcaster";  
import dynamic from "next/dynamic"; 
import { ToastContainer } from 'react-toastify'; 
import { NeynarContextProvider, Theme } from "@neynar/react"; 
import 'react-toastify/dist/ReactToastify.css';
import "@neynar/react/dist/style.css"; 
import "./globals.css"; 

const ProgressBarProvider = dynamic(() => import('./ProgressBarProvider'), {
  ssr: false,
})


export default function RootLayout({ children }) { 
  const router = useRouter()
  return (
    <html lang="en">
      <body >
        <ToastContainer />
        <ProgressBarProvider>
          <NeynarContextProvider 
            settings={{ 
              clientId: process.env.NEXT_PUBLIC_NEYNAR_CLIENT_ID || "",
              defaultTheme: Theme.Light, 
              eventsCallbacks: {
                onAuthSuccess: (params) => {
                  if(params.user){
                    router.push('/');
                  } else{
                    router.push('/login');
                  } 
                },
                onSignout() { 
                  router.push('/login');
                },
              },
            }}
          > 
              <FarcasterContextProvider> 
                    {children} 
              </FarcasterContextProvider> 
          </NeynarContextProvider>
        </ProgressBarProvider>
      </body>
    </html>
  );
}

