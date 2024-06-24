'use client';
import React, { useEffect } from 'react';
import { NeynarAuthButton } from "@neynar/react";
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const router = useRouter();

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
    };
  }, []);

  useEffect(() => {
    window.onSignInSuccess = (data) => {
      router.push('/');
    };

    return () => {
      delete window.onSignInSuccess;
    };
  }, []);

  return (
    <div className="sm:flex">
      <div className="relative lg:w-[580px] md:w-96 w-full p-10 min-h-screen bg-white shadow-xl flex items-center pt-10 dark:bg-slate-900 z-10">
        <div className="w-full lg:max-w-sm mx-auto space-y-10">
          <h2 className="text-2xl font-semibold mb-1.5">Sign in to get started</h2>
          <div className="col-span-2 mt-2">
            <NeynarAuthButton 
              style={{ backgroundColor: '#3B82F6', color: 'white' }} 
              variant='farcaster'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
