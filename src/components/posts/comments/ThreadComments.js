'use client';
import React, { useState } from 'react';
import { IonIcon } from '@ionic/react';
import { ellipsisHorizontal, bookmarkOutline, notificationsOffOutline, flagOutline, shareOutline, stopCircleOutline } from 'ionicons/icons';
import getRelativeTime from '@/lib/utils';
import UserHoverCard from '../UserHoverCard';
import CommentEmbed from './CommentEmbed';
import CommentCards from './CommentCards';
import Menu from '../Menu';

const ThreadComments = ({ comment }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isHoverCardVisible, setIsHoverCardVisible] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleMouseEnter = () => {
        setIsHoverCardVisible(true);
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
                            <UserHoverCard user={comment?.author} isVisible={isHoverCardVisible} setIsHoverCardVisible={setIsHoverCardVisible} />
                        </div>
                        <button type="button" className="text-gray-500" onClick={toggleDropdown}>
                            <IonIcon icon={ellipsisHorizontal} />
                        </button>
                        {isDropdownOpen && (
                            <Menu />
                        )}
                    </div>
                    <div className="">
                        <p className="font-normal cursor-pointer break-all">
                            {comment?.text}
                        </p>
                    </div>
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