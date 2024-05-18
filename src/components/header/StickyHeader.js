'use client';
import { IonIcon } from '@ionic/react';
import React, { useState } from 'react';

const StickyHeader = () => {
    const [activeTab, setActiveTab] = useState('All');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
    return (
        <div className="flex items-center justify-between mt-3  border-gray-100 px-2 max-lg:flex-col dark:border-slate-700 sticky top-16 border  bg-white z-50">
         <nav className="flex gap-0.5 rounded-xl -mb-px text-gray-600 font-medium text-[15px] dark:text-white max-md:w-full max-md:overflow-x-auto">
          {['All', 'Memes', 'Polls'].map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabClick(tab)}
              className={`inline-block py-3 leading-8 px-3.5 ${
                activeTab === tab ? 'border-b-2 border-blue-600 text-blue-600' : ''
              }`}
            >
              {tab}
            </button>
          ))} 
        </nav>
      </div>
    );
};

export default StickyHeader;