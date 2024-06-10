import { Inter } from "next/font/google";
import "./globals.css";

import { FarcasterContextProvider } from "@/context/farcaster";
import { AppProvider } from "@/context/AppContext";
import { PrivyProviderComponent } from "@/components/provider/provider";
import dynamic from "next/dynamic";
import { PostcardContextProvider } from "@/context/PostCardContext";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProgressBarProvider = dynamic(() => import('./ProgressBarProvider'), {
  ssr: false,
})

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SuperfunSocial",
  description: "SuperfunSocial",
};



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <ToastContainer/>
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
