'use client' 
import React, { useEffect, useState } from 'react';
import RecentList from '../animation/RecentList';
import axios from 'axios'; 
import Friends from '../profile/Friends';
import SuggestedUsers from './SuggestedUsers';
import { useNeynarContext } from '@neynar/react';

const MutualFriends = ({fid}) => {
const {user}= useNeynarContext()
const [userData,setUserData]=useState([]);

  const getActiveUser = async (id) => {
    const headers = {
      accept: 'application/json', api_key: process.env.NEXT_PUBLIC_NEYNAR_API_KEY
    }
    const url = `https://api.neynar.com/v2/farcaster/user/active?limit=5`
    try {
      const response = await axios.get(url, {
        headers
      })
      const data = response.data?.users;
      setUserData(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getActiveUser();
  }, [fid]) 

  return (
    <div className="flex-1">
      <div className="lg:space-y-4 lg:pb-8 max-lg:grid sm:grid-cols-2 max-lg:gap-6"
        uk-sticky="media: 1024; end: #js-oversized; offset: 80">

        <div className="box p-5 px-6"> 
          <div className="flex items-baseline justify-between text-black dark:text-white">
            <h3 className="font-bold text-base"> Recents </h3>
            <a href="#" className="text-sm text-blue-500">See all</a>
          </div>
          <RecentList /> 
        </div> 
         <Friends fid={fid} login={user.fid}/> 
         <SuggestedUsers userData={userData}/>
      </div>
    </div>

  );
};

export default MutualFriends;