'use client';
import React, { useEffect, useRef, useState } from 'react';
import { IonIcon } from '@ionic/react';
import { trash, search, close } from 'ionicons/icons';
import { searchUsers } from '@/lib/farcaster';
import Link from 'next/link';

const DropDown = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [searchData, setSearchData] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
      setSearchData([])
    }
  };

  const handleSearch = async (value) => { 
    setInputValue(value); 
    const data = await searchUsers(value); 
    if(data !== undefined){
      setSearchData(data);
    } 
  };

  const handleClearInput = () => {
    setInputValue('');
    setSearchData([]);
  };

  const handleClearHistory = () => { 
    setSearchData([]);
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
    <div className="flex-1 relative">
      <div className="max-w-[1080px] mx-auto flex items-center">
        <div
          id="search--box"
          className="xl:w-[680px] sm:w-96 sm:relative rounded-xl overflow-hidden z-20 bg-secondery max-md:hidden left-0 max-sm:fixed max-sm:top-2 dark:!bg-white/5"
        >
          <IonIcon icon={search} className="absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={inputValue}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search Friends..."
            className="w-full !pl-10 !font-normal !bg-transparent h-12 !text-sm"
          />
          {inputValue && (
            <IonIcon
              icon={close}
              className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
              onClick={handleClearInput}
            />
          )}
        </div>
        {searchData.length !== 0 && (
          <div ref={dropdownRef} className="absolute top-full left-0 mt-2 xl:w-[694px] sm:w-96 bg-white dark:bg-dark3 w-screen p-2 rounded-lg shadow-lg z-10">
            <div className="flex justify-between px-2 py-2.5 text-sm font-medium">
              <div className="text-black dark:text-white">Search</div>
              <button type="button" className="text-blue-500" onClick={handleClearHistory}>Clear</button>
            </div>
            <nav className="text-sm font-medium text-black dark:text-white">
              {searchData.map((user, index) => (
                <Link key={index} href={`/profile/${user.fid}`} className="relative px-3 py-1.5 flex items-center gap-4 hover:bg-secondery rounded-lg dark:hover:bg-white/10">
                  <img alt={user.username} src={user.pfp_url ? user.pfp_url : "/assets/images/icons/user.png"} className="w-9 h-9 rounded-full" />
                  <div>
                    <div>{user.display_name}</div>
                    <div className="text-xs text-blue-500 font-medium mt-0.5">@{user.username}</div>
                  </div> 
                 </Link>
              ))}
            </nav> 
          </div>
        )}
      </div>
    </div>
  );
};

export default DropDown;
