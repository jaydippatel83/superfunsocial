 
'use client'
import { Inter } from "next/font/google";
import "./globals.css";

import { useRouter } from "next/navigation";
import { useEffect, useContext } from "react";
import { FarcasterContextProvider } from "@/context/farcaster";
import { AppProvider } from "@/context/AppContext";
import { PrivyProviderComponent } from "@/components/provider/provider";
import dynamic from "next/dynamic";
import { PostcardContextProvider } from "@/context/PostCardContext";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useLocalStorage from '@/hooks/use-local-storage-state';

const ProgressBarProvider = dynamic(() => import('./ProgressBarProvider'), {
  ssr: false,
}) 
 

export default function RootLayout({ children }) {
  const router = useRouter();
  const [user, setUser, removeUser] = useLocalStorage("user");

  useEffect(() => {
    // Function to check if the user is logged in
    const checkUserLoggedIn = () => {
      if (!user) {
        router.push('/login');
      } else {
        router.push('/');
      }
    };

    checkUserLoggedIn();
  }, [user, router]);

  return (
    <html lang="en">
      <body >
        <ToastContainer />
        <ProgressBarProvider>
          <PrivyProviderComponent>
            <FarcasterContextProvider>
              <PostcardContextProvider>
                <AppProvider>
                  {children}
                </AppProvider>
              </PostcardContextProvider>
            </FarcasterContextProvider>
          </PrivyProviderComponent>
        </ProgressBarProvider>
      </body>
    </html>
  );
}

