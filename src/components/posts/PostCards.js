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

const PostCards = ({ data }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isReactionOpen, setIsReactionOpen] = useState(false);
    const [isCommentsOpen, setIsCommentsOpen] = useState(false);
    const [isHoverCardVisible, setIsHoverCardVisible] = useState(false);


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

    return (
        <div className="bg-white rounded-xl shadow-sm text-sm font-medium border1 dark:bg-dark2 my-5">
            <div className="flex gap-3 sm:p-4 p-2.5 text-sm font-medium ">
                <a href="#">
                    <img src={data?.author?.pfp_url} alt="" className="w-9 h-9 rounded-full" />
                </a>
                <div className="flex-1 relative"  onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                    <a href="#">
                        <h4 className="text-black dark:text-white"> {data?.author?.display_name} </h4>
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
                      <Menu/>
                    )}
                </div>
            </div>

            <div class="sm:px-4 p-2.5 pt-0">
                <p class="font-normal"> {data?.text}</p>
            </div>
            <MainEmbed data={data} lable="post" />
            <div className="sm:p-4 p-2.5 flex items-center gap-4 text-xs font-semibold">
                <div>
                    <div className="flex items-center gap-2.5">
                        <button type="button" className="button-icon text-red-500 bg-red-100 dark:bg-slate-700" onClick={toggleReaction}>
                            <IonIcon className="text-lg" icon={heart}></IonIcon>
                        </button>
                        <a href="#">{data?.reactions.likes_count}</a>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button type="button" className="button-icon bg-slate-200/70 dark:bg-slate-700" onClick={toggleComments}>
                        <IonIcon className="text-lg" icon={chatbubbleEllipses}></IonIcon>
                    </button>
                    <span>{data?.replies?.count}</span>
                </div>
                <button type="button" className="button-icon ml-auto">
                    <IonIcon className="text-xl" icon={paperPlaneOutline}></IonIcon>
                </button>
                <button type="button" className="button-icon">
                    <IonIcon className="text-xl" icon={shareOutline}></IonIcon>
                </button>
            </div>
            {isCommentsOpen && <FeedComments url={data?.parent_url} />}

            {
                isCommentsOpen && <div className="sm:px-4 sm:py-3 p-2.5 border-t border-gray-100 flex items-center gap-1 dark:border-slate-700/40">
                    <img src="/assets/images/avatars/avatar-7.jpg" alt="" className="w-6 h-6 rounded-full" />
                    <div className="flex-1 relative overflow-hidden h-10">
                        <textarea
                            placeholder="Add Comment...."
                            rows="1"
                            className="w-full resize-none !bg-transparent px-4 py-2 focus:!border-transparent focus:!ring-transparent"
                        ></textarea>
                    </div>
                    <button type="submit" className="text-sm rounded-full py-1.5 px-3.5 bg-secondery">Reply</button>
                </div>
            }
        </div>
    );
};

export default PostCards;
