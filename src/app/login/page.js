'use client';
import useLocalStorage from '@/hooks/use-local-storage-state';
import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react';

const page = () => {
    const client_id = process.env.NEXT_PUBLIC_NEYNAR_CLIENT_ID;
    const [user, setUser, removeUser] = useLocalStorage("user");

    const getButton = useCallback(() => {
        return (
          <div
            className="neynar_signin text-lg "
            data-client_id={client_id}
            data-variant="neynar"
            data-theme="dark" 
            data-styles='{ "backgroundColor": "#3B82F6" }'
            data-success-callback="onSignInSuccess"
          />
        );
      }, []);

      useEffect(() => {
        let script = document.getElementById("siwn-script");
    
        if (!script) {
          script = document.createElement("script");
          script.id = "siwn-script";
          document.body.appendChild(script);
        }
    
        script.src = "https://neynarxyz.github.io/siwn/raw/1.2.0/index.js";
        script.async = true;
    
        document.body.appendChild(script);
    
        return () => {
          if (document.body && script) {
            document.body.removeChild(script);
          }
    
          let button = document.getElementById("siwn-button");
          if (button && button.parentElement) {
            button.parentElement.removeChild(button);
          }
        };
      }, []);
    
      if (!client_id) {
        throw new Error("NEXT_PUBLIC_NEYNAR_CLIENT_ID is not defined in .env");
      }
    
      useEffect(() => {
        window.onSignInSuccess = (data) => {
          setUser({
            signerUuid: data.signer_uuid,
            fid: data.fid,
          }); 
        };
    
        return () => {
          delete window.onSignInSuccess;
        };
      }, []);
  
  
    return (
      <div className="sm:flex">
        <div className="relative lg:w-[580px] md:w-96 w-full p-10 min-h-screen bg-white shadow-xl flex items-center pt-10 dark:bg-slate-900 z-10">
          <div className="w-full lg:max-w-sm mx-auto space-y-10">
            {/* logo image */}
            <Link href="#">
              <img
                src="/assets/images/icons/sfslogo.png"
                className="w-28 absolute top-10 left-10 dark:hidden"
                alt="logo"
              />
            </Link>
            <Link href="#">
              <img
                src="/assets/images/icons/sfslogo.png"
                className="w-28 absolute top-10 left-10 hidden dark:!block"
                alt="logo"
              />
            </Link>
  
            {/* title */}
            <div  >
            <div>
              <h2 className="text-2xl font-semibold mb-1.5">Sign in to get started</h2> 
            </div>
  
            {/* form */}
            <div className="col-span-2 mt-2">
                   {getButton()}
                </div>
            </div>
          </div>
        </div>
  
        {/* image slider */}
        <div className="flex-1 relative bg-primary max-md:hidden">
          <div className="relative w-full h-full" tabIndex="-1">
            <ul className="w-full h-full">
              <li className="w-full"> 
              <img src="/assets/images/icons/img-2.jpg"  alt="" class="w-full h-screen object-cover uk-animation-kenburns uk-animation-reverse uk-transform-origin-center-left"></img>
                <div className="absolute bottom-0 w-full z-10">
                  <div className="max-w-xl w-full mx-auto pb-32 px-5 z-30 relative">
                    <img className="w-12" src="/assets/images/icons/img-2.jpg" alt="Socialite html template" />
                    <h4 className="!text-white text-2xl font-semibold mt-7">Connect With Friends</h4>
                    <p className="!text-white text-lg mt-7 leading-8">
                      This phrase is more casual and playful. It suggests that you are keeping your friends updated on what’s happening in your life.
                    </p>
                  </div>
                </div>
                <div className="w-full h-96 bg-gradient-to-t from-black absolute bottom-0 left-0"></div>
              </li> 
            </ul> 
          </div>
        </div>
      </div>
    );
  };

export default page;