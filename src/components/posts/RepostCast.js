'use client';
import getRelativeTime from '@/lib/utils';
import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import MainEmbed from './MainEmbed';

const RepostCast = ({id, hash , classId}) => {
    const [feed, setFeed] = useState(null); 

    const getFeedByHash = async () => {
        const headers = {
            accept: 'application/json', api_key: process.env.NEXT_PUBLIC_NEYNAR_API_KEY
        } 
        const url = `https://api.neynar.com/v2/farcaster/cast?identifier=${hash}&type=hash`
        try {
            const response = await axios.get(url, {
                headers
            })
            const data = response.data?.cast;
            setFeed(data); 
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        getFeedByHash();
    },[hash])

    return (
        <div className={`${classId}`}>  
            {feed && (
                <div className=" w-full  bg-white border border-gray-300 rounded-lg cursor-pointer">
                <div className="flex items-start px-4 py-3">
                  <Image
                    className="w-8 h-8 rounded-full"
                    src={feed?.author?.pfp_url}
                    alt="Profile Picture"
                    width={48}
                    height={48}
                  />
                  <div className="ml-3">
                    <div className="flex items-center">
                      <span className="font-semibold text-gray-900">{feed?.author?.display_name}</span>
                      <span className="ml-1 text-sm text-gray-500">@{feed?.author?.username} {getRelativeTime(feed?.timestamp)}</span>
                    </div>
                    <div className="mt-1 text-gray-900 break-all">
                        {feed?.text}
                    </div>
                  </div>
                </div>
                {/* <MainEmbed data={feed} lable="repost" /> */}
              </div>
            )}
        </div>
    );
};

export default RepostCast;
