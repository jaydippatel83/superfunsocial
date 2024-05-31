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

const CreatePostModal = () => {
  const farcasterContext = useContext(FarcasterContext); 
  const { isModalOpen, toggleModal } = farcasterContext;
  const appContext = useContext(AppContext);
  const  { userData} = appContext;
  if (!isModalOpen) return null;
 
  const [user, _1, removeUser] = useLocalStorage("user");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [embeds, setEmbeds] = useState([]);
  const [uploading, setUploading] = useState(false);

  const fileInputRef = useRef(null);
  const videoFileInputRef = useRef(null);

  const handleFileChange = async (e) => {
    let arr = [];
    let file = e.target.files[0];
    let fileType = file.type;
    // get secure url from our server

    if (file) {
      setUploading(true);
      const { url } = await fetch(
        "https://frame-backend-z2b9.onrender.com/s3/bucket"
      ).then((res) => res.json());

      // post the image direclty to the s3 bucket
      if (url) {
        await fetch(url, {
          method: "PUT",
          headers: {
            "Content-Type": fileType,
          },
          body: file,
        });

        const imageUrl = url.split("?")[0];
        // console.log(imageUrl, "imageUrl");

        arr.push({ url: imageUrl });
        setEmbeds(arr);
        setUploading(false);
      }
    }
  };

  const handleVideoFileChange = async (e) => {
    let arr = [];
    let file = e.target.files[0];
    // Get the MIME type of the video file
    let fileType = file.type;

    // Get secure URL from our server
    if (file) {
      setUploading(true);
      const { url } = await fetch(
        "https://frame-backend-z2b9.onrender.com/s3/bucket"
      ).then((res) => res.json());

      // POST the video directly to the S3 bucket
      if (url) {
        await fetch(url, {
          method: "PUT",
          headers: {
            "Content-Type": fileType, // Use the correct MIME type for the video file
          },
          body: file,
        });

        const videoUrl = url.split("?")[0];
        // console.log(videoUrl, "videoUrl");

        arr.push({ url: videoUrl });
        setEmbeds(arr);
        setUploading(true);
      }
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleVideoButtonClick = () => {
    videoFileInputRef.current.click();
  };

  const createCast = async () => {
    setLoading(true);
    if (!user.signerUuid) {
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
        signer_uuid: user.signerUuid,
        text: text,
        embeds,
        parent: "/superfunsocial",
      }),
    };

    fetch("https://api.neynar.com/v2/farcaster/cast", options)
      .then((response) => {
        alert("Cast created");
        setText("");
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
      <div className="bg-white dark:bg-dark3 rounded-lg shadow-lg  w-full max-w-2xl mx-auto z-10">
        <div className="flex justify-between items-center pb-2 mb-4 p-6">
          <h2 className="text-lg font-semibold">Create Post</h2>
          <button onClick={toggleModal} className="text-xl">
            <IonIcon icon={closeOutline} />
          </button>
        </div>
        <hr />
        <div className="p-6 overflow-y-scroll max-h-96">
          <div className=" flex justify-start">
            <Image src={userData?.pfp.url} width={50} height={50} className="w-10 h-10 rounded-full "/>
            <AutoResizeTextarea
              value={text} 
              setText={setText}
              placeholder="What do you have in mind?"
            />
            {/* <SuggestionInput /> */}
          </div>

          {embeds.map((embed, index) => (
            <div key={index} className="mt-4">
              <img
                src={embed.url}
                alt={`embed-${index}`}
                className="rounded-lg max-h-96"
              />
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
                <IonIcon icon={imageOutline} />
              </button>
              <div
                className="flex items-center gap-1 px-3 py-1.5 rounded-full text-red-600 bg-red-100"
                onClick={handleVideoButtonClick}
              >
                <IonIcon icon={videocamOutline} />
              </div>
            </div>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={createCast}
              disabled={!text || uploading}
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
