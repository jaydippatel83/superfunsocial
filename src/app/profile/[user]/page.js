'use server';
import Layout from '@/components/layout/Layout';
import Profile from '@/components/profile/Profile';
import { getFeedByHash,  getReactionsProfile } from '@/lib/farcaster';
import { getUserById } from '@/lib/user';
import React from 'react';

const page = async ({ params: { user } }) => {
  const userData = await getUserById(user);
  const req = {
    fid: user,
    cursor: ""
  }
  const rreq = {
    fid: user,
    cursor: "",
    type: "recasts"
  }
  const lreq = {
    fid: user,
    cursor: "",
    type: "likes"
  }
  const data = await getFeedByHash(req);
  const recasts = await getReactionsProfile(rreq);
  const likes = await getReactionsProfile(lreq);

  return (
    <Layout>
      <Profile
        user={userData[0]}
        feedData={data?.casts}
        feedCursor={data?.next?.cursor}
        likeCursor={likes?.next?.cursor}
        likeData={likes?.reactions}
        recastCursor={recasts?.next?.cursor}
        recastData={recasts?.reactions}
      />
    </Layout>
  );
};

export default page;