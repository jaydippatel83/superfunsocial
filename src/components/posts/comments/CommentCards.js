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
import Menu from '../Menu';
import Image from 'next/image';

const CommentCards = ({ comment,depth = 0 }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isReactionOpen, setIsReactionOpen] = useState(false);
    const [isCommentsOpen, setIsCommentsOpen] = useState(false);
    const [isHoverCardVisible, setIsHoverCardVisible] = useState(false);
    const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
    const [showReplies, setShowReplies] = useState(false);


    const toggleDropdown = (e) => {
      e.stopPropagation();
        setIsDropdownOpen(!isDropdownOpen);
    };

    const toggleReaction = () => {
        setIsReactionOpen(!isReactionOpen);
    };

    const toggleComments = () => {
        setIsCommentsOpen(!isCommentsOpen);
    };

    const handleMouseEnter = (e) => {
      e.stopPropagation();
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

    const handleShowReplies = (e) => {
      e.stopPropagation();
        setShowReplies(!showReplies);
      };
 
 
    return (
        <div className={`bg-white  ${depth > 0 ? '' : 'border-b p-4'}`}>
        <div className="flex items-start">
        <Link
          href={`/profile/${comment.author.fid}`}
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Image
            src={comment?.author?.pfp_url}
            alt=""
            width={48}
            height={48}
            className="w-9 h-9 rounded-full"
          />
        </Link>
          <div className="flex-1 ml-2">
            <div className="flex items-center justify-between relative">
              <div>
                <div className="flex items-center">
                  <Link href={`/profile/${comment.author.fid}`} className='relative flex items-center'>
                    <h4 className="text-black dark:text-white font-bold" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                      {comment?.author?.display_name}
                    </h4>
                  </Link>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-500"> @{comment?.author?.username} <span className="text-gray-500 mx-1">|</span> {getRelativeTime(comment?.timestamp)}</span>
                  </div>
                </div>
                <UserHoverCard user={comment?.author} isVisible={isHoverCardVisible} />
              </div>
              <div className='relative'>
              <button type="button" className="text-gray-500" onClick={toggleDropdown}>
                <IonIcon icon={ellipsisHorizontal} />
              </button>
              {isDropdownOpen && (
               <Menu/>
              )}
              </div>
            </div>
            <div className="">
              <p className="font-normal cursor-pointer  break-all">
                <Link href={`/${comment?.author.username}/${comment?.hash}`}>
                  {comment?.text}
                </Link>
              </p>
            </div>
            {comment?.embeds && <CommentEmbed embeds={comment.embeds} />}
            <Reactions data={comment} handleCommentClick={handleCommentClick} />
          </div>
        </div>
        {comment.direct_replies && comment.direct_replies.length > 0 && (
          <div className="mt-2">
            <button onClick={handleShowReplies} className="text-sm text-gray-500 hover:text-blue-500">
              {showReplies ? 'Hide replies' : `Show ${comment.direct_replies.length} replies`}
            </button>
            {showReplies && (
              <div className="mt-2">
                {comment.direct_replies.map((reply, index) => (
                  <CommentCards key={index} comment={reply} depth={ depth + 1} />
                ))}
              </div>
            )}
          </div>
        )}
        <CommentModal isOpen={isCommentModalOpen} onClose={closeCommentModal} parentPost={comment} />
      </div>
    );
};

export default CommentCards;