'use client';
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const Friends = ({ fid, login }) => { 
    const [followers, setFollowers] = useState(null);

    const getFriendsById = async () => {
        const headers = {
            accept: 'application/json', api_key: process.env.NEXT_PUBLIC_NEYNAR_API_KEY
        }
        const url = `https://api.neynar.com/v2/farcaster/followers/relevant?target_fid=${fid.fid}&viewer_fid=${login}`
        try {
            const response = await axios.get(url, {
                headers
            })
            const data = response.data?.top_relevant_followers_hydrated;
            setFollowers(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getFriendsById();
    }, [fid])

    return (
        <div className="box p-5 px-6">

            <div className="flex items-ce justify-between text-black dark:text-white">
                <h3 className="font-bold text-lg">Mutual Friends
                    {/* <span className="block text-sm text-gray-500 mt-0. font-normal dark:text-white"> 3489 Friends </span> */}
                </h3>
                <Link href={`/${fid.username}-${login}/followers`} className="text-sm text-blue-500"> See All</Link>
            </div>

            <div className="grid grid-cols-3 gap-2 gap-y-5 text-center text-sm mt-4 mb-2">
                {
                    followers && followers.map((user) => { 
                        return (
                            <Link key={user.user.fid} href={`/profile/${user.user.fid}`}>
                                <div className="relative w-full aspect-square rounded-lg overflow-hidden">
                                    <img src={user.user.pfp_url} alt="" className="object-cover w-full h-full inset-0" />
                                </div>
                                <div className="mt-2 line-clamp-1">{user.user.display_name}</div>
                            </Link>
                        )
                    })
                } 
            </div> 

        </div>
    );
};

export default Friends;