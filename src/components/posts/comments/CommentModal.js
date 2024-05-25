'use client';
import React from 'react';
import { IonIcon } from '@ionic/react';
import { closeOutline } from 'ionicons/icons';

const CommentModal = ({ isOpen, onClose, parentPost }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-10 backdrop-blur-sm z-[99]">
      <div className="bg-white rounded-lg w-full max-w-xl p-6 relative">
        <button onClick={onClose} className="absolute top-2 right-2">
          <IonIcon icon={closeOutline} className="text-2xl" />
        </button>
        <div className="flex items-start gap-3 mb-4">
          <img src={parentPost.author.pfp_url} alt="" className="w-12 h-12 rounded-full" />
          <div className="flex-1">
            <h4 className="font-bold">{parentPost.author.display_name}</h4>
            <p className="text-gray-600">@{parentPost.author.username}</p>
            <p className="mt-2">{parentPost.text}</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <img src="/assets/images/avatars/avatar-7.jpg" alt="" className="w-10 h-10 rounded-full" />
          <div className="flex-1">
            <textarea
              placeholder="Post your reply"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows="4"
            ></textarea>
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <button className="bg-blue-500 text-white rounded-full px-4 py-2">Reply</button>
        </div>
      </div>
    </div>
  );
};

export default CommentModal;
