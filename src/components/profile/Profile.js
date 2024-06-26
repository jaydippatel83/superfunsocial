'use client'
import React, { useEffect, useState } from 'react';
import PostCards from '../posts/PostCards';
import PostCardLoader from '../loader/PostCardLoader';
import StickyTabs from './StickyTabs';
import ProfileHeader from './ProfileCard';
import MutualFriends from '../sidebar/MutualFriends';
import { getFeedByHash } from '@/lib/farcaster';

const Profile = async ({ user , data, cursor}) => {
    const [casts, setCasts] = useState(data || []);
    const [loadcasts, setLoadcasts] = useState(false);
    const [endCursorcasts, setEndCursorcasts] = useState(cursor); 
   

    const loadmoreCastData = async () => {
        const req = {
            fid: user.fid,
            cursor: endCursorcasts
        }
        setLoadcasts(true);
        const data = await getFeedByHash(req)
        setEndCursorcasts(data?.next.cursor);
        setCasts([...casts, ...data?.casts]);
        setLoadcasts(false);
    };

    return (
        <main id="site__main" className="relative 2xl:ml-[--w-side]  xl:ml-[--w-side-sm] p-2.5 h-[calc(100vh-var(--m-top))] mt-[--m-top]">
            <div
                className="lg:flex 2xl:gap-12 gap-8 max-w-[1065px]"
                id="js-oversized"
            >
                <div className="max-w-[1080px] mx-auto">
                    <div className="md:w-[580px] md:max-w-[580px] mx-auto flex-1 xl:space-y-6 space-y-3 relative">
                        <ProfileHeader userData={user} />
                        <StickyTabs />
                        {
                            casts && casts.map((item, i) => <PostCards data={item} key={i} />)
                        }

                        {endCursorcasts && (
                            <div className="flex justify-center mb-3">
                                <button onClick={() => loadmoreCastData()}
                                  className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                                    {loadcasts ? <div className="w-8 h-8 border-4 border-t-blue-500 border-solid rounded-full animate-spin"></div>  : "Load More"}
                                </button>
                            </div>
                        )}

                        {/* <PostCardLoader /> */}
                    </div>
                </div>
                <MutualFriends fid={user} />
            </div>
        </main>
    );
};

export default Profile;