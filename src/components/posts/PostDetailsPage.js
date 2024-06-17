"use client";
import { useContext, useState, useEffect } from "react";
import { IonIcon } from "@ionic/react";
import {
  ellipsisHorizontal,
  heart,
  chatbubbleEllipses,
  paperPlaneOutline,
  shareOutline,
  repeat,
} from "ionicons/icons";
import Link from "next/link";
import getRelativeTime, { formatNumber } from "@/lib/utils";
import UserHoverCard from "./UserHoverCard";
import MainEmbed from "./MainEmbed";
import CommentModal from "./comments/CommentModal";
import Menu from "./Menu";
import FeedComments from "./comments/FeedCommnets";
import { userFollowOrNot } from "@/lib/farcaster";
import { AppContext } from "@/context/AppContext";
import useLocalStorage from "@/hooks/use-local-storage-state";
import axios from "axios";
import RecastComponent from "./recast/RecastComponent";

export const PostDetailPage = ({ post }) => {
  const appContext = useContext(AppContext);
  const { userData } = appContext;
  const [follow, setFollow] = useState();
  const [user, _1, removeUser] = useLocalStorage("user");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isReactionOpen, setIsReactionOpen] = useState(false);
  const [isHoverCardVisible, setIsHoverCardVisible] = useState(false);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);

  const [likeCount, setLikeCount] = useState(post?.reactions?.likes_count || 0);
 

  const [hasLiked, setHasLiked] = useState(
    post.reactions.likes_count > 0 &&
      post.reactions.likes.some((like) => like.fid == user?.fid)
  );

  useEffect(() => {
    if (post.reactions.likes_count > 0) {
      getReactions();
    }
  }, [post]);

  const publishLike = async (reactionType, hash) => {
    if (!user?.signerUuid) {
      return;
    }

    await fetch("/api/casts/reactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        signerUid: user?.signerUuid,
        reactionType,
        hash,
      }),
    });
  };

  const deleteReaction = async (reactionType, hash) => {
    if (!user?.signerUuid) {
      return;
    }

    const headers = {
      accept: "application/json",
      api_key: process.env.NEXT_PUBLIC_NEYNAR_API_KEY,
      contentType: "application/json",
    };

    await axios.delete("https://api.neynar.com/v2/farcaster/reaction", {
      headers: headers,
      data: {
        signer_uuid: user?.signerUuid,
        reaction_type: reactionType,
        target: hash,
      },
    });
  };

  const getReactions = async () => {
    setLikeCount(post.reactions.likes_count);
    setHasLiked(post.reactions.likes.some((like) => like.fid == user?.fid));
  };

  const handleLikeButtonClick = () => {
    const hasUserLiked = post.reactions.likes.some(
      (like) => like.fid == user?.fid
    );
    if (!hasUserLiked) {
      setLikeCount(likeCount + 1);
      setHasLiked(true);
      publishLike("like", post.hash);
    } else {
      setLikeCount(likeCount - 1);
      setHasLiked(false);
      deleteReaction("like", post.hash);
    }
  };

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleReaction = (e) => {
    e.stopPropagation();
    setIsReactionOpen(!isReactionOpen);
  };

  const handleMouseEnter = async () => {
    const fid = post?.author?.fid;
    const viewer = userData?.fid;
    setIsHoverCardVisible(true);
    const res = await userFollowOrNot(fid, viewer);
    setFollow(res.users[0].viewer_context.following);
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
          <Link href={`/profile/${post?.author?.fid}`}>
            <div
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <img
                src={post?.author?.pfp_url}
                alt=""
                className="w-10 h-10 rounded-full"
              />
            </div>
          </Link>
          <div className="flex-1">
            <Link href={`/profile/${post?.author?.fid}`}>
              <div className="relative flex items-center">
                <h4
                  className="text-black dark:text-white"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  {" "}
                  {post?.author?.display_name}{" "}
                </h4>
              </div>
            </Link>
            <UserHoverCard
              user={post?.author}
              isVisible={isHoverCardVisible}
              setIsHoverCardVisible={setIsHoverCardVisible}
              follow={follow}
            />
            <div className="flex items-center">
              <span className="text-sm text-gray-500">
                @{post?.author?.username} {getRelativeTime(post?.timestamp)}
              </span>
            </div>
          </div>
          <div className="-mr-1 relative">
            <button
              type="button"
              className="button-icon w-8 h-8"
              onClick={toggleDropdown}
            >
              <IonIcon className="text-xl" icon={ellipsisHorizontal}></IonIcon>
            </button>
            {isDropdownOpen && <Menu />}
          </div>
        </div>

        <div className="sm:px-4 p-2.5 pt-0">
          <p className="font-normal"> {post?.text}</p>
        </div>

        <MainEmbed data={post} label="post" />
        <div className="sm:p-4 p-2.5 flex items-center gap-4 text-xs font-semibold">
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              className={
                hasLiked
                  ? "button-icon text-red-500 bg-red-100 dark:bg-slate-700 "
                  : "button-icon  dark:bg-slate-700 bg-slate-200/70"
              }
              onClick={handleLikeButtonClick}
            >
              <IonIcon className="text-lg" icon={heart}></IonIcon>
            </button>
            <a href="#">{formatNumber(likeCount)}</a>
          </div>
          {/* <div className="flex items-center gap-3">
            <button
              type="button"
              className="button-icon bg-slate-200/70 dark:bg-slate-700"
            >
              <IonIcon className="text-lg" icon={repeat}></IonIcon>
            </button>
            <span>{formatNumber(post?.reactions?.recasts_count)}</span>
          </div> */}
          <RecastComponent data={post} />
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="button-icon bg-slate-200/70 dark:bg-slate-700"
              onClick={handleCommentClick}
            >
              <IonIcon className="text-lg" icon={chatbubbleEllipses}></IonIcon>
            </button>
            <span onClick={handleCommentClick}>
              {formatNumber(post?.replies?.count)}
            </span>
          </div>
          <button type="button" className="button-icon ml-auto">
            <IonIcon className="text-xl" icon={paperPlaneOutline}></IonIcon>
          </button>
          <button type="button" className="button-icon">
            <IonIcon className="text-xl" icon={shareOutline}></IonIcon>
          </button>
        </div>
        <CommentModal
          isOpen={isCommentModalOpen}
          onClose={closeCommentModal}
          parentPost={post}
        />
        <div className="sm:px-4 sm:py-3 p-2.5 border-t border-gray-100 flex items-center gap-1 dark:border-slate-700/40">
          <img
            src="/assets/images/avatars/avatar-7.jpg"
            alt=""
            className="w-8 h-8 rounded-full"
          />
          <div className="flex-1 relative overflow-hidden h-10">
            <textarea
              placeholder="Add Comment...."
              rows="1"
              onClick={handleCommentClick}
              className="cursor-pointer w-full resize-none !bg-transparent px-4 py-2 focus:!border-transparent focus:!ring-transparent"
            ></textarea>
          </div>
          <button
            type="submit"
            className="text-sm rounded-full py-1.5 px-3.5 bg-secondery"
          >
            Reply
          </button>
        </div>
        <FeedComments cast={post.direct_replies} />
      </div>
    </main>
  );
};
