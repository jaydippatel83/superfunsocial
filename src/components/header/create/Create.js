'use client';
import { IonIcon } from '@ionic/react';
import { addCircleOutline, chevronBack, chevronForward } from 'ionicons/icons';
import React, { useEffect, useRef, useState } from 'react';

const Create = () => {
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
        <div className='relative'>
            <button onClick={toggleDropdown} type="button"  className="sm:p-2 p-1 rounded-full relative sm:bg-secondery dark:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5 max-sm:hidden">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"></path>
                </svg>
                <IonIcon name={addCircleOutline} className="sm:hidden text-2xl "></IonIcon>
            </button>

            {isDropdownOpen && (
                <div ref={dropdownRef} className="absolute top-full right-0 mt-2 bg-white p-4 rounded-lg overflow-hidden drop-shadow-xl dark:bg-slate-700 md:w-[324px] w-screen border2">
                    <h3 className="font-bold text-md">Create</h3>
                    <div className="mt-4 relative">
                        <div className="uk-slider-container pb-1 ">
                            <ul className="uk-slider-items grid-small">
                                <li className="w-28">
                                    <div className="p-3 px-4 rounded-lg bg-teal-100/60 text-teal-600 dark:text-white dark:bg-dark4">
                                        <IonIcon icon="book" className="text-2xl drop-shadow-md" />
                                        <div className="mt-1.5 text-sm font-medium">Story</div>
                                    </div>
                                </li>
                                <li className="w-28">
                                    <div className="p-3 px-4 rounded-lg bg-sky-100/60 text-sky-600 dark:text-white dark:bg-dark4">
                                        <IonIcon icon="camera" className="text-2xl drop-shadow-md" />
                                        <div className="mt-1.5 text-sm font-medium">Post</div>
                                    </div>
                                </li>
                                <li className="w-28">
                                    <div className="p-3 px-4 rounded-lg bg-purple-100/60 text-purple-600 dark:text-white dark:bg-dark4">
                                        <IonIcon icon="videocam" className="text-2xl drop-shadow-md" />
                                        <div className="mt-1.5 text-sm font-medium">Reel</div>
                                    </div>
                                </li>
                                <li className="w-28">
                                    <div className="p-3 px-4 rounded-lg bg-pink-100/60 text-pink-600 dark:text-white dark:bg-dark4">
                                        <IonIcon icon="location" className="text-2xl drop-shadow-md" />
                                        <div className="mt-1.5 text-sm font-medium">Location</div>
                                    </div>
                                </li>
                                <li className="w-28">
                                    <div className="p-3 px-4 rounded-lg bg-sky-100/70 text-sky-600 dark:text-white dark:bg-dark4">
                                        <IonIcon icon="happy" className="text-2xl drop-shadow-md" />
                                        <div className="mt-1.5 text-sm font-medium">Status</div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="dark:hidden">
                            <a className="absolute -translate-y-1/2 top-1/2 -left-4 flex items-center w-8 h-full px-1.5 justify-start bg-gradient-to-r from-white via-white dark:from-slate-600 dark:via-slate-500 dark:from-transparent dark:via-transparent" href="#" uk-slider-item="previous">
                                <IonIcon icon={chevronBack} className="text-xl dark:text-white" />
                            </a>
                            <a className="absolute -translate-y-1/2 top-1/2 -right-4 flex items-center w-8 h-full px-1.5 justify-end bg-gradient-to-l from-white via-white dark:from-transparent dark:via-transparent" href="#" uk-slider-item="next">
                                <IonIcon icon={chevronForward} className="text-xl dark:text-white" />
                            </a>
                        </div>
                        <div className="justify-center mt-2 -mb-2 hidden dark:flex">
                            <ul className="inline-flex flex-wrap justify-center gap-1 uk-dotnav uk-slider-nav"> </ul>
                        </div>
                    </div>
                    <ul className="-m-1 mt-4 pb-1 text-xs text-gray-500 dark:text-white">
                        <li className="flex items-center gap-4 hover:bg-secondery rounded-md p-1.5 cursor-pointer dark:hover:bg-white/10">
                            <img src="/assets/images/icons/group.png" alt="" className="w-7" />
                            <div className="flex-1">
                                <a href="timeline.html">
                                    <h4 className="font-medium text-sm text-black dark:text-white">Groups</h4>
                                </a>
                                <div className="mt-1 text-xs text-gray-500 dark:text-white">Meet people with similar interests.</div>
                            </div>
                        </li>
                        <li className="flex items-center gap-4 hover:bg-secondery rounded-md p-1.5 cursor-pointer dark:hover:bg-white/10">
                            <img src="/assets/images/icons/page.png" alt="" className="w-7" />
                            <div className="flex-1">
                                <a href="timeline.html">
                                    <h4 className="font-medium text-sm text-black dark:text-white">Pages</h4>
                                </a>
                                <div className="mt-1">Find and connect with businesses.</div>
                            </div>
                        </li>
                        <li className="flex items-center gap-4 hover:bg-secondery rounded-md p-1.5 cursor-pointer dark:hover:bg-white/10">
                            <img src="/assets/images/icons/event.png" className="w-7" />
                            <div className="flex-1">
                                <a href="timeline.html">
                                    <h4 className="font-medium text-sm text-black dark:text-white">Event</h4>
                                </a>
                                <div className="mt-1">Discover fun activities near you.</div>
                            </div>
                        </li>
                        <li className="flex items-center gap-4 hover:bg-secondery rounded-md p-1.5 cursor-pointer dark:hover:bg-white/10">
                            <img src="/assets/images/icons/market.png" className="w-8 -ml-1" />
                            <div className="flex-1">
                                <a href="timeline.html">
                                    <h4 className="font-medium text-sm text-black dark:text-white">Event</h4>
                                </a>
                                <div className="mt-1">Find local buyers and sellers.</div>
                            </div>
                        </li>
                        <li className="flex items-center gap-4 hover:bg-secondery rounded-md p-1.5 cursor-pointer dark:hover:bg-white/10">
                            <img src="/assets/images/icons/game.png" alt="" className="w-7" />
                            <div className="flex-1">
                                <a href="timeline.html">
                                    <h4 className="font-medium text-sm text-black dark:text-white">Games</h4>
                                </a>
                                <div className="mt-1">Play game with friends have fun.</div>
                            </div>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Create;