'use client';
import { IonIcon } from '@ionic/react';
import React, {  useState } from 'react';
import { chevronDownOutline } from 'ionicons/icons'; 
import CommentCards from './CommentCards';

const FeedComments = ({ cast }) => {
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [visibleCasts, setVisibleCasts] = useState(cast.slice(0, itemsPerPage));

    const loadMoreCasts = () => {
        const nextPage = currentPage + 1;
        const newVisibleCasts = cast.slice(0, nextPage * itemsPerPage);
        setVisibleCasts(newVisibleCasts);
        setCurrentPage(nextPage);
    };

    return (
        <>
            <div className="sm:py-4 py-2.5 border-t border-gray-100 font-normal relative dark:border-slate-700/40 ">
                {visibleCasts.map((item, index) => (
                    <CommentCards key={index} comment={item} />
                ))}
            </div>
            {visibleCasts.length < cast.length && (
                <div className="text-center py-4 flex justify-center">
                    <button
                        onClick={loadMoreCasts}
                        className="text-md rounded-full py-2.5 px-4 font-semibold bg-secondery  flex items-center justify-center gap-1"
                    >
                        <IonIcon icon={chevronDownOutline} className="text-xl" />
                        Load More
                    </button>
                </div>
            )}
        </>
    );
};

export default FeedComments;
