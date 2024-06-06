'use client'
import React, { useEffect, useState } from 'react';
import { IonIcon } from '@ionic/react';
import { addCircle, bookmarkOutline, camera, chevronDown, chevronDownOutline, ellipsisHorizontal, flagOutline, heart, notificationsOffCircle, pricetagsOutline, search, shareOutline, stopCircleOutline, timeOutline } from 'ionicons/icons';
import PostCards from '../posts/PostCards';
import PostCardLoader from '../loader/PostCardLoader';
import CreatePost from '../posts/CreatePost';
import IntroCard from './IntroCard';
import Friends from './Friends';
import StickyTabs from './StickyTabs';
import axios from 'axios';
import ProfileHeader from './ProfileCard';
import RightSIdeBar from '../sidebar/RightSIdeBar';

const Profile = ({ user }) => {

    const [feed, setFeed] = useState(null);

    const getFeedByHash = async () => {
        const headers = {
            accept: 'application/json', api_key: process.env.NEXT_PUBLIC_NEYNAR_API_KEY
        }
        const url = `https://api.neynar.com/v2/farcaster/feed?feed_type=filter&filter_type=fids&fids=${user.fid}&limit=10`
        try {
            const response = await axios.get(url, {
                headers
            })
            const data = response.data?.casts;
            setFeed(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getFeedByHash();
    }, [user])

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
                            feed && feed.map((item) => <PostCards data={item} />)
                        }

                        <PostCardLoader />
                    </div>
                </div>
                <RightSIdeBar /> 
            </div>
        </main>
    );
};

export default Profile;