'use client';
import { followUser, unfollowUser, userFollowOrNot } from '@/lib/farcaster';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const Followers = ({ user,uuid }) => {
    const [isFollowing, setIsFollowing] = useState(false); 

    const handleGetFollow= async()=>{
        const res = await userFollowOrNot(user.fid, uuid); 
        setIsFollowing(res?.users[0]?.viewer_context?.following);
    }

    useEffect(() => {
        handleGetFollow();
    }, [user]);

    const handleFollow = async () => {
        const id = user?.fid;
        const viewer = uuid;
        let res;

        if (isFollowing) {
            res = await unfollowUser(viewer, id);
            if (res) {
                setIsFollowing(false); 
            }
        } else {
            res = await followUser(viewer, id);
            if (res) {
                setIsFollowing(true); 
            }
        }
    };

    return (
        <div className="flex items-start justify-between  border-gray-300 p-4 hover:bg-gray-100 cursor-pointer">
            <Link
                href={`/profile/${user?.fid}`}
                className="flex items-start align-top "

            > 
                <Image
                    src={user?.pfp_url}
                    alt={user.username}
                    width={48}
                    height={48}
                    className="rounded-full w-9 h-9"
                />
                <div className="ml-4">
                    <div className="flex items-center">
                        <h4 className="font-bold">{user.display_name}</h4>
                        {user.power_badge && (
                            <svg
                                className="ml-2 w-4 h-4 text-blue-500"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M10 15l-3.5-3.5 1.41-1.42L10 12.17l5.09-5.09 1.41 1.41L10 15z" />
                            </svg>
                        )}
                    </div>
                    <p className="text-gray-500">@{user.username}</p>
                    <p className='break-all'>{user.profile.bio.text}</p>
                </div>
            </Link> 
            <button onClick={handleFollow} className="text-sm rounded-full py-1.5 px-4 font-semibold bg-secondery border hover:bg-white">{isFollowing ? "Unfollow" : "Follow"}</button>
        </div>
    );
};

export default Followers;