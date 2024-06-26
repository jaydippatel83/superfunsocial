"use client";
import { useState } from "react";
import { IonIcon } from "@ionic/react";

const StickyTabs = ({ tabs, setActiveTab, activeTab }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMoreDropdownOpen, setIsMoreDropdownOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleMoreDropdown = () => setIsMoreDropdownOpen(!isMoreDropdownOpen);

  return (
    <div className="flex items-center justify-between mt-3 border-gray-100 px-2 max-lg:flex-col dark:border-slate-700 sticky top-16 border bg-white dark:bg-gray-800 z-50 my-5">
      <nav className="flex gap-0.5 rounded-xl -mb-px text-gray-600 font-medium text-[15px] dark:text-white max-md:w-full max-md:overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`inline-block py-3 leading-8 px-3.5 ${
              activeTab === tab
                ? "border-b-2 border-blue-600 text-blue-600 dark:text-blue-400"
                : "text-gray-600 dark:text-gray-400"
            }`}
          >
            {tab}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default StickyTabs;
