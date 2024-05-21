import neynarClient from "@/clients/neynar"; 

export async function getFeed() {
    const feed = await neynarClient.fetchFeed(FeedType.Filter, {
      filterType: FilterType.GlobalTrending,
      withReplies: false,
    });
  
    return { feed };
  }