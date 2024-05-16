'use client';
import React, { useEffect, useRef, useState } from 'react';
import DarkModeComponent from '../theme/Dark';
import Link from 'next/link';
import Image from 'next/image';
import { IonIcon } from '@ionic/react';
import { search, menuOutline, closeOutline } from 'ionicons/icons';
import DropDown from './search/DropDown';
import Create from './create/Create';
import Notifications from './notification/Notifications';
import Message from './message/Message';
import Profile from './user/Profile';


const Header = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsDropdownOpen(false);
        }
    };

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
        <header className="z-[100] h-[--m-top] fixed top-0 left-0 w-full flex items-center bg-white/80 sky-50 backdrop-blur-xl border-b border-slate-200 dark:bg-dark2 dark:border-slate-800">
            <div className="flex items-center w-full xl:px-6 px-2 max-lg:gap-10">
                <div className="2xl:w-[--w-side] lg:w-[--w-side-sm]">
                    <div className="flex items-center gap-1">
                        <button
                            uk-toggle="target: #site__sidebar ; cls :!-translate-x-0"
                            className="flex items-center justify-center w-8 h-8 text-xl rounded-full hover:bg-gray-100 xl:hidden dark:hover:bg-slate-600 group"
                        >
                            <IonIcon icon={menuOutline} className="text-2xl group-aria-expanded:hidden" />
                            <IonIcon icon={closeOutline} className="hidden text-2xl group-aria-expanded:block" />
                        </button>
                        <div id="logo">
                            <Link href="/">
                                <Image
                                    src="/assets/images/logo.png"
                                    alt="Logo"
                                    width={112}
                                    height={28}
                                    className="w-28 md:block hidden dark:!hidden"
                                />
                                <Image
                                    src="/assets/images/logo-light.png"
                                    alt="Logo"
                                    width={112}
                                    height={28}
                                    className="dark:md:block hidden"
                                />
                                <Image
                                    src="/assets/images/logo-mobile.png"
                                    alt="Logo"
                                    width={80}
                                    height={20}
                                    className="hidden max-md:block w-20 dark:!hidden"
                                />
                                <Image
                                    src="/assets/images/logo-mobile-light.png"
                                    alt="Logo"
                                    width={80}
                                    height={20}
                                    className="hidden dark:max-md:block w-20"
                                />
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="flex-1 relative">
                    <div className="max-w-[1220px] mx-auto flex items-center">
                        <div
                            id="search--box"
                            className="xl:w-[680px] sm:w-96 relative rounded-xl overflow-hidden z-20 bg-secondery max-md:hidden w-screen left-0 max-sm:fixed max-sm:top-2 dark:!bg-white/5"
                        >
                            <IonIcon icon={search} className="absolute left-4 top-1/2 -translate-y-1/2" />
                            <input
                                type="text"
                                placeholder="Search Friends, videos .."
                                className="w-full !pl-10 !font-normal !bg-transparent h-12 !text-sm"
                                onClick={toggleDropdown}
                            />
                        </div>
                        {
                            isDropdownOpen && <DropDown reff={dropdownRef} />
                        }
                        <div className="flex items-center sm:gap-4 gap-2 absolute right-5 top-1/2 -translate-y-1/2 text-black">
                            <button type="button" className="sm:hidden  sm:p-2 p-1 rounded-full relative sm:bg-secondery dark:text-white">
                                <IonIcon icon={search} className="sm:hidden text-2xl" />
                            </button>
                            <Create/>
                            <Notifications/>
                            <Message/> 
                            <Profile/>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;