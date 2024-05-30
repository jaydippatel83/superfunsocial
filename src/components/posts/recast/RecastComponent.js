'use client';
import { IonIcon } from '@ionic/react';
import React, { useState } from 'react';
import {
    bookmarkOutline,
    notificationsOffOutline,
    flagOutline,
    stopCircleOutline,
    shareOutline,
    trashBinOutline,
  } from "ionicons/icons";

const RecastComponent = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        setIsOpen(!isOpen);
    }

    return (
        <div className="absolute right-0 mt-2 w-[245px] bg-white rounded-lg shadow-lg z-10 dark:bg-slate-700">
        <nav className="flex flex-col p-2 space-y-1">
          <a
            href="#"
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-600"
          >
            <IonIcon className="text-xl shrink-0" icon={flagOutline}></IonIcon>{" "}
            Report this post
          </a>
          <a
            href="#"
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-600"
          >
            <IonIcon className="text-xl shrink-0" icon={shareOutline}></IonIcon>{" "}
            Share your profile
          </a> 
        </nav>
      </div>
    );
};

export default RecastComponent;