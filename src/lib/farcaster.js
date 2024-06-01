"use server";
import neynarClient from "@/clients/neynar";
import { FeedType, FilterType } from "@neynar/nodejs-sdk";
import axios from "axios";

export async function getFeed(cursor) {
  try {
    const feed = await neynarClient.fetchFeed(FeedType.Filter , {
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
