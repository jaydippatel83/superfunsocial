'use client';
import { notificationsData } from '@/lib/utils';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';

const RecentList = () => {
    const [items, setItems] = useState(notificationsData);

    useEffect(() => {
        const interval = setInterval(() => {
            setItems((prevItems) => {
                const newItems = [...prevItems];
                const firstItem = newItems.pop();  
                newItems.unshift(firstItem);  
                return newItems;
            });
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full rounded-lg overflow-y-scroll h-80 ">
            {items.map((notification, index) => (
                <div
                    key={index}
                    className="bg-white my-2 rounded-lg text-center transition-transform transform"
                    style={{
                        animation: `dropExpand 1s ${index * 0.2}s forwards, slideDown 3s ${index * 0.1}s infinite`,
                    }}
                >
                    <a
                        href={notification.href}
                        className={`relative flex items-center gap-3 p-2 duration-200 rounded-xl pr-10 hover:bg-secondery dark:hover:bg-white/10 ${notification.bgClass}`}
                    >
                        <div className="relative w-10 h-10 shrink-0">
                            <Image
                                src={notification.imgSrc}
                                alt={notification.imgAlt}
                                className="object-cover w-full h-full rounded-full"
                                width={48}
                                height={48}
                            />
                        </div>
                        <div className="flex-1 text-left">
                            <p className='text-base'>
                                <b className="font-bold mr-1">{notification.message.split(' ')[0]}</b> {notification.message.slice(notification.message.indexOf(' ') + 1)}
                            </p>
                            <div className="text-xs text-gray-500 mt-0.5 dark:text-white/80">{notification.time}</div>
                            {notification.button}
                        </div>
                    </a>
                </div>
            ))}
        </div>
    );
};

export default RecentList;
