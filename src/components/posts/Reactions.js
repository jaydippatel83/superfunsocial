"use client";
import { IonIcon } from "@ionic/react";
import React, { useState, useEffect } from "react";
import {
  repeat,
  heart,
  chatbubbleEllipses,
  paperPlaneOutline,
  shareOutline,
} from "ionicons/icons";
import { formatNumber } from "@/lib/utils";
import axios from "axios";
import { useNeynarContext } from "@neynar/react";

const Reactions = ({ data, handleCommentClick, handleRecastClick }) => {
  const [likeCount, setLikeCount] = useState(data?.reactions?.likes_count || 0);

  const { user } = useNeynarContext();
  const [hasLiked, setHasLiked] = useState(
    data.reactions.likes_count > 0 &&
      data.reactions.likes.some((like) => like.fid == user?.fid)
  );

  useEffect(() => {
    if (data.reactions.likes_count > 0) {
      getReactions();
    }
  }, [data, user]);

  const publishLike = async (reactionType, hash) => {
    if (!user) {
      return;
    }

    const headers = {
      accept: "application/json",
      api_key: process.env.NEXT_PUBLIC_NEYNAR_API_KEY,
      contentType: "application/json",
    };

    await axios.post(
      "https://api.neynar.com/v2/farcaster/reaction",
      {
        signer_uuid: user?.signer_uuid,
        reaction_type: reactionType,
        target: hash,
      },
      {
        headers: headers,
      }
    );
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
    setLikeCount(data.reactions.likes_count);
    setHasLiked(data.reactions.likes.some((like) => like.fid == user?.fid));
  };

  const handleLikeButtonClick = () => {
    // const hasUserLiked = data.reactions.likes.some(
    //   (like) => like.fid == user?.fid
    // );
    if (!hasLiked) {
      setLikeCount(likeCount + 1);
      setHasLiked(true);
      publishLike("like", data.hash);
    } else {
      setLikeCount(likeCount - 1);
      setHasLiked(false);
      deleteReaction("like", data.hash);
    }
  };

  return (
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
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handleRecastClick}
          className="button-icon bg-slate-200/70 dark:bg-slate-700"
        >
          <IonIcon className="text-lg" icon={repeat}></IonIcon>
        </button>
        <span>{formatNumber(data?.reactions?.recasts_count)}</span>
      </div>
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
  );
};

export default Reactions;
