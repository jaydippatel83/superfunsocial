import { formatNumber } from '@/lib/utils';
import Image from 'next/image';
import React from 'react';

const UserHoverCard = ({ user, isVisible }) => {
    if (!isVisible) return null; 
    return (
        <div className="absolute z-10 bg-white border border-gray-200 rounded-lg shadow-lg p-4 w-72">
            <div className="flex items-center">
                <Image width={50} height={50} src={user.pfp_url} alt={user.display_name} className="w-12 h-12 rounded-full" />
                <button className="ml-auto bg-gray-100 text-gray-700 px-2 py-1 rounded-md">Unfollow</button>
            </div>
            <div className="mt-2">
                <h3 className="font-bold text-lg">{user.display_name}</h3>
                <p className="text-gray-500">@{user.username}</p>
                <p className="text-gray-700 mt-1">{user?.profile?.bio?.text}</p>
                <div className="flex items-center mt-2 text-gray-500">
                    <span className="mr-4"><span className='text-black font-bold'>{formatNumber(user?.following_count)}</span> Following</span>
                    <span><span className='text-black font-bold'>{formatNumber(user.follower_count)}</span> Followers</span>
                </div> 
            </div>
        </div>
    );
};

export default UserHoverCard;
