'use client';
import { IonIcon } from '@ionic/react';
import React, { useState } from 'react';
import { ellipsisHorizontal, chatbubbleEllipses, repeat, bookmarkOutline, shareOutline } from 'ionicons/icons';
import getRelativeTime from '@/lib/utils';
import UserHoverCard from '../UserHoverCard';
import Link from 'next/link';
import MainEmbed from '../MainEmbed';
import Reactions from '../Reactions';
import CommentEmbed from './CommentEmbed';
import CommentModal from './CommentModal';

const CommentCards = ({ post }) => {
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
        <div className="bg-white border-b p-4">
            <div className="flex items-start">
                <a href="#" className='relative' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                    <img src={post?.author?.pfp_url} alt="" className="w-9 h-9 rounded-full" />
                </a>
                <div className="flex-1 ml-2 ">
                    <div className="flex items-center justify-between relative">
                        <div>
                            <div className="flex items-center">
                                <a href="#" className='relative flex items-center' >
                                    <h4 className="text-black dark:text-white font-bold" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}> {post?.author?.display_name}  </h4>
                                </a>
                                <div className="flex items-center">
                                    <span className="text-sm text-gray-500"> @{post?.author?.username}  <span className="text-gray-500 mx-1">|</span> {getRelativeTime(post?.timestamp)}</span>
                                </div>
                            </div>
                            <UserHoverCard user={post?.author} isVisible={isHoverCardVisible} />
                        </div>
                        <button type="button" className="text-gray-500">
                            <IonIcon icon={ellipsisHorizontal} />
                        </button>
                    </div>
                    <p className="font-normal cursor-pointer">
                            <Link href={`${post?.author?.username}/${post?.hash}`} className='break-all'>
                                {post?.text}
                            </Link>
                        </p>
                   {
                    post.embeds &&  <CommentEmbed embeds={post.embeds}/>
                   }
                    <Reactions data={post} handleCommentClick={handleCommentClick} />
                </div>
            </div>
            <CommentModal isOpen={isCommentModalOpen} onClose={closeCommentModal} parentPost={post} />
        </div>
    );
};

export default CommentCards;