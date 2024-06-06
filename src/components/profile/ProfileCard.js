// components/ProfileHeader.js
import { formatNumber } from '@/lib/utils';
import Image from 'next/image';

const ProfileHeader = ({ user }) => {
  return (
    <div className="p-4   md:mt-5 bg-white dark:bg-gray-800 shadow   border-t border-gray-100 dark:border-slate-700"> 
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
      <div className='items-center space-x-4'>
      <p className="mt-1">{user.profile.bio.text}</p>
            <div className="flex items-center space-x-2 mt-1 text-gray-500">
              <span>{formatNumber(user.following_count)} Following</span>
              <span>{formatNumber(user.follower_count)} Followers</span>
              {/* <span>📍 {user.location}</span> */}
            </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
