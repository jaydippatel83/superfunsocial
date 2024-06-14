'use client';
import { useState, useRef, useEffect } from 'react';
import { IonIcon } from '@ionic/react';
import { notificationsOutline, close } from 'ionicons/icons';
import Image from 'next/image';
import useLocalStorage from '@/hooks/use-local-storage-state';
import { getNotifications } from '@/lib/farcaster';
import Link from 'next/link';
import getRelativeTime from '@/lib/utils';

const Notifications = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [notifications, setNotifications] = useState([]);
    const [user, _1, removeUser] = useLocalStorage("user");

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
        getNoti();
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsDropdownOpen(false);
        }
    };

    const getNoti = async () => {
        const fid = user.fid;
        const data = await getNotifications(fid);
        setNotifications(data.notifications); 
    }

    useEffect(() => {
        if (isDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isDropdownOpen]);

    return (
        <div className='relative'>
            <button type="button" className="sm:p-2 p-1 rounded-full relative sm:bg-secondery dark:text-white" onClick={toggleDropdown}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 max-sm:hidden">
                    <path d="M5.85 3.5a.75.75 0 00-1.117-1 9.719 9.719 0 00-2.348 4.876.75.75 0 001.479.248A8.219 8.219 0 015.85 3.5zM19.267 2.5a.75.75 0 10-1.118 1 8.22 8.22 0 011.987 4.124.75.75 0 001.48-.248A9.72 9.72 0 0019.266 2.5z" />
                    <path fillRule="evenodd" d="M12 2.25A6.75 6.75 0 005.25 9v.75a8.217 8.217 0 01-2.119 5.52.75.75 0 00.298 1.206c1.544.57 3.16.99 4.831 1.243a3.75 3.75 0 107.48 0 24.583 24.583 0 004.83-1.244.75.75 0 00.298-1.205 8.217 8.217 0 01-2.118-5.52V9A6.75 6.75 0 0012 2.25zM9.75 18c0-.034 0-.067.002-.1a25.05 25.05 0 004.496 0l.002.1a2.25 2.25 0 11-4.5 0z" clipRule="evenodd" />
                </svg>
                <div className="absolute top-0 right-0 -m-1 bg-red-600 text-white text-xs px-1 rounded-full"></div>
                <IonIcon icon={notificationsOutline} className="sm:hidden text-2xl" />
            </button>

            {isDropdownOpen && (
                <div ref={dropdownRef} className="absolute top-full right-0 mt-2 bg-white pr-1.5 rounded-lg drop-shadow-xl dark:bg-slate-700 w-[365px] border2 z-10">
                    <div className="flex items-center justify-between gap-2 p-4 pb-2">
                        <h3 className="font-bold text-xl">Notifications</h3>
                    </div>
                    <div className="text-sm h-[400px] w-full overflow-y-auto pr-2">
                        <div className="pl-2 p-1 text-sm font-normal dark:text-white">
                            {notifications && notifications.map((item, index) => {
                                if (item.type === "mention") {
                                    return (
                                        <Link key={index} href={`/${item?.cast?.author?.username}/${item?.cast.hash}`} className="relative flex items-center gap-3 p-2 duration-200 rounded-xl pr-10 hover:bg-secondery dark:hover:bg-white/10 bg-teal-500/5">
                                            <div className="relative w-8 h-8 shrink-0">
                                                <Image src={item?.cast?.author?.pfp_url} alt="Profile" className="object-cover w-full h-full rounded-full" width={48} height={48} />
                                            </div>
                                            <div className="flex-1">
                                                <p><b className="font-bold mr-1"> {item?.cast?.author?.display_name}</b> Mentioned you in a post!</p>
                                                <div className="text-xs text-gray-500 mt-1.5 dark:text-white/80">{getRelativeTime(item?.cast?.timestamp)}</div>
                                            </div>
                                        </Link>
                                    );
                                }
                                if (item.type === "follows") { 
                                    return item?.follows?.map((follow, i) => (
                                        <Link key={i} href={`/profile/${follow?.user?.fid}`} className="relative flex items-center gap-3 p-2 duration-200 rounded-xl pr-10 hover:bg-secondery dark:hover:bg-white/10 bg-teal-500/5">
                                            <div className="relative w-8 h-8 shrink-0">
                                                <Image src={follow?.user?.pfp_url} alt="Profile" className="object-cover w-full h-full rounded-full" width={48} height={48} />
                                            </div>
                                            <div className="flex-1">
                                                <p><b className="font-bold mr-1"> {follow?.user?.display_name}</b> Followed you</p> 
                                            </div>
                                        </Link>
                                    ));
                                }
                                if (item.type === "likes") { 
                                    return item?.reactions?.map((like,index)=> (
                                        <Link key={index} href={`/${item?.cast?.author?.username}/${like?.cast.hash}`} className="relative flex items-center gap-3 p-2 duration-200 rounded-xl pr-10 hover:bg-secondery dark:hover:bg-white/10 bg-teal-500/5">
                                            <div className="relative w-8 h-8 shrink-0">
                                                <Image src={like?.user?.pfp_url} alt="Profile" className="object-cover w-full h-full rounded-full" width={48} height={48} />
                                            </div>
                                            <div className="flex-1">
                                                <p><b className="font-bold mr-1"> {like?.user?.display_name}</b> Liked your post.</p>
                                                <div className="text-xs text-gray-500 mt-1.5 dark:text-white/80">{getRelativeTime(item?.most_recent_timestamp)}</div>
                                            </div>
                                        </Link>
                                    ));
                                }
                                return null;
                            })}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Notifications;
