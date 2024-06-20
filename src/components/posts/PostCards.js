"use client";
import React, { useContext, useState, useEffect } from "react"; 
import { IonIcon } from "@ionic/react";
import {
  ellipsisHorizontal,
  heart,
  chatbubbleEllipses,
  paperPlaneOutline,
  shareOutline,
} from "ionicons/icons";
import getRelativeTime, { formatNumber } from "@/lib/utils";
import MainEmbed from "./MainEmbed";
import Menu from "./Menu";
import UserHoverCard from "./UserHoverCard";
import CommentModal from "./comments/CommentModal";
import Link from "next/link";

import axios from "axios";
import Image from "next/image";
import RecastComponent from "./recast/RecastComponent";
import { userFollowOrNot } from "@/lib/farcaster"; 
import MentionComponent from "./mention";
import { useNeynarContext } from "@neynar/react";

const PostCards = ({ data }) => { 
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isHoverCardVisible, setIsHoverCardVisible] = useState(false);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [reactions, setReactions] = useState([]);
  const [follow, setFollow] = useState(false);
  const [likeCount, setLikeCount] = useState(data?.reactions?.likes_count || 0);

  const {user}= useNeynarContext()
  const [hasLiked, setHasLiked] = useState(
    data.reactions.likes_count > 0 &&
      data.reactions.likes.some((like) => like.fid === user?.fid)
  );

  useEffect(() => {
    if (data.reactions.likes_count > 0) {
      getReactions();
    }
  }, [data]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleMouseEnter = async () => {
    const fid = data?.author?.fid;
    const viewer = user?.fid;
    setIsHoverCardVisible(true);
    const res = await userFollowOrNot(fid, viewer);
    setFollow(res?.users[0]?.viewer_context?.following);
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

  const publishLike = async (reactionType, hash) => {
    if (!user) {
      return;
    }

    await fetch("/api/casts/reactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        signerUid: user?.signer_uuid,
        reactionType,
        hash,
      }),
    });
  };

  const deleteReaction = async (reactionType, hash) => {
    if (!user) {
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
        signer_uuid: user?.signer_uuid,
        reaction_type: reactionType,
        target: hash,
      },
    });
  };

  const getReactions = async () => {
    setReactions(data.reactions);
    setLikeCount(data.reactions.likes_count);
    setHasLiked(data.reactions.likes.some((like) => like.fid === user?.fid));
  };

  const handleLikeButtonClick = () => {
    const hasUserLiked = data.reactions.likes.some(
      (like) => like.fid == user?.fid
    );
    if (!hasUserLiked) {
      setReactions([...data.reactions.likes, { user: { fid: user?.fid } }]);
      setLikeCount(likeCount + 1);
      setHasLiked(true);
      publishLike("like", data.hash);
    } else {
      setReactions(
        data.reactions.likes.filter((like) => like.fid !== user?.fid)
      );
      setLikeCount(likeCount - 1);
      setHasLiked(false);
      deleteReaction("like", data.hash);
    }
  };
 

  return (
    <div className="bg-white rounded-xl shadow-sm text-sm font-medium border1 dark:bg-dark2 my-2">
      <div className="flex gap-3 sm:p-4 p-2.5 text-sm font-medium ">
        <Link
          href={`/profile/${data?.author.fid}`}
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Image
            src={data?.author?.pfp_url}
            alt={data?.author?.username}
            width={48}
            height={48}
            className="w-9 h-9 rounded-full"
          />
        </Link>
        <div className="flex-1 ">
          <Link
            href={`/profile/${data?.author.fid}`}
            className="relative flex items-center"
          >
            <h4
              className="text-black dark:text-white"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {data?.author?.display_name}
            </h4>
          </Link>
          <UserHoverCard
            userData={data?.author}
            isVisible={isHoverCardVisible}
            setIsHoverCardVisible={setIsHoverCardVisible}
            follow={follow}
            uuid={user?.signer_uuid}
            mention={false}
          />
          <div className="flex items-center">
            <span className="text-sm text-gray-500">
              @{data?.author?.username} {getRelativeTime(data?.timestamp)}
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
          {isDropdownOpen && (
            <Menu
              hash={data?.hash}
              uuid={user?.signer_uuid}
              isCurrentUser={data.author.fid == user.fid}
            />
          )}
        </div>
      </div> 
      <MentionComponent data={data}/>
      <MainEmbed data={data} lable="post" />
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
        <RecastComponent data={data} />
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="button-icon bg-slate-200/70 dark:bg-slate-700"
            onClick={handleCommentClick}
          >
            <IonIcon className="text-lg" icon={chatbubbleEllipses}></IonIcon>
          </button>
          <span onClick={handleCommentClick}>
            {formatNumber(data?.replies?.count)}
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
        parentPost={data}
      />
    </div>
  );
};

export default PostCards;
