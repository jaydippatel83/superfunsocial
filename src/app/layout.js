'use client' 
import "./globals.css"; 
import { useRouter } from "next/navigation"; 
import { FarcasterContextProvider } from "@/context/farcaster";
import { AppProvider } from "@/context/AppContext";
import { PrivyProviderComponent } from "@/components/provider/provider";
import dynamic from "next/dynamic";
import { PostcardContextProvider } from "@/context/PostCardContext";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "@neynar/react/dist/style.css"; 
import { NeynarContextProvider, Theme } from "@neynar/react"; 

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
                onAuthSuccess: () => {
                  router.push('/');
                },
                onSignout() { 
                  router.push('/login');
                },
              },
            }}
          >
            <PrivyProviderComponent>
              <FarcasterContextProvider>
                <PostcardContextProvider>
                  <AppProvider>
                    {children}
                  </AppProvider>
                </PostcardContextProvider>
              </FarcasterContextProvider>
            </PrivyProviderComponent>
          </NeynarContextProvider>
        </ProgressBarProvider>
      </body>
    </html>
  );
}

