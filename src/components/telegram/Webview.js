'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const WebView = () => {
  const router = useRouter();

  useEffect(() => {
    const tg = window.Telegram.WebApp;
    if (tg) {
      tg.ready();
    }
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

  useEffect(() => {
    window.onSignInSuccess = (data) => {
      router.push('/');
    };

    return () => {
      delete window.onSignInSuccess;
    };
  }, [router]);

  const handleLoginClick = () => {
    const tg = window.Telegram?.WebApp;
    const loginUrl = `https://app.neynar.com/login?client_id=3f297a64-3949-4b8f-8a82-4a6fba7c3137`;

    if (tg) {
      tg.openLink(loginUrl);
    } else {
      window.location.href = loginUrl;
    } 
    
  };

  return (
    <div className="col-span-2 mt-2">
      <button
        style={{ backgroundColor: '#3B82F6', color: 'white' }}
        onClick={handleLoginClick}
      >
        Login with Neynar
      </button>
      {/* <NeynarAuthButton style={{ backgroundColor: '#3B82F6', color: 'white' }} variant={SIWN_variant.FARCASTER} /> */}
    </div>
  );
};

export default WebView;
