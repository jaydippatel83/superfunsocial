'use client';
import React, { useState } from 'react';
import { fetchFollowing, getFeed } from '@/lib/farcaster';
import Link from 'next/link';
import Followers from '../followers/Followers';
import useLocalStorage from '@/hooks/use-local-storage-state';

const FollowerTab = ({ data, cursor, filter, username }) => {
    const [activeTab, setActiveTab] = useState(filter);
    const [follower, setFollower] = useState(data || []);
    const [following, setFollowing] = useState(data || []);
    const [loader, setLoader] = useState(false);
    const [endCursor, setEndCursor] = useState(cursor);
    const [endCursorFollower, setEndCursorFollower] = useState(cursor);
    const [user, setUser, removeUser] = useLocalStorage("user");

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const loadmoreFollowing = async () => {
        setLoader(true);
        const req = {
            cursor: endCursor,
            filter: filter,
            name: username
        }
        const response = await fetchFollowing(req)
        setEndCursor(response?.next.cursor);
        setFollowing([...following, ...response?.users]);
        setLoader(false);
    };

    const loadmoreFollower = async () => {
        setLoader(true);
        const req = {
            cursor: endCursorFollower,
            filter: filter,
            name: username
        }
        const response = await fetchFollowing(req)
        setEndCursorFollower(response?.next.cursor);
        setFollower([...follower, ...response?.users]);
        setLoader(false);
    };

    return (

        <div className="flex flex-col">
            {/* <div className="flex items-center space-x-4 p-4">
                    <button className="text-xl font-semibold text-gray-700">
                        ←
                    </button>
                    <div>
                        <h1 className="text-lg font-bold">Jaydip patel</h1>
                        <p className="text-sm text-gray-500">@{username}</p>
                    </div>
                </div> */}
            <div className="flex items-center justify-between mt-3 border-gray-100 px-2 max-lg:flex-col dark:border-slate-700 sticky top-16 border bg-white dark:bg-gray-800 z-50 my-5">
                
                <nav className="flex justify-around w-full gap-0.5 rounded-xl -mb-px text-gray-600 font-medium text-[15px] dark:text-white max-md:w-full max-md:overflow-x-auto">
                    {['followers', 'following'].map((tab) => (
                        <Link href={`/${username}/${tab}`}
                            key={tab}
                            onClick={() => handleTabClick(tab)}
                            className={`inline-block py-3 leading-8 px-3.5 capitalize ${activeTab === tab
                                ? 'border-b-2 border-blue-600 text-blue-600 dark:text-blue-400'
                                : 'text-gray-600 dark:text-gray-400'
                                }`}
                        >
                            {tab}
                        </Link>
                    ))}
                </nav>
            </div>
            {activeTab === 'followers' && <div className='bg-white border border-gray-200 rounded-lg shadow-lg py-4'>
                {follower && follower.map((item) => (
                    <Followers user={item.user} uuid={user.uuid} />
                ))}
                {endCursorFollower && (
                    <div className="flex justify-center my-5">
                        <button onClick={loadmoreFollower}
                            className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                            disabled={loader}
                        >
                            {loader ? <div className="w-8 h-8 border-4 border-t-blue-500 border-solid rounded-full animate-spin"></div> : "Load More"}
                        </button>
                    </div>
                )}
            </div>}
            {activeTab === 'following' && <div className='bg-white border border-gray-200 rounded-lg shadow-lg py-4'>
                {following && following.map((item) => (
                    <Followers user={item.user} />
                ))}
                {endCursor && (
                    <div className="flex justify-center my-5">
                        <button onClick={() => loadmoreFollowing()} className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                        >
                            {loader ? <div className="w-8 h-8 border-4 border-t-blue-500 border-solid rounded-full animate-spin"></div> : "Load More"}
                        </button>
                    </div>
                )}
            </div>}
        </div>
    );
};

export default FollowerTab;
