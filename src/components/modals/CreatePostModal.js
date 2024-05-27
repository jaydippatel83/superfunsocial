"use client";
import React, { useContext, useRef, useState } from "react";
import { IonIcon } from "@ionic/react";
import {
  closeOutline,
  imageOutline, 
} from "ionicons/icons";
import { FarcasterContext } from "@/context/farcaster";
import { useApp } from "@/context/AppContext";
import useLocalStorage from "@/hooks/use-local-storage-state"; 
import AutoResizeTextarea from "../posts/AutosizeTextArea";

const CreatePostModal = () => {
  const farcasterContext = useContext(FarcasterContext);
  const { isModalOpen, toggleModal } = farcasterContext;
  if (!isModalOpen) return null;

  const { userData } = useApp();
  const [user, _1, removeUser] = useLocalStorage("user");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [embeds, setEmbeds] = useState([]);

  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    let arr = [];
    let file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file); 
      arr.push({ url: imageUrl });
    }
    setEmbeds(arr);
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  }; 


  const createCast = async () => {
    setLoading(true);
    if (!user.signerUuid) {
      setLoading(false);
      return;
    }

    const req = await fetch("/api/casts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        signerUid: user.signerUuid,
        text,
        embeds,
      }),
    });

    if (req.ok) {
      alert("Cast created");

      setText("");
      setLoading(false);
    } else {
      alert("Failed to create cast");
      setLoading(false);
    }

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
          <div className="space-y-2  p-2"> 
            <AutoResizeTextarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="What do you have in mind?"
            />
          </div>

          {embeds.map((embed, index) => (
            <div key={index} className="mt-4">
              <img src={embed.url} alt={`embed-${index}`} className="rounded-lg max-h-96" />
            </div>
          ))} 
          <input
            type="file"
            name="myImage"
            accept="image/png, image/gif, image/jpeg"
            onChange={handleFileChange}
            ref={fileInputRef}
            style={{ display: 'none' }}
          />
          <div className="flex items-center justify-between mt-4">
            <div className="flex gap-2">
              <button
                className="flex items-center gap-1 px-3 py-1.5 rounded-full text-blue-600 bg-blue-100"
                onClick={handleButtonClick}
              >
                <IonIcon icon={imageOutline} />
              </button>
            </div>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={createCast}
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
