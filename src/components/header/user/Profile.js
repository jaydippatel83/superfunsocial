"use client";
import Link from "next/link";
import React, {
  useState,
  useRef,
  useEffect,
} from "react";
import Image from "next/image";
import { useNeynarContext } from "@neynar/react";
import { useRouter } from "next/navigation";

const Profile = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNightMode, setIsNightMode] = useState(false);
  const dropdownRef = useRef(null);
  const { user, logoutUser } = useNeynarContext(); 

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };


  const toggleNightMode = () => {
    setIsNightMode(!isNightMode);
    if (isNightMode) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(!isDropdownOpen);
    }
  };

  useEffect(() => {
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);



  return (
    <div className="relative">
      {user ? (
        <>
          <div
            className="rounded-full relative bg-secondery cursor-pointer shrink-0"
            onClick={toggleDropdown}
          >
            <Image
              src={
                user?.pfp_url !== ""
                  ? user?.pfp_url
                  : "assets/images/avatars/avatar-2.jpg"
              }
              alt=""
              width={50}
              height={50}
              className="sm:w-9 sm:h-9 w-7 h-7 rounded-full shadow shrink-0"
            />
          </div>

          {isDropdownOpen && (
            <div
              ref={dropdownRef}
              className="absolute top-full right-0 mt-2 bg-white rounded-lg drop-shadow-xl dark:bg-slate-700 w-64 border2 z-10"
            >
              <Link href={`/profile/${user.fid}`}>
                <div className="p-4 py-5 flex items-center gap-4">
                  <Image
                    src={
                      user?.pfp_url !== ""
                        ? user?.pfp_url
                        : "assets/images/avatars/avatar-2.jpg"
                    }
                    alt=""
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full shadow"
                  />
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-black">
                      {user?.display_name}
                    </h4>
                    <div className="text-sm mt-1 text-blue-600 font-light dark:text-white/70">
                      @{user?.username}
                    </div>
                  </div>
                </div>
              </Link>

              <hr className="dark:border-gray-600/60" />

              <nav className="p-2 text-sm text-black font-normal dark:text-white">
                <button
                  type="button"
                  className="w-full"
                  onClick={toggleNightMode}
                >
                  <div className="flex items-center gap-2.5 hover:bg-secondery p-2 px-2.5 rounded-md dark:hover:bg-white/10">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                      />
                    </svg>
                    Night mode
                    <span className="bg-slate-200/40 ml-auto p-0.5 rounded-full w-9 dark:hover:bg-white/20">
                      <span
                        className={`bg-white block h-4 relative rounded-full shadow-md w-2 w-4 ${isNightMode ? "dark:bg-blue-600" : ""
                          }`}
                      ></span>
                    </span>
                  </div>
                </button>
                <hr className="-mx-2 my-2 dark:border-gray-600/60" />
                <div onClick={logoutUser} className="flex items-center gap-2.5 hover:bg-secondery p-2 px-2.5 rounded-md dark:hover:bg-white/10">
                  <svg
                    className="w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    ></path>
                  </svg>
                  Log Out
                </div>
              </nav>
            </div>
          )}
        </>
      ) : (
        <div className="flex justify-center align-middle h-10">
          <div className="w-10 h-10 border-4 border-t-blue-500 border-solid rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};

export default Profile;
