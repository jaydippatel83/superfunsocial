import Layout from '@/components/layout/Layout';
import RightSIdeBar from '@/components/sidebar/RightSIdeBar';
import FollowerTab from '@/components/tabs/FollowerTab';
import { fetchFollowing, fetchUserbyname } from '@/lib/farcaster';
import React from 'react';

const page =async ({params}) => { 
    const { username } = params; 
    const req = {
        cursor: "",
        filter:'following',
        name: username
      }
      const following =  await fetchFollowing(req);

    return (
        <Layout>
       <main
        id="site__main"
        className="2xl:ml-[--w-side]  xl:ml-[--w-side-sm] p-2.5 h-[calc(100vh-var(--m-top))] mt-[--m-top]"
      >
        <div
          className="lg:flex 2xl:gap-12 gap-8 max-w-[1065px] mx-auto"
          id="js-oversized"
        >
          <div className="max-w-[1080px] mx-auto">
            <div className="md:w-[580px] md:max-w-[580px] mx-auto flex-1 xl:space-y-6 space-y-3">
            {
              following && <FollowerTab cursor={following.next.cursor} data={following.users} filter="following" username={username}/>  
            }  
            </div>
          </div>
          <RightSIdeBar />
        </div>
      </main>
    </Layout>   
    );
};

export default page;