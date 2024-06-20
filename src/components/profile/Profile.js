'use server'
import React  from 'react'; 
import PostCards from '../posts/PostCards';
import PostCardLoader from '../loader/PostCardLoader'; 
import StickyTabs from './StickyTabs'; 
import ProfileHeader from './ProfileCard'; 
import MutualFriends from '../sidebar/MutualFriends';
import { getFeedByHash } from '@/lib/farcaster';

const Profile = async({ user }) => { 
   const feed = await  getFeedByHash(user.fid);  
    return (
        <main id="site__main" className="relative 2xl:ml-[--w-side]  xl:ml-[--w-side-sm] p-2.5 h-[calc(100vh-var(--m-top))] mt-[--m-top]">
             <div
                className="lg:flex 2xl:gap-12 gap-8 max-w-[1065px]"
                id="js-oversized"
            >
                <div className="max-w-[1080px] ">
                    <div className="md:w-[580px] md:max-w-[580px] flex-1 xl:space-y-6 relative">
                        <ProfileHeader user={user} />
                        <StickyTabs /> 
                        {
                            feed && feed.map((item,i) => <PostCards data={item} key={i} />)
                        }

                        <PostCardLoader />
                    </div>
                </div>
                 <MutualFriends fid={user}/> 
            </div>
        </main>
    );
};

export default Profile;