'use client'
import { IonIcon } from '@ionic/react';
import { syncOutline } from 'ionicons/icons';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import RecentList from '../animation/RecentList';
import axios from 'axios';
import Link from 'next/link';
import useLocalStorage from '@/hooks/use-local-storage-state';

const RightSIdeBar = () => {
  const [user, setUser, removeUser] = useLocalStorage("user"); 
  const [userData, setUserData] = useState(null);

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
  }, [user]) 

  return (
    <div className="flex-1">
      <div className="lg:space-y-4 lg:pb-8 max-lg:grid sm:grid-cols-2 max-lg:gap-6"
        uk-sticky="media: 1024; end: #js-oversized; offset: 80">

        <div className="box p-5 px-6">

          <div className="flex items-baseline justify-between text-black dark:text-white">
            <h3 className="font-bold text-base"> Recent </h3>
            <a href="#" className="text-sm text-blue-500">See all</a>
          </div>
          <RecentList />

        </div>

        <div className="box p-5 px-6 border1 dark:bg-dark2 ">
          <div className="flex justify-between text-black dark:text-white">
            <h3 className="font-bold text-base">Active Users </h3>
            <button type="button"> <IonIcon name={syncOutline} className="text-xl"></IonIcon> </button>
          </div>
          <div className="space-y-4 capitalize text-xs font-normal mt-5 mb-2 text-gray-500 dark:text-white/80">
            {
              userData && userData.map((user) => { 
                return (
                  <div className="flex items-center gap-3">
                    <Link href={`/profile/${user.fid}`}>
                      <img src={user.pfp_url} alt="" className="bg-gray-200 rounded-full w-10 h-10" />
                    </Link>
                    <div className="flex-1">
                      <Link href={`/profile/${user.fid}`}><h4 className="font-semibold text-sm text-black dark:text-white">{user.display_name}</h4></Link>
                      <div className="mt-0.5">@{user.username}</div>
                    </div>
                    <button type="button" className="text-sm rounded-full py-1.5 px-4 font-semibold bg-secondery"> Follow </button>
                  </div>
                )
              })
            }
          </div>
        </div>

      </div>
    </div>

  );
};

export default RightSIdeBar;