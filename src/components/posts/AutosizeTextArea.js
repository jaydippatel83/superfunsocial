'use client';

import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';

const AutoResizeTextarea = ({ value, setText, placeholder }) => {
  const textareaRef = useRef(null);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [cursorPosition, setCursorPosition] = useState(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);


  // useEffect(() => {
  //   const fetchSuggestions = async (query) => {
  //     try {
  //       const response = await axios.get(`/api/user-suggestions?q=${query}`);
  //       console.log(response.data,"data");
  //       setSuggestions(response.data.users);
  //     } catch (error) {
  //       console.error('Error fetching suggestions:', error);
  //     }
  //   };

  //   if (value.includes('@')) {
  //     const query = value.split('@').pop();
  //     fetchSuggestions(query);
  //     setShowSuggestions(true);
  //   } else {
  //     setShowSuggestions(false);
  //   }
  // }, [value]);

  // const handleInputChange = (e) => {
  //   setInputValue(e.target.value);
  //   setCursorPosition(e.target.selectionStart);
  // };

  // const handleSuggestionClick = (username) => {
  //   const textBeforeAt = value.slice(0, cursorPosition).split('@')[0];
  //   const textAfterAt = value.slice(cursorPosition).split(' ').slice(1).join(' ');
  //   setText(`${textBeforeAt}@${username} ${textAfterAt}`);
  //   setShowSuggestions(false);
  //   textareaRef.current.focus();
  // };


  return (
    <div className="w-full">
      <textarea
        ref={textareaRef}
        className="w-full relative !text-gray-600
         placeholder:!text-zinc-400
          !bg-white !border-transparent
          focus:!border-transparent
       focus:!ring-transparent
       !font-normal !text-lg
        dark:!text-white
       dark:placeholder:!text-white
        dark:!bg-slate-800"
        rows="2"
        value={value}
        onChange={(e) => setText(e.target.value)}
        placeholder={placeholder}
        style={{ overflow: 'hidden' }}
      />
      {showSuggestions && (
        <ul className="absolute bg-white border rounded mt-1 w-auto">
          {suggestions?.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion.username)}
              className="p-2 hover:bg-gray-200 cursor-pointer flex justify-start"
            >
              <img src={suggestion.pfp_url} alt={suggestion.username} className="w-8 h-8 rounded-full inline-block mr-2" />
              <div >
                <p>{suggestion.display_name}</p>
                <span className="text-gray-500">@{suggestion.username}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutoResizeTextarea;
