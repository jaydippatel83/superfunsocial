import { IonIcon } from '@ionic/react';
import { syncOutline } from 'ionicons/icons';
import Link from 'next/link';
import React from 'react';

const SuggestedUsers = ({userData}) => {
    return (
        <div className="box p-5 px-6 border1 dark:bg-dark2 ">
        <div className="flex justify-between text-black dark:text-white">
          <h3 className="font-bold text-base">Active Users </h3>
          <button type="button"> <IonIcon name={syncOutline} className="text-xl"></IonIcon> </button>
        </div>
        <div className="space-y-4 capitalize text-xs font-normal mt-5 mb-2 text-gray-500 dark:text-white/80">
          {
            userData && userData.map((user) => { 
              return (
                <div key={user.fid} className="flex items-center gap-3">
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
    );
};

export default SuggestedUsers;