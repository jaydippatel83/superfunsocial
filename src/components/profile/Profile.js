"use client";
import React, { useEffect, useState } from "react";
import PostCards from "../posts/PostCards";

import PostCardLoader from "../loader/PostCardLoader";
import StickyTabs from "./StickyTabs";
import ProfileHeader from "./ProfileCard";
import MutualFriends from "../sidebar/MutualFriends";
import { getFeedByHash, getReactions } from "@/lib/farcaster";

const tabs = ["Feed", "Replies", "Likes"];

const Profile = ({ user }) => {
  const [activeTab, setActiveTab] = useState("Feed");
  const [feed, setFeed] = useState([]);
  const [recasts, setRecasts] = useState([]);
  const [likes, setLikes] = useState([]);

  useEffect(() => {
    getProfiledata();
  }, []);

  const getProfiledata = async () => {
    const feed = await getFeedByHash(user.fid);
    setFeed(feed);
    const recasts = await getReactions(user.fid, "recasts");
    setRecasts(recasts);
    const likes = await getReactions(user.fid, "likes");
    setLikes(likes);
  };

  return (
    <main
      id="site__main"
      className="relative 2xl:ml-[--w-side]  xl:ml-[--w-side-sm] p-2.5 h-[calc(100vh-var(--m-top))] mt-[--m-top]"
    >
      <div
        className="lg:flex 2xl:gap-12 gap-8 max-w-[1065px]"
        id="js-oversized"
      >
        <div className="max-w-[1080px] ">
          <div className="md:w-[580px] md:max-w-[580px] flex-1 xl:space-y-6 relative">
            <ProfileHeader userData={user} />
            <StickyTabs
              tabs={tabs}
              setActiveTab={setActiveTab}
              activeTab={activeTab}
            />
            {activeTab === "Feed" && (
              <>
                {feed &&
                  feed.map((item, i) => <PostCards data={item} key={i} />)}
              </>
            )}

            {activeTab === "Replies" && (
              <>
                {recasts &&
                  recasts.map((item, i) => (
                    <PostCards data={item.cast} key={i} />
                  ))}
              </>
            )}

            {activeTab === "Likes" && (
              <>
                {likes &&
                  likes.map((item, i) => (
                    <PostCards data={item.cast} key={i} />
                  ))}
              </>
            )}

            <PostCardLoader />
          </div>
        </div>
        <MutualFriends fid={user} />
      </div>
    </main>
  );
};

export default Profile;
