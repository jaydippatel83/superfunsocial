"use client";
import React, { useEffect, useState } from "react";
import PostCards from "../posts/PostCards";

import PostCardLoader from "../loader/PostCardLoader";
import StickyTabs from "./StickyTabs";
import ProfileHeader from "./ProfileCard";
import MutualFriends from "../sidebar/MutualFriends";
import {
  getFeedByHash,
  getReactions,
  getReactionsProfile,
} from "@/lib/farcaster";

const tabs = ["Feed", "Replies", "Likes"];

const Profile = ({
  user,
  feedData,
  feedCursor,
  likeData,
  likeCursor,
  recastData,
  recastCursor,
}) => {
  const [activeTab, setActiveTab] = useState("Feed");
  const [feed, setFeed] = useState(feedData || []);
  const [recasts, setRecasts] = useState(recastData || []);
  const [likes, setLikes] = useState(likeData || []);
  const [fcursor, setFcursor] = useState(feedCursor);
  const [rcursor, setRcursor] = useState(recastCursor);
  const [lcursor, setLcursor] = useState(likeCursor);
  const [floader, setFloader] = useState(false);
  const [rloader, setRloader] = useState(false);
  const [lloader, setLloader] = useState(false);

  const loadmoreCastData = async () => {
    const req = {
      fid: user.fid,
      cursor: fcursor,
    };
    setFloader(true);
    const data = await getFeedByHash(req);
    setFcursor(data?.next.cursor);
   
    setFeed([...feed, ...data?.casts]);
    setFloader(false);
  };

  const loadmoreRecastData = async () => {
    const req = {
      fid: user.fid,
      cursor: rcursor,
      type: "recasts",
    };
    setRloader(true);
    const data = await getReactionsProfile(req);
    setRcursor(data?.next.cursor);
    setRecasts([...recasts, ...data?.reactions]);
    setRloader(false);
  };
  const loadmoreLikeData = async () => {
    const req = {
      fid: user.fid,
      cursor: lcursor,
      type: "likes",
    };
    setLloader(true);
    const data = await getReactionsProfile(req);
    setLcursor(data?.next.cursor);
    setLikes([...likes, ...data?.reactions]);
    setLloader(false);
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
                {fcursor && (
                  <div className="flex justify-center my-5">
                    <button
                      onClick={loadmoreCastData}
                      className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                      disabled={floader}
                    >
                      {floader ? (
                        <div className="w-8 h-8 border-4 border-t-blue-500 border-solid rounded-full animate-spin"></div>
                      ) : (
                        "Load More"
                      )}
                    </button>
                  </div>
                )}
              </>
            )}

            {activeTab === "Replies" && (
              <>
                {recasts &&
                  recasts.map((item, i) => (
                    <PostCards data={item.cast} key={i} />
                  ))}
                {rcursor && (
                  <div className="flex justify-center my-5">
                    <button
                      onClick={loadmoreRecastData}
                      className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                      disabled={rloader}
                    >
                      {rloader ? (
                        <div className="w-8 h-8 border-4 border-t-blue-500 border-solid rounded-full animate-spin"></div>
                      ) : (
                        "Load More"
                      )}
                    </button>
                  </div>
                )}
              </>
            )}

            {activeTab === "Likes" && (
              <>
                {likes &&
                  likes.map((item, i) => (
                    <PostCards data={item.cast} key={i} />
                  ))}
                {lcursor && (
                  <div className="flex justify-center my-5">
                    <button
                      onClick={loadmoreLikeData}
                      className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                      disabled={lloader}
                    >
                      {lloader ? (
                        <div className="w-8 h-8 border-4 border-t-blue-500 border-solid rounded-full animate-spin"></div>
                      ) : (
                        "Load More"
                      )}
                    </button>
                  </div>
                )}
              </>
            )}

            {/* <PostCardLoader /> */}
          </div>
        </div>
        <MutualFriends fid={user} />
      </div>
    </main>
  );
};

export default Profile;
