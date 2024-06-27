"use client";
import { IonIcon } from "@ionic/react";
import React, { useRef, useState } from "react";
import { closeOutline, cameraOutline } from "ionicons/icons";
import Image from "next/image";
import { useNeynarContext } from "@neynar/react";
import axios from "axios";
import { toast } from "react-toastify";

const EditProfileModal = ({ isModalOpen, toggleModal, userData }) => {
  const [url, setUrl] = useState(userData.pfp_url);
  const fileInputRef = useRef(null);
  const [loader, setLoader] = useState(userData.pfp_url);
  const [loading, setLoading] = useState(false);
  const { user } = useNeynarContext();

  const [profile, setProfile] = useState({
    username: userData?.username,
    displayName: userData?.display_name,
    bio: userData.profile.bio.text,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (!user) {
      return;
    }

    const headers = {
      accept: "application/json",
      api_key: process.env.NEXT_PUBLIC_NEYNAR_API_KEY,
      contentType: "application/json",
    };

    await axios.patch(
      "https://api.neynar.com/v2/farcaster/user",
      {
        signer_uuid: user?.signer_uuid,
        bio: profile.bio,
        pfp_url: url,
        username: profile.username,
        display_name: profile.displayName,
      },
      {
        headers: headers,
      }
    );
    toast.success("Updated profile successfully!");
    setLoading(false);
    toggleModal();
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleUpload = async (e) => {
    setLoader(true);
    let file = e.target.files[0];
    let fileType = file.type;

    if (file) {
      const { url } = await fetch(
        "https://frame-backend-z2b9.onrender.com/s3/bucket"
      ).then((res) => res.json());

      if (url) {
        await fetch(url, {
          method: "PUT",
          headers: {
            "Content-Type": fileType,
          },
          body: file,
        });
        const fileUrl = url.split("?")[0];
        setUrl(fileUrl);
        setLoader(false);
      }
    }
    setLoader(false);
  };

  return (
    <>
      <button
        onClick={toggleModal}
        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full"
      >
        Edit Profile
      </button>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-10 backdrop-blur-sm z-[99]">
          <div className="bg-white rounded-lg w-full max-w-xl relative">
            <div className="flex justify-between items-center pb-2 mb-4 p-6">
              <h2 className="text-lg font-semibold">Edit Profile</h2>
              <button onClick={toggleModal} className="text-xl">
                <IonIcon icon={closeOutline} />
              </button>
            </div>
            <hr />
            <form onSubmit={handleSubmit} className=" mx-auto p-5">
              <div className="items-center mb-4 relative mx-auto w-fit">
                <Image
                  width={48}
                  height={48}
                  src={url}
                  alt={userData.username}
                  className="w-20 h-20 rounded-full "
                />
                <input
                  type="file"
                  name="myImage"
                  accept="image/png, image/gif, image/jpeg"
                  onChange={handleUpload}
                  ref={fileInputRef}
                  style={{ display: "none" }}
                />
                <button
                  onClick={handleButtonClick}
                  type="button"
                  className="text-blue-500 absolute bottom-[-15px] right-0"
                >
                  <IonIcon icon={cameraOutline} size="large">
                    {" "}
                  </IonIcon>
                </button>
              </div>

              <div className="mb-4">
                <label htmlFor="username" className="block text-gray-700">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={profile.username}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="displayName" className="block text-gray-700">
                  Display Name
                </label>
                <input
                  type="text"
                  id="displayName"
                  name="displayName"
                  value={profile.displayName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="bio" className="block text-gray-700">
                  Bio
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  value={profile.bio}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-blue-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                disabled={loading}
              >
                {loading ? "Updating...." : "Update Profile"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfileModal;
