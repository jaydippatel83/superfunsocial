'use client' 

import { useRouter } from "next/navigation"; 
import { FarcasterContextProvider } from "@/context/farcaster";  
import dynamic from "next/dynamic"; 
import { ToastContainer } from 'react-toastify'; 
import { NeynarContextProvider, Theme } from "@neynar/react"; 
import 'react-toastify/dist/ReactToastify.css';
import "@neynar/react/dist/style.css"; 
import "./globals.css"; 
import { useEffect } from "react";
import { initTelegram } from "@/lib/farcaster";
import Script from "next/script";

const ProgressBarProvider = dynamic(() => import('./ProgressBarProvider'), {
  ssr: false,
})

// `https://api.telegram.org/bot${process.env.NEXT_PUBLIC_TG_TOKEN}/setWebhook?url=https://demo.superfun.social/api/telegram`


export default function RootLayout({ children }) { 
  const router = useRouter()

  useEffect(() => { 
    initTelegram()
  }, []);

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
      <Script src="https://telegram.org/js/telegram-web-app.js"></Script>
    </html>
  );
}

