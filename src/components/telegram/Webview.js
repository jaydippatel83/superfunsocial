'use client';
import { NeynarAuthButton, SIWN_variant } from '@neynar/react';
import { useEffect } from 'react';

const WebView = () => {
    useEffect(() => {
        const tg = window.Telegram.WebApp;
        if (tg) {
            tg.ready();
        }
    }, []);

    return (
        <div className="col-span-2 mt-2">
            <NeynarAuthButton style={{ backgroundColor: '#3B82F6', color: 'white' }} variant={SIWN_variant.FARCASTER} />
        </div>
    );
};

export default WebView;
