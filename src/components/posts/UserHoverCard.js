'use client';
import { AppContext } from '@/context/AppContext';
import { followUser, unfollowUser, userFollowOrNot } from '@/lib/farcaster';
import { formatNumber } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';

const UserHoverCard = ({ user, isVisible, setIsHoverCardVisible, follow, uuid }) => {
    const appContext = useContext(AppContext);
    const { signerUuid } = appContext;

    const [isFollowing, setIsFollowing] = useState(follow);
    const [follower, setFollower] = useState(user?.follower_count);

    useEffect(() => {
        setIsFollowing(follow);
        setFollower(user?.follower_count);
    }, [follow, user?.follower_count]);

    if (!isVisible) return null;

    const handleFollow = async () => {
        const id = user?.fid;
        const viewer = uuid;
        let res;

        if (isFollowing) {
            res = await unfollowUser(viewer, id);
            if (res) {
                setIsFollowing(false);
                setFollower(follower - 1);
            }
        } else {
            res = await followUser(viewer, id);
            if (res) {
                setIsFollowing(true);
                setFollower(follower + 1);
            }
        }
    };


    return (
        <div onMouseEnter={() => setIsHoverCardVisible(true)} onMouseLeave={() => setIsHoverCardVisible(false)} className="absolute z-10 bg-white border border-gray-200 rounded-lg shadow-lg p-4 w-72">
            <div className="flex items-center">
                <Image width={50} height={50} src={user?.pfp_url} alt={user?.display_name} className="w-12 h-12 rounded-full" />
                <button onClick={handleFollow} className="ml-auto bg-gray-100 text-gray-700 px-2 py-1 rounded-md">{isFollowing ? "Unfollow" : "Follow"}</button>
            </div>
            <div className="mt-2">
                <Link href={`/profile/${user?.fid}`} className="mt-1 text-gray-900 w-8 h-8">
                    <h3 className="font-bold text-lg">{user?.display_name}</h3>
                </Link>
                <p className="text-gray-500">@{user?.username}</p>
                <p className="text-gray-700 mt-1">{user?.profile?.bio?.text}</p>
                <div className="flex items-center mt-2 text-gray-500">
                    <Link href={`/${user.username}/following`} className="mt-1 text-gray-900 ">
                        <span className="mr-4"><span className='text-black font-bold'>{formatNumber(user?.following_count)}</span> Following</span>
                    </Link>
                    <Link href={`/${user.username}/followers`} className="mt-1 text-gray-900  ">
                        <span><span className='text-black font-bold'>{formatNumber(follower)}</span> Followers</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default UserHoverCard;
