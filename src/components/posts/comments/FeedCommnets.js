'use client';
import { IonIcon } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { chevronDownOutline } from 'ionicons/icons';
import axios from 'axios';
import getRelativeTime from '@/lib/utils';

const FeedComments = ({ url }) => {
    const [limit, setLimit] = useState(20);
    const [cast, setCast] = useState([]);
    const [cursor, setCursor] = useState(null);
    const [loading, setLoading] = useState(false);

    const getRecentComments = async (parent_url, cursor = null) => {
        const headers = {
            accept: 'application/json',
            api_key: process.env.NEXT_PUBLIC_NEYNAR_API_KEY
        };
        let apiUrl = `https://api.neynar.com/v2/farcaster/feed?feed_type=filter&filter_type=parent_url&parent_url=${parent_url}&with_recasts=true&limit=${limit}`;
        if (cursor) {
            apiUrl += `&cursor=${cursor}`;
        }
        try {
            const response = await axios.get(apiUrl, { headers });
            const data = response.data?.casts || [];
            setCast(prevCast => [...prevCast, ...data]);
            setCursor(response.data.next?.cursor);
            setLoading(false);
            console.log(data, "data");
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        setLoading(true);
        getRecentComments(url);
    }, [url]);

    const handleLoadMore = () => {
        if (cursor) {
            setLoading(true);
            getRecentComments(url, cursor);
        }
    };

    return (
        <div className="sm:py-4 py-2.5 border-t border-gray-100 font-normal space-y-3 relative dark:border-slate-700/40 overflow-y-scroll max-h-52">
            {
                cast.map((item, index) => (
                    <div key={index} className="flex items-start gap-3 relative border-b sm:px-4 px-2.5 pb-4">
                        <a href="#">
                            <img src={item?.author?.pfp_url || 'default-avatar.png'} alt="" className="w-6 h-6 mt-1 rounded-full" />
                        </a>
                        <div className="flex-1">
                            <a href="timeline.html">
                                <h4 className="text-black dark:text-white">{item?.author?.display_name || item?.author?.username}</h4>
                            </a>
                            <div className="flex items-center">
                                <span className="text-sm text-gray-500">@{item?.author?.username} {getRelativeTime(item?.timestamp)}</span>
                            </div>
                            <p className="mt-0.5">{item?.text}</p>
                        </div>
                    </div>
                ))
            }
            {cursor && !loading && (
                <div className='flex justify-center'>
                    <button type="button" className="flex justify-center items-center gap-1.5 text-gray-500 hover:text-blue-500 mt-2" onClick={handleLoadMore}>
                    Load More Comments
                </button>
                </div>
            )}
            {loading && <div className="text-center py-2">Loading...</div>}
        </div>
    );
};

export default FeedComments;
