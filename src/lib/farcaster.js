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

export  const getFeedByHash = async (fid) => {
  const headers = {
      accept: 'application/json', api_key: process.env.NEXT_PUBLIC_NEYNAR_API_KEY
  }
  const url = `https://api.neynar.com/v2/farcaster/feed?feed_type=filter&filter_type=fids&fids=${fid}&limit=10`
  try {
      const response = await axios.get(url, {
          headers
      })
      const data = response.data?.casts; 
      return data;
  } catch (error) {
      console.log(error);
  }
}

export async function getTrendingFeeds(fid){ 
  const headers = {
    accept: "application/json",
    api_key: process.env.NEXT_PUBLIC_NEYNAR_API_KEY,
  };
  const url = `https://api.neynar.com/v2/farcaster/feed/trending?limit=10&viewer_fid=${fid}&time_window=24h`;
  const response = await axios.get(url, {
    headers,
  });
  const data = response.data;
  return data;
}

export const fetchFollowing = async (req) => {
  const headers = {
    accept: "application/json",
    api_key: process.env.NEXT_PUBLIC_NEYNAR_API_KEY,
  };
  try {
    const {
      result: { users },
    } = await neynarClient.searchUser(req.name); 
    const fid = users[0].fid; 
    const url = `https://api.neynar.com/v2/farcaster/${req.filter}?fid=${fid}&limit=20&cursor=${req.cursor}&viewer_fid=${req.viewer}`;
    const response = await axios.get(url, {
      headers,
    });
    const data = response.data;
    return data;
  } catch (error) {
    console.error('Error fetching suggestions:', error);
  }
}

export const searchUsers= async(search)=>{
  try {
    const {
      result: { users },
    } = await neynarClient.searchUser(search);
    return users;
  } catch (error) {
    console.log(error);
  }
}

export const fetchFollowers = async () => {
  try {
    const {
      result: { users },
    } = await neynarClient.searchUser(req.name);
    const fid = users[0].fid;
    const data = await neynarClient.fetchUserFollowersV2(fid, { limit: 20, cursor: req.cursor })
    return data;
  } catch (error) {
    console.error('Error fetching suggestions:', error);
  }
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

export const getNotifications= async(fid)=>{
  const headers = {
    accept: "application/json",
    api_key: process.env.NEXT_PUBLIC_NEYNAR_API_KEY,
  }; 
  try {
    const url = `https://api.neynar.com/v2/farcaster/notifications?fid=${fid}`;
    const response = await axios.get(url, {
      headers,
    });
    const data = response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
  
}

export const fetchRecentItems = async (req) => {
  const headers = {
    accept: "application/json",
    api_key: process.env.NEXT_PUBLIC_NEYNAR_API_KEY,
  };
  try { 
    const url = `https://api.neynar.com/v2/farcaster/feed/user/${req.fid}/replies_and_recasts?limit=10&${req.cursor}`;
    const response = await axios.get(url, {
      headers,
    });
    const data = response.data;
    return data;
  } catch (error) {
    console.error('Error fetching suggestions:', error);
  }
}
