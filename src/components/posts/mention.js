'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import UserHoverCard from './UserHoverCard';
import { userFollowOrNot } from '@/lib/farcaster'; 
import { useNeynarContext } from '@neynar/react';

const MentionComponent = ({ data }) => {
  const [isHoverCardVisible, setIsHoverCardVisible] = useState(false);
  const [follow, setFollow] = useState(false);
 const {user}= useNeynarContext()
  const [hoverData, setHoverData] = useState(null);

  const parseText = (text) => {
    const parts = text.split(/(@[\w.-]+)/g);
    return parts.map((part, index) => {
      if (part.startsWith('@')) {
        const username = part.substring(1);
        const userData = data?.mentioned_profiles?.find((profile) => profile.username === username);
        return (
         <span className='relative'>
           <span
            key={index}
            className="text-blue-500 cursor-pointer"
            onMouseEnter={(e) => handleMouseEnter(e, userData)}
            onMouseLeave={handleMouseLeave}
          >
            {part} 
          </span>
          {
            hoverData && hoverData.username === username &&<UserHoverCard
                 userData={hoverData}
                 follow={follow}
                 isVisible={isHoverCardVisible}
                 setIsHoverCardVisible={setIsHoverCardVisible}
                 uuid={user?.signer_uuid}
                 mention={true}
               />
         }
         </span>
        );
      } else {
        return <span key={index}>{part}</span>;
      }
    });
  };

  const handleMouseEnter = async (e, userData) => { 
    setHoverData(userData);
    const fid = userData?.fid;
    const viewer = user?.fid;
    setIsHoverCardVisible(true);
    const res = await userFollowOrNot(fid, viewer);
    setFollow(res?.users[0]?.viewer_context?.following);
  };

  const handleMouseLeave = () => {
    setIsHoverCardVisible(false);
  };

  return (
    <div className=" sm:px-4 p-2.5 pt-0 relative">
      <p className="font-normal cursor-pointer ">
        <Link href={`/${data?.author?.username}/${data?.hash}`} className="break-all " >
          {parseText(data?.text)}
        </Link> 
      </p>
    </div>
  );
};

export default MentionComponent;
