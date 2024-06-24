'use client';
import { AppContext } from '@/context/AppContext';
import { formatNumber } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { useContext } from 'react';

const ProfileHeader = ({ user }) => {
  const appContext = useContext(AppContext);
  const {fid}= appContext;
  return (
    <div className="p-4 md:mt-5 bg-white dark:bg-gray-800 shadow   border-t border-gray-100 dark:border-slate-700">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Image
            src={user.pfp_url}
            alt={user.username}
            width={64}
            height={64}
            className="rounded-full w-20 h-20"
          />
          <div>
            <h1 className="text-lg font-bold">{user.display_name}</h1>
            <p className="text-sm text-gray-500">@{user.username}</p>
          </div>
        </div>
        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full">
          Edit Profile
        </button>
      </div>
      <div className='items-center '>
        <p className="mt-1">{user.profile.bio.text}</p>
        <div className="flex items-center mt-2 text-gray-500">
          <Link href={`/${user.username}-${fid}/following`} className="mt-1 text-gray-900 ">
            <span className="mr-4"><span className='text-black font-bold'>{formatNumber(user?.following_count)}</span> Following</span>
          </Link>
          <Link href={`/${user.username}-${fid}/followers`} className="mt-1 text-gray-900  ">
            <span><span className='text-black font-bold'>{formatNumber(user?.follower_count)}</span> Followers</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
