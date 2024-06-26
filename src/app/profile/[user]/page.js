'use server';
import Layout from '@/components/layout/Layout';
import Profile from '@/components/profile/Profile';
import { getFeedByHash } from '@/lib/farcaster';
import { getUserById } from '@/lib/user';
import React from 'react';

const page = async({params:{user}}) => {
  const userData = await getUserById(user);  
  const req = {
    fid: user,
    cursor: ""
}
const data = await getFeedByHash(req); 
    return (
        <Layout>
          <Profile user={userData[0]} data={data?.casts} cursor={data?.next?.cursor}/>
        </Layout>
    );
};

export default page;