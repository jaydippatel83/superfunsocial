'use client';
import React from 'react'; 
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useNeynarContext } from '@neynar/react';

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
    const pathname = usePathname();
    const {user} = useNeynarContext();

    const isActive = (path) => {
        return pathname.startsWith(path) && (pathname.length === path.length || pathname[path.length] === '/');
    };

    return (
        <>
            <div
                id="site__sidebar"
                className={`fixed top-0 left-0 z-[99] pt-[--m-top] overflow-hidden transition-transform duration-500 max-xl:w-full xl:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : 'max-xl:-translate-x-full'
                    }`}
            >
                <div className="p-2 max-xl:bg-white shadow-sm 2xl:w-72 sm:w-64 w-[80%] h-[calc(100vh-64px)] relative z-30 max-lg:border-r dark:max-xl:!bg-slate-700 dark:border-slate-700">
                    <div className="pr-4 overflow-y-auto h-full">
                        <nav id="side">
                            <ul>
                                <li className={` ${isActive('/') ? 'active' : ' '}`}>
                                    <Link href="/">
                                        <Image width={50} height={50} src="/assets/images/icons/feed.png" alt="fun feed" className="w-6" />
                                        <span>Fun Feed </span>
                                    </Link>
                                </li>
                                <li className={` ${isActive('/questions') ? 'active' : ' '}`}>
                                    <Link href="/questions">
                                        <Image width={50} height={50} src="/assets/images/icons/question.png" alt="q & a" className="w-6" />
                                        <span>Q & A </span>
                                    </Link>
                                </li>
                                <li className={` ${isActive('/superplay') ? 'active' : ' '}`}>
                                    <Link href="/superplay">
                                        <Image width={50} height={50} src="/assets/images/icons/game.png" alt="super play" className="w-6" />
                                        <span>Super Play </span>
                                    </Link>
                                </li>
                                <li className={` ${isActive('/contest') ? 'active' : ' '}`}>
                                    <Link href="/contest">
                                        <Image width={50} height={50} src="/assets/images/icons/trophy.png" alt="contest" className="w-6" />
                                        <span>Contest</span>
                                    </Link>
                                </li>
                                <li className={` ${isActive('/leaderboard') ? 'active' : ' '}`}>
                                    <Link href="/leaderboard">
                                        <Image width={50} height={50} src="/assets/images/icons/rank.png" alt="leaderboard" className="w-6" />
                                        <span>Leaderboard</span>
                                    </Link>
                                </li>
                                <li className={` ${isActive('/profile') ? 'active' : ' '}`}>
                                    <Link href={`/profile/${user?.fid}`}>
                                        <Image width={50} height={50} src="/assets/images/icons/user.png" alt="profile" className="w-6" />
                                        <span>Profile</span>
                                    </Link>
                                </li>

                            </ul>
                        </nav>

                    </div>
                </div>
            </div>
            <div
                id="site__sidebar__overlay"
                className={`absolute top-0 left-0 z-20 w-screen h-screen xl:hidden backdrop-blur-sm ${isSidebarOpen ? 'block' : 'hidden'
                    }`}
                onClick={toggleSidebar}
            ></div>
        </>
    );
};

export default Sidebar;
