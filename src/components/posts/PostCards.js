'use client';
import React, { useState } from 'react';
import { IonIcon } from '@ionic/react';
import { ellipsisHorizontal, heart, chatbubbleEllipses, paperPlaneOutline, shareOutline, bookmarkOutline, notificationsOffOutline, flagOutline, stopCircleOutline, chevronDownOutline } from 'ionicons/icons';
import getRelativeTime from '@/lib/utils';
import EmbedUrls from './EmbedUrls';
import MainEmbed from './MainEmbed';
import FeedComments from './comments/FeedCommnets';
import Menu from './Menu';
import UserHoverCard from './UserHoverCard';
import CommentModal from './comments/CommentModal';
import Link from 'next/link';
import Reactions from './Reactions';

const PostCards = ({ data }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isReactionOpen, setIsReactionOpen] = useState(false);
    const [isCommentsOpen, setIsCommentsOpen] = useState(false);
    const [isHoverCardVisible, setIsHoverCardVisible] = useState(false);
    const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);


    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const toggleReaction = () => {
        setIsReactionOpen(!isReactionOpen);
    };

    const toggleComments = () => {
        setIsCommentsOpen(!isCommentsOpen);
    };

    const handleMouseEnter = () => {
        setIsHoverCardVisible(true);
    };

    const handleMouseLeave = () => {
        setIsHoverCardVisible(false);
    };

    const handleCommentClick = () => {
        setIsCommentModalOpen(true);
    };

    const closeCommentModal = () => {
        setIsCommentModalOpen(false);
    };


    return (
        <div className="bg-white rounded-xl shadow-sm text-sm font-medium border1 dark:bg-dark2 my-1">
            <div className="flex gap-3 sm:p-4 p-2.5 text-sm font-medium ">
                <a href="#" className='relative' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                    <img src={data?.author?.pfp_url} alt="" className="w-9 h-9 rounded-full" />
                </a>
                <div className="flex-1 "  >
                    <a href="#" className='relative flex items-center' >
                        <h4 className="text-black dark:text-white" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}> {data?.author?.display_name} </h4>
                    </a>
                    <UserHoverCard user={data?.author} isVisible={isHoverCardVisible} />
                    <div className="flex items-center">
                        <span className="text-sm text-gray-500">@{data?.author?.username} {getRelativeTime(data?.timestamp)}</span>
                    </div>
                </div>
                <div className="-mr-1 relative">
                    <button type="button" className="button-icon w-8 h-8" onClick={toggleDropdown}>
                        <IonIcon className="text-xl" icon={ellipsisHorizontal}></IonIcon>
                    </button>
                    {isDropdownOpen && (
                        <Menu />
                    )}
                </div>
            </div>

            <div className="sm:px-4 p-2.5 pt-0">
                <p className="font-normal cursor-pointer break-all">
                    <Link href={`${data?.author?.username}/${data?.hash}`}>
                        {data?.text}
                    </Link>
                </p>
            </div>
            <MainEmbed data={data} lable="post" />
            <Reactions data={data} handleCommentClick={handleCommentClick}/>
            <CommentModal isOpen={isCommentModalOpen} onClose={closeCommentModal} parentPost={data} />
        </div>
    );
};

export default PostCards;
