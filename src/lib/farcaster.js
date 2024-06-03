"use server";
import neynarClient from "@/clients/neynar";
import { FeedType, FilterType } from "@neynar/nodejs-sdk";
import axios from "axios";

export async function getFeed(cursor) {
  try {
    const feed = await neynarClient.fetchFeed(FeedType.Filter, {
      filterType: FilterType.EmbedUrl,
      embedUrl: "farcaster",
      limit: 20,
      cursor: cursor || "",
      withRecasts: true,
      withReplies: true,
    });
    return { feed };
  } catch (error) {
    console.log(error);
  }
}

export async function getCastByHash(hash) {
  const headers = {
    accept: "application/json",
    api_key: process.env.NEXT_PUBLIC_NEYNAR_API_KEY,
  };
  const url = `https://api.neynar.com/v2/farcaster/cast?identifier=${hash}=hash`;
  const response = await axios.get(url, {
    headers,
  });
  const data = response.data;
  return data;
}

export const fetchAllFollowers = async (fid) => {
  let cursor = "";
  let users = [];
  do {
    const result = await neynarClient.fetchUserFollowers(fid, {
      limit: 150,
      cursor,
    });
    users = users.concat(result.result.users);
    cursor = result.result.next.cursor;
    console.log(cursor);
  } while (cursor !== "" && cursor !== null);

  return users;
};

export const fetchAllFollowing = async (fid) => {
  let cursor = "";
  let users = [];
  do {
    const result = await neynarClient.fetchUserFollowing(fid, {
      limit: 150,
      cursor,
    });
    users = users.concat(result.result.users);
    cursor = result.result.next.cursor;
    console.log(cursor);
  } while (cursor !== "" && cursor !== null);

  return users;
};

export const followUser = async (signer, fids) => {
  try {
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        api_key: process.env.NEXT_PUBLIC_NEYNAR_API_KEY,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        signer_uuid: signer,
        target_fids: [fids]
      }),
    };
    const result = await fetch('https://api.neynar.com/v2/farcaster/user/follow', options).then((res) => res.json())
    
    return result;
  } catch (error) {
    console.log(error);
  }
}

export const unfollowUser = async (signer, fid) => {
  try {
    const options = {
      method: "DELETE",
      headers: {
        accept: "application/json",
        api_key: process.env.NEXT_PUBLIC_NEYNAR_API_KEY,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        signer_uuid: signer,
        target_fids: [fid]
      }),
    };
    const result = await fetch('https://api.neynar.com/v2/farcaster/user/follow', options).then((res) => res.json())
     
    return result;
  } catch (error) {
    console.log(error);
  }
}

export const userFollowOrNot = async (fid, viewer) => {
  const headers = {
    accept: "application/json",
    api_key: process.env.NEXT_PUBLIC_NEYNAR_API_KEY,
  };
  const url = `https://api.neynar.com/v2/farcaster/user/bulk?fids=${fid}&viewer_fid=${viewer}`;
  const response = await axios.get(url, {
    headers,
  });
  const data = response.data;
  return data;
}