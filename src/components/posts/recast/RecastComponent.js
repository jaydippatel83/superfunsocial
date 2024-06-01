'use client';
import { IonIcon } from '@ionic/react';
import React, { useState } from 'react';
import {
  flagOutline,
  repeat,
  shareOutline,
} from "ionicons/icons";
import { formatNumber } from '@/lib/utils';
import RecastModal from './RecastModal';
import axios from 'axios';
import useLocalStorage from '@/hooks/use-local-storage-state';

const RecastComponent = ({ data }) => {
  const [isOpenReact, SetIsOpenReact] = useState(false);
  const [open, setOpen] = useState(false);
  const [user, setUser, removeUser] = useLocalStorage("user");
  const [loading, setLoading] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  }

  const toggleDropdownReact = () => {
    SetIsOpenReact(!isOpenReact);
  };

  const handleRecast = ( ) => {
    const hash = data.hash;
    const options = {
      method: "POST",
      headers: {
          accept: "application/json",
          api_key: process.env.NEXT_PUBLIC_NEYNAR_API_KEY,
          "content-type": "application/json",
      },
      body: JSON.stringify({
          signer_uuid: user.signerUuid, 
          reaction_type: 'recast', 
          target: hash
          
      }),
  };

  fetch("https://api.neynar.com/v2/farcaster/reaction", options)
      .then((response) => {
          alert("Succesfully Recast post!");
          setText("");
          setLoading(false);
      })
      .catch((err) => {
          console.error(err);
          setLoading(false);
      });
  }


  return (

    <div className="relative ">
      <div className='flex items-center gap-3'>
        <button
          type="button"
          onClick={toggleDropdownReact}
          className="button-icon bg-slate-200/70 dark:bg-slate-700 "
        >
          <IonIcon className="text-lg " icon={repeat}></IonIcon>
        </button>

        <span>
          {formatNumber(data?.reactions?.recasts_count)}
        </span>
      </div>
      {isOpenReact && (
        <div className="absolute left-0 mt-2 w-[245px] bg-white rounded-lg shadow-lg z-10 dark:bg-slate-700">
          <nav className="flex flex-col p-2 space-y-1">
            <button
              onClick={handleRecast}
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-600"
            >
              <IonIcon className="text-xl shrink-0" icon={flagOutline}></IonIcon>{" "}
               {loading ? 'Loading' : 'Recast' }
            </button>
            <button
              onClick={handleOpen}
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-600"
            >
              <IonIcon className="text-xl shrink-0" icon={shareOutline}></IonIcon>{" "}
              Recast with Quote
            </button>
          </nav>
        </div>

      )}
      <RecastModal isOpen={open} onClose={handleOpen} parentPost={data} />
    </div>
  );
};

export default RecastComponent;