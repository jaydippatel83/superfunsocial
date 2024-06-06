'use client'
import { useState } from 'react';
import { IonIcon } from '@ionic/react';
import { search, ellipsisHorizontal, pricetagsOutline, timeOutline, flagOutline, shareOutline, stopCircleOutline, chevronDown } from 'ionicons/icons';

const StickyTabs = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMoreDropdownOpen, setIsMoreDropdownOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleMoreDropdown = () => setIsMoreDropdownOpen(!isMoreDropdownOpen);

  return (
    <div className="sticky top-16 z-50 bg-white dark:bg-gray-800 shadow   border-t border-gray-100 dark:border-slate-700">
      <div className="flex items-center justify-between px-2 py-2 max-lg:flex-col"> 
        <nav className="flex gap-0.5 rounded-xl -mb-px text-gray-600 font-medium text-[15px] dark:text-white max-md:w-full max-md:overflow-x-auto">
          <a href="#" className="inline-block py-3 leading-8 px-3.5 border-b-2 border-blue-600 text-blue-600">Timeline</a>
          <a href="#" className="inline-block py-3 leading-8 px-3.5">Feeds </a>
          <a href="#" className="inline-block py-3 leading-8 px-3.5">Replies</a>
          <a href="#" className="inline-block py-3 leading-8 px-3.5">Likes</a>  
        </nav>
      </div>
    </div>
  );
};

export default StickyTabs;
