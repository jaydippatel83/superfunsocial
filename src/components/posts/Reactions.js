'use client';
import { IonIcon } from '@ionic/react';
import React from 'react';
import { ellipsisHorizontal, heart, chatbubbleEllipses, paperPlaneOutline, shareOutline, bookmarkOutline, notificationsOffOutline, flagOutline, stopCircleOutline, chevronDownOutline } from 'ionicons/icons';
import { formatNumber } from '@/lib/utils';

const Reactions = ({ data, handleCommentClick }) => {
    return (
        <div className="sm:p-4 p-2.5 flex items-center gap-4 text-xs font-semibold">
            <div>
                <div className="flex items-center gap-2.5">
                    <button type="button" className="button-icon text-red-500 bg-red-100 dark:bg-slate-700"  >
                        <IonIcon className="text-lg" icon={heart}></IonIcon>
                    </button>
                    <a href="#">{formatNumber(data?.reactions.likes_count)}</a>
                </div>
            </div>
            <div className="flex items-center gap-3">
                <button type="button" className="button-icon bg-slate-200/70 dark:bg-slate-700" onClick={handleCommentClick}>
                    <IonIcon className="text-lg" icon={chatbubbleEllipses}></IonIcon>
                </button>
                <span onClick={handleCommentClick}>{formatNumber(data?.replies?.count)}</span>
            </div>
            <button type="button" className="button-icon ml-auto">
                <IonIcon className="text-xl" icon={paperPlaneOutline}></IonIcon>
            </button>
            <button type="button" className="button-icon">
                <IonIcon className="text-xl" icon={shareOutline}></IonIcon>
            </button>
        </div>
    );
};

export default Reactions;