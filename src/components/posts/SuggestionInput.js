'use client';
import React, { useState, useEffect, useRef, useCallback } from "react";
import { searchUsers } from "@/lib/farcaster";
import Image from "next/image";
import { debounce } from "lodash";


const SuggestionInput = ({ value, setValue }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null); 

  const debouncedSearch = useCallback(
    debounce(async (query) => {
      const users = await searchUsers(query);
      setSuggestions(users);
      setShowSuggestions(true);
    }, 300),
    []
  );

  const handleChange = (e) => {
    const text = e.target.value;
    setValue(text);

    if (text.includes("@")) {
      const query = text.split("@").pop().trim();
      debouncedSearch(query);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (username) => {
    const text = value.split("@");
    text.pop();
    setValue(text.join("@") + "@" + username + " ");
    setShowSuggestions(false);
  }; 
  

  const highlightText = (text) => {
    return text.split(/(@\w+)/).map((part, index) => {
      if (part.startsWith("@")) {
        return `<span class="highlight">${part}</span>`;
      }
      return part;
    }).join("");
  };

  useEffect(() => {
    if (inputRef.current) { 
      inputRef.current.innerHTML = highlightText(value);
      inputRef.current.style.color="blue";
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  }, [value]); 
 
  
  return (
    <div className="flex-1 ">
      <textarea
        ref={inputRef}
        className={` w-full relative !text-gray-600
         placeholder:!text-zinc-400
          !bg-white !border-transparent
          focus:!border-transparent
         focus:!ring-transparent
        !font-normal !text-lg
        dark:!text-white
       dark:placeholder:!text-white
        dark:!bg-slate-800`}
        rows="2"
        value={value}
        onChange={handleChange}
        placeholder="What do you have in mind?"
        style={{ overflow: 'hidden' }}
      />  

      {showSuggestions && suggestions?.length > 0 && (
        <ul className="absolute bg-white dark:bg-dark3 border rounded-lg max-w-72 z-50 overflow-y-scroll">
          {suggestions && suggestions.map((user) => (
            <li
              key={user.fid}
              onClick={() => handleSuggestionClick(user.username)}
              className="p-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 flix justify-start"
            >
              <div className="flex items-center space-x-4">
                <Image
                  src={user.pfp_url}
                  alt={user.username}
                  width={64}
                  height={64}
                  className="rounded-full w-8 h-8"
                />
                <div>
                  <p className="text-md font-bold">{user.display_name}</p>
                  <p className="text-sm text-gray-500">@{user.username}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SuggestionInput;
