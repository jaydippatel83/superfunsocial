'use client';
import { notificationsData } from '@/lib/utils';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';

const RecentList = () => {
    const [items, setItems] = useState([
        'Item 1',
        'Item 2',
        'Item 3',
        'Item 4',
        'Item 5',
    ]);

    useEffect(() => {
        const interval = setInterval(() => {
            setItems((prevItems) => {
                const newItems = [...prevItems];
                const firstItem = newItems.pop(); // remove last item
                newItems.unshift(firstItem); // add it to the top
                return newItems;
            });
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full rounded-lg overflow-hidden h-80 ">
            {notificationsData.map((notification, index) => (
                <div
                    key={index}
                    className="bg-white p-4 m-2 rounded-lg text-center transition-transform transform"
                    style={{
                        animation: `dropExpand 1s ${index * 0.2}s forwards, slideDown 3s ${index * 0.1}s infinite`,
                    }}
                >
                    <a
                        href={notification.href}
                        className={`relative flex items-center gap-3 p-2 duration-200 rounded-xl pr-10 hover:bg-secondery dark:hover:bg-white/10 ${notification.bgClass}`}
                    >
                        <div className="relative w-12 h-12 shrink-0">
                            <Image
                                src={notification.imgSrc}
                                alt={notification.imgAlt}
                                className="object-cover w-full h-full rounded-full"
                                width={48}
                                height={48}
                            />
                        </div>
                        <div className="flex-1">
                            <p>
                                <b className="font-bold mr-1">{notification.message.split(' ')[0]}</b> {notification.message.slice(notification.message.indexOf(' ') + 1)}
                            </p>
                            <div className="text-xs text-gray-500 mt-1.5 dark:text-white/80">{notification.time}</div>
                            {notification.button}
                        </div>
                    </a>
                </div>
            ))}
        </div>
    );
};

export default RecentList;
