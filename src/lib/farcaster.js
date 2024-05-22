import neynarClient from "@/clients/neynar"; 
import { FeedType, FilterType } from "@neynar/nodejs-sdk";

export async function getFeed() {
    const feed = await neynarClient.fetchFeed(FeedType.Filter, {
      filterType: FilterType.GlobalTrending,
      withReplies: false,
    });
  
    return { feed };
  }