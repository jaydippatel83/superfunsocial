'use client';
import { useState } from 'react';
import { IonIcon } from '@ionic/react';
import { ellipsisHorizontal, heart, chatbubbleEllipses, paperPlaneOutline, shareOutline } from 'ionicons/icons';
import Link from 'next/link';
import getRelativeTime from '@/lib/utils';
import UserHoverCard from './UserHoverCard';
import MainEmbed from './MainEmbed';
import CommentModal from './comments/CommentModal';
import Menu from './Menu';
import FeedComments from './comments/FeedCommnets';

export const PostDetailPage = ({ post }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isReactionOpen, setIsReactionOpen] = useState(false);
    const [isHoverCardVisible, setIsHoverCardVisible] = useState(false);
    const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);

    const toggleDropdown = (e) => {
        e.stopPropagation();
        setIsDropdownOpen(!isDropdownOpen);
    };

    const toggleReaction = (e) => {
        e.stopPropagation();
        setIsReactionOpen(!isReactionOpen);
    };

    const handleMouseEnter = () => {
        setIsHoverCardVisible(true);
    };

    const handleMouseLeave = () => {
        setIsHoverCardVisible(false);
    };

    const handleCommentClick = (e) => {
        e.stopPropagation();
        setIsCommentModalOpen(true);
    };

    const closeCommentModal = () => {
        setIsCommentModalOpen(false);
    };

    return (
        <main className="flex-1 p-4">
            <div className="bg-white rounded-xl shadow-sm text-sm font-medium border dark:bg-dark2">
                <div className="flex gap-3 sm:p-4 p-2.5 text-sm font-medium">
                    <Link href={`/${post?.author?.username}`}>
                        <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                            <img src={post?.author?.pfp_url} alt="" className="w-10 h-10 rounded-full" />
                        </div>
                    </Link>
                    <div className="flex-1">
                        <Link href={`/${post?.author?.username}`}>
                            <div className="relative flex items-center">
                                <h4 className="text-black dark:text-white" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}> {post?.author?.display_name} </h4>
                            </div>
                        </Link>
                        <UserHoverCard user={post?.author} isVisible={isHoverCardVisible} />
                        <div className="flex items-center">
                            <span className="text-sm text-gray-500">@{post?.author?.username} {getRelativeTime(post?.timestamp)}</span>
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
                    <p className="font-normal"> {post?.text}</p>
                </div>
                <MainEmbed data={post} label="post" />
                <div className="sm:p-4 p-2.5 flex items-center gap-4 text-xs font-semibold">
                    <div>
                        <div className="flex items-center gap-2.5">
                            <button type="button" className="button-icon text-red-500 bg-red-100 dark:bg-slate-700" onClick={toggleReaction}>
                                <IonIcon className="text-lg" icon={heart}></IonIcon>
                            </button>
                            <a href="#">{post?.reactions.likes_count}</a>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button type="button" className="button-icon bg-slate-200/70 dark:bg-slate-700" onClick={handleCommentClick}>
                            <IonIcon className="text-lg" icon={chatbubbleEllipses}></IonIcon>
                        </button>
                        <span onClick={handleCommentClick}>{post?.replies?.count}</span>
                    </div>
                    <button type="button" className="button-icon ml-auto">
                        <IonIcon className="text-xl" icon={paperPlaneOutline}></IonIcon>
                    </button>
                    <button type="button" className="button-icon">
                        <IonIcon className="text-xl" icon={shareOutline}></IonIcon>
                    </button>
                </div>
                <CommentModal isOpen={isCommentModalOpen} onClose={closeCommentModal} parentPost={post} />
                <div className="sm:px-4 sm:py-3 p-2.5 border-t border-gray-100 flex items-center gap-1 dark:border-slate-700/40">
                    <img src="/assets/images/avatars/avatar-7.jpg" alt="" className="w-8 h-8 rounded-full" />
                    <div className="flex-1 relative overflow-hidden h-10">
                        <textarea
                            placeholder="Add Comment...."
                            rows="1"
                            onClick={handleCommentClick}
                            className="cursor-pointer w-full resize-none !bg-transparent px-4 py-2 focus:!border-transparent focus:!ring-transparent"
                        ></textarea>
                    </div>
                    <button type="submit" className="text-sm rounded-full py-1.5 px-3.5 bg-secondery">Reply</button>
                </div>
                <FeedComments cast={post.direct_replies} />
            </div>
        </main >
    );
}; 