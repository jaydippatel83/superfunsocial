import { IonIcon } from '@ionic/react';
import React from 'react';
import { bookmarkOutline, notificationsOffOutline, flagOutline, stopCircleOutline, shareOutline } from 'ionicons/icons';

const Menu = () => {
    return (
        <div className="absolute right-0 mt-2 w-[245px] bg-white rounded-lg shadow-lg z-10 dark:bg-slate-700">
            <nav className="flex flex-col p-2 space-y-1">
                <a href="#" className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-600">
                    <IonIcon className="text-xl shrink-0" icon={bookmarkOutline}></IonIcon> Add to favorites
                </a>
                <a href="#" className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-600">
                    <IonIcon className="text-xl shrink-0" icon={notificationsOffOutline}></IonIcon> Mute Notification
                </a>
                <a href="#" className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-600">
                    <IonIcon className="text-xl shrink-0" icon={flagOutline}></IonIcon> Report this post
                </a>
                <a href="#" className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-600">
                    <IonIcon className="text-xl shrink-0" icon={shareOutline}></IonIcon> Share your profile
                </a>
                <hr className="my-1 border-gray-200 dark:border-slate-600" />
                <a href="#" className="flex items-center gap-2 p-2 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-500/50">
                    <IonIcon className="text-xl shrink-0" icon={stopCircleOutline}></IonIcon> Unfollow
                </a>
            </nav>
        </div>
    );
};

export default Menu;