"use client";
import { formatNumber } from "@/lib/utils";
import { useNeynarContext } from "@neynar/react";
import Image from "next/image";
import Link from "next/link";
import EditProfileModal from "../modals/EditProfileModal";
import { useState } from "react";

const ProfileHeader = ({ userData }) => {
  const { user } = useNeynarContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
      setIsModalOpen(!isModalOpen);
  }

  return (
    <div className="p-4 md:mt-5 bg-white dark:bg-gray-800 shadow   border-t border-gray-100 dark:border-slate-700">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Image
            src={userData.pfp_url}
            alt={userData.username}
            width={64}
            height={64}
            className="rounded-full w-20 h-20"
          />
          <div>
            <h1 className="text-lg font-bold">{userData.display_name}</h1>
            <p className="text-sm text-gray-500">@{userData.username}</p>
          </div>
        </div>
        {userData.fid == user?.fid && (
           <EditProfileModal isModalOpen={isModalOpen} toggleModal={toggleModal} userData={userData} />
        )}
      </div>
      <div className="items-center ">
        <p className="mt-1">{userData.profile.bio.text}</p>
        <div className="flex items-center mt-2 text-gray-500">
          <Link
            href={`/${userData.username}-${user?.fid}/following`}
            className="mt-1 text-gray-900 "
          >
            <span className="mr-4">
              <span className="text-black font-bold">
                {formatNumber(userData?.following_count)}
              </span>{" "}
              Following
            </span>
          </Link>
          <Link
            href={`/${userData.username}-${user?.fid}/followers`}
            className="mt-1 text-gray-900  "
          >
            <span>
              <span className="text-black font-bold">
                {formatNumber(userData?.follower_count)}
              </span>{" "}
              Followers
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
