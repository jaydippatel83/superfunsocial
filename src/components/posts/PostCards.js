"use client";
import React, { useContext, useState } from "react";
import useLocalStorage from "@/hooks/use-local-storage-state";
import { IonIcon } from "@ionic/react";
import {
  ellipsisHorizontal,
  heart,
  chatbubbleEllipses,
  paperPlaneOutline,
  shareOutline,
  repeat,
} from "ionicons/icons";
import getRelativeTime, { formatNumber } from "@/lib/utils";
import EmbedUrls from "./EmbedUrls";
import MainEmbed from "./MainEmbed";
import FeedComments from "./comments/FeedCommnets";
import Menu from "./Menu";
import UserHoverCard from "./UserHoverCard";
import CommentModal from "./comments/CommentModal";
import Link from "next/link";
import Reactions from "./Reactions";

import axios from "axios";
import Image from "next/image";
import RecastComponent from "./recast/RecastComponent";
import { userFollowOrNot } from "@/lib/farcaster";
import { AppContext } from "@/context/AppContext";

const PostCards = ({ data }) => {
  const appContext = useContext(AppContext);
  const {userData}= appContext;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isReactionOpen, setIsReactionOpen] = useState(false);
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [isHoverCardVisible, setIsHoverCardVisible] = useState(false);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [reactions, setReactions] = useState([]);
  const [follow, setFollow]= useState();
 

  const [user, _1, removeUser] = useLocalStorage("user");

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  }; 

  const toggleReaction = () => {
    setIsReactionOpen(!isReactionOpen);
  };

  const toggleComments = () => {
    setIsCommentsOpen(!isCommentsOpen);
  };

  const handleMouseEnter = async() => {
    const fid = data?.author?.fid;
    const viewer = userData?.fid;
    setIsHoverCardVisible(true);
    const res = await userFollowOrNot(fid, viewer);
    setFollow(res.users[0].viewer_context.following); 
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
    if (!user.signerUuid) {
      return;
    }

    await fetch("/api/casts/reactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        signerUid: user.signerUuid,
        reactionType,
        hash,
      }),
    });
  };

  const getReactions = async (hash) => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        api_key: process.env.NEXT_PUBLIC_NEYNAR_API_KEY,
      },
    };

    axios
      .get(
        `https://api.neynar.com/v2/farcaster/reactions/cast?hash=${hash}&types=likes&limit=100`,
        options
      )
      //   .then((response) => response.json())
      .then((response) => setReactions(response.data.reactions))
      .catch((err) => console.error(err));
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
            alt=""
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
              {" "}
              {data?.author?.display_name}{" "}
            </h4>
          </Link>
          <UserHoverCard user={data?.author} isVisible={isHoverCardVisible} setIsHoverCardVisible={setIsHoverCardVisible} follow={follow} uuid={user.signerUuid}/>
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
              uuid={user?.signerUuid}
              isCurrentUser={data.author.fid == user.fid}
            />
          )}
        </div>
      </div>

      <div class="sm:px-4 p-2.5 pt-0">
        <p className="font-normal cursor-pointer">
          <Link
            href={`/${data?.author?.username}/${data?.hash}`}
            className="break-all"
          >
            {data?.text}
          </Link>
        </p>
      </div>
      <MainEmbed data={data} lable="post" />
      <div className="sm:p-4 p-2.5 flex items-center gap-4 text-xs font-semibold">
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            className={
              reactions.some((like) => like.user.fid === user.fid)
                ? "button-icon text-red-500 bg-red-100 dark:bg-slate-700"
                : "button-icon   dark:bg-slate-700"
            }
            onClick={() => {
              publishLike("like", data.hash);
              getReactions(data.hash);
            }}
          >
            <IonIcon className="text-lg" icon={heart}></IonIcon>
          </button>
          <a href="#">{formatNumber(data?.reactions.likes_count)}</a>
        </div>
        <RecastComponent data={data}/>
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
