'use client';
import { followUser, unfollowUser, userFollowOrNot } from '@/lib/farcaster';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const Followers = ({ user, uuid }) => {
    const [isFollowing, setIsFollowing] = useState(user?.viewer_context?.following);
    const [loading, setLoading] = useState(false);  
    
    const handleFollow = async () => {
        setLoading(true);
        try {
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
        } catch (error) {
            console.error('Failed to update follow status:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-start justify-between border-gray-300 p-4 hover:bg-gray-100 cursor-pointer">
            <Link href={`/profile/${user?.fid}`} className="flex items-start align-top">
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
                    <p className="break-all">{user.profile.bio.text}</p>
                </div>
            </Link>
            <button
                onClick={handleFollow}
                className={`text-sm rounded-full py-1.5 px-4 font-semibold border  ${isFollowing ? 'bg-secondery text-black hover:text-gray-600 hover:bg-slate-200' : ' bg-blue-600 text-white   hover:bg-blue-500'}`}
                disabled={loading}
            >
                {loading ? (
                    <div className="w-4 h-4 border-4 border-t-blue-500 border-solid rounded-full animate-spin mx-auto"></div>
                ) : (
                    isFollowing ? 'Unfollow' : 'Follow'
                )}
            </button>
        </div>
    );
};

export default Followers;
