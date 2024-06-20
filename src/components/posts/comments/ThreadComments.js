'use client';
import React, {  useState } from 'react';
import { IonIcon } from '@ionic/react';
import { ellipsisHorizontal  } from 'ionicons/icons';
import getRelativeTime from '@/lib/utils';
import UserHoverCard from '../UserHoverCard';
import CommentEmbed from './CommentEmbed'; 
import Menu from '../Menu'; 
import { userFollowOrNot } from '@/lib/farcaster';
import { useNeynarContext } from '@neynar/react';
import MentionComponent from '../mention';
 

const ThreadComments = ({ comment }) => { 
    const [follow, setFollow]= useState();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isHoverCardVisible, setIsHoverCardVisible] = useState(false);
const {user}= useNeynarContext();

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleMouseEnter = async(e) => {
        e.stopPropagation();
        const fid = comment?.author?.fid;
        const viewer = user?.fid;
        setIsHoverCardVisible(true);
        const res = await userFollowOrNot(fid, viewer);
        setFollow(res.users[0].viewer_context.following); 
    };

    const handleMouseLeave = () => {
        setIsHoverCardVisible(false);
    };
    return (
        <div className={`bg-white`}>
            <div className="flex items-start">
                <a href="#" className='relative' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                    <img src={comment?.author?.pfp_url} alt="" className="w-9 h-9 rounded-full" />
                </a>
                <div className="flex-1 ml-2">
                    <div className="flex items-center justify-between relative">
                        <div>
                            <div className="flex items-center">
                                <a href="#" className='relative flex items-center'>
                                    <h4 className="text-black dark:text-white font-bold" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                                        {comment?.author?.display_name}
                                    </h4>
                                </a>
                                <div className="flex items-center">
                                    <span className="text-sm text-gray-500"> @{comment?.author?.username} <span className="text-gray-500 mx-1">|</span> {getRelativeTime(comment?.timestamp)}</span>
                                </div>
                            </div>
                            <UserHoverCard userData={comment?.author} isVisible={isHoverCardVisible} setIsHoverCardVisible={setIsHoverCardVisible} follow={follow} uuid={user?.signerUuid} />
                        </div>
                        <button type="button" className="text-gray-500" onClick={toggleDropdown}>
                            <IonIcon icon={ellipsisHorizontal} />
                        </button>
                        {isDropdownOpen && (
                            <Menu />
                        )}
                    </div>
                    {/* <div className="">
                        <p className="font-normal cursor-pointer break-all">
                            {comment?.text}
                        </p>
                    </div> */}
                    <MentionComponent data={comment}/>
                    {comment.embeds && <CommentEmbed embeds={comment.embeds} />}
                </div>
            </div>
            {comment.direct_replies?.length > 0 && comment.direct_replies.map((reply, index) => (
                <ThreadComments key={index} comment={reply} />
            ))}
        </div>
    );
};

export default ThreadComments;