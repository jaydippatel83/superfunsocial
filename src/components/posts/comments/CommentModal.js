'use client';
import React, { useContext, useRef, useState } from 'react';
import { IonIcon } from '@ionic/react';
import { closeOutline,videocamOutline , imageOutline, } from 'ionicons/icons';
import AutoResizeTextarea from '../AutosizeTextArea';
import { AppContext } from '@/context/AppContext';
import Image from 'next/image';
import useLocalStorage from '@/hooks/use-local-storage-state';
import SuggestionInput from '../SuggestionInput';

const CommentModal = ({ isOpen, onClose, parentPost }) => {
  const appContext = useContext(AppContext);
  const {userData} = appContext;
  const [embeds, setEmbeds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);
  const videoFileInputRef = useRef(null);
  const [user, setUser, removeUser] = useLocalStorage("user");
  const [text, setText]= useState("");

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
        parent_author_fid: parentPost.author.fid,
        parent:  parentPost.hash,
        embeds, 
      }),
    };

    fetch("https://api.neynar.com/v2/farcaster/cast", options)
      .then((response) => {
        alert("Succesfully commented on post!");
        setText("");
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });

      onClose();
  }; 

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-10 backdrop-blur-sm z-[99]">
      <div className="bg-white rounded-lg w-full max-w-xl p-6 relative">
        <button onClick={onClose} className="absolute top-2 right-2">
          <IonIcon icon={closeOutline} className="text-2xl" />
        </button>
        <div className="flex items-start gap-3 mb-4">
          <img src={parentPost.author.pfp_url} alt="" className="w-10 h-10 rounded-full" />
          <div className="flex-1">
            <h4 className="font-bold">{parentPost.author.display_name}</h4>
            <p className="text-gray-600">@{parentPost.author.username}</p>
            <p className="mt-2 break-all">{parentPost.text}</p>
          </div>
        </div> 
        <div className="overflow-y-scroll max-h-96">
          <div className=" flex justify-start">
            <Image src={userData?.pfp.url} width={50} height={50} className="w-10 h-10 rounded-full "/> 
             <SuggestionInput setValue={setText} value={text} />
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
            <button  onClick={createCast}
              disabled={!text || uploading}
               className="bg-blue-500 text-white rounded-full px-4 py-2">{loading ? "Loading..." : "Replay"}</button>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default CommentModal;
