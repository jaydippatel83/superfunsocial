"use client";
import React, { useContext, useRef, useState } from "react";
import { IonIcon } from "@ionic/react";
import { closeOutline, imageOutline, videocamOutline } from "ionicons/icons";
import { FarcasterContext } from "@/context/farcaster";
import { AppContext, useApp } from "@/context/AppContext";
import useLocalStorage from "@/hooks/use-local-storage-state";
import AutoResizeTextarea from "../posts/AutosizeTextArea";
import SuggestionInput from "../posts/SuggestionInput";
import Image from "next/image";
import { toast } from "react-toastify";

const CreatePostModal = () => {
  const farcasterContext = useContext(FarcasterContext);
  const { isModalOpen, toggleModal } = farcasterContext;
  const appContext = useContext(AppContext);
  const { userData } = appContext;
  if (!isModalOpen) return null;

  const [user, _1, removeUser] = useLocalStorage("user");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [embeds, setEmbeds] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [videoLoading, setVideoLoading] = useState(false);

  const fileInputRef = useRef(null);
  const videoFileInputRef = useRef(null);

  const handleFileChange = async (e) => {
    let arr = [...embeds];
    let file = e.target.files[0];
    let fileType = file.type;

    if (file) {
      setUploading(true);
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
        arr.push({ url: fileUrl, type: 'image' });
        setEmbeds(arr);
        setUploading(false);
      }
    }
  };

  const handleVideoFileChange = async (e) => {
    let arr = [...embeds];
    let file = e.target.files[0];
    let fileType = file.type;

    if (file) {
      setVideoLoading(true);
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

        const videoUrl = url.split("?")[0];
        arr.push({ url: videoUrl, type: 'video' });
        setEmbeds(arr);
        setVideoLoading(false);
      }
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleVideoButtonClick = () => {
    videoFileInputRef.current.click();
  };

  const removeEmbed = (index) => {
    setEmbeds(embeds.filter((_, i) => i !== index));
  };

  const createCast = async () => {
    setLoading(true);
    if (!user?.signerUuid) {
      setLoading(false);
      return;
    }

    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        api_key: process.env.NEXT_PUBLIC_NEYNAR_API_KEY,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        signer_uuid: user?.signerUuid,
        text: text,
        embeds,
        parent: "/superfunsocial",
      }),
    };

    fetch("https://api.neynar.com/v2/farcaster/cast", options)
      .then((response) => {
        toast.success("Cast successfully created");
        setText("");
        setEmbeds([]);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });

    toggleModal();
  };

  return (
    <div className="fixed inset-0 z-[99] flex items-center justify-center">
      <div
        className="fixed inset-0 bg-gray-500 bg-opacity-10 backdrop-blur-sm"
        onClick={toggleModal}
      ></div>
      <div className="bg-white dark:bg-dark3 rounded-lg shadow-lg w-full max-w-2xl mx-auto z-10">
        <div className="flex justify-between items-center pb-2 mb-4 p-6">
          <h2 className="text-lg font-semibold">Create Post</h2>
          <button onClick={toggleModal} className="text-xl">
            <IonIcon icon={closeOutline} />
          </button>
        </div>
        <hr />
        <div className="p-6 overflow-y-scroll max-h-96">
          <div className="flex justify-start">
            <Image src={userData?.pfp.url} width={50} height={50} className="w-10 h-10 rounded-full" />
            <SuggestionInput setValue={setText} value={text} />
          </div>

          {embeds.map((embed, index) => (
            <div key={index} className="relative mt-4">
              {embed.type === 'image' && (
                <img
                  src={embed.url}
                  alt={`embed-${index}`}
                  className="rounded-lg max-h-96"
                />
              )}
              {embed.type === 'video' && (
                <video
                  src={embed.url}
                  controls
                  className="rounded-lg max-h-96"
                />
              )}
              <button
                className="absolute top-1 right-1 bg-gray-200 rounded-full p-1 w-8 h-8"
                onClick={() => removeEmbed(index)}
              >
                <IonIcon icon={closeOutline} className="text-gray-600 text-xl" />
              </button>
            </div>
          ))}
          <input
            type="file"
            name="myImage"
            accept="image/png, image/gif, image/jpeg"
            onChange={handleFileChange}
            ref={fileInputRef}
            style={{ display: "none" }}
          />
          <input
            type="file"
            name="myVideo"
            accept="video/mp4,video/x-m4v,video/*"
            onChange={handleVideoFileChange}
            ref={videoFileInputRef}
            style={{ display: "none" }}
          />
          <div className="flex items-center justify-between mt-4">
            <div className="flex gap-2">
              <button
                className="flex items-center gap-1 px-3 py-1.5 rounded-full text-blue-600 bg-blue-100"
                onClick={handleButtonClick}
              >
                {!uploading ? <IonIcon icon={imageOutline} /> :
                  <div className="flex justify-center align-middle h-6">
                    <div className="w-6 h-6 border-4 border-t-blue-500 border-solid rounded-full animate-spin"></div>
                  </div>
                }
              </button>
              <div
                className="flex items-center gap-1 px-3 py-1.5 rounded-full text-red-600 bg-red-100"
                onClick={handleVideoButtonClick}
              >
                {!videoLoading ? <IonIcon icon={videocamOutline} /> :
                  <div className="flex justify-center align-middle h-6">
                    <div className="w-6 h-6 border-4 border-t-blue-500 border-solid rounded-full animate-spin"></div>
                  </div>
                }
              </div>
            </div>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={createCast}
              disabled={!text || uploading || videoLoading}
            >
              {loading ? "Creating..." : "Create"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePostModal;
