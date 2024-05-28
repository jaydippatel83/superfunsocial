'use client'; 
import React, { useState, useEffect, useRef } from 'react';

const users = [
  { username: 'mans', displayName: 'Rolands', avatar: 'https://example.com/avatar1.jpg' },
  { username: 'mansijoshi', displayName: 'Mansi', avatar: 'https://example.com/avatar2.jpg' },
  { username: '0xmans', displayName: 'Mans', avatar: 'https://example.com/avatar3.jpg' },
  { username: 'ibzaq', displayName: 'Mansa', avatar: 'https://example.com/avatar4.jpg' },
  { username: 'mansamusa', displayName: 'Mansa', avatar: 'https://example.com/avatar5.jpg' }, 
];

const SuggestionInput = () => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputValue.startsWith('@')) {
      const searchQuery = inputValue.slice(1).toLowerCase();
      const filteredUsers = users.filter(user => user.username.toLowerCase().includes(searchQuery));
      setSuggestions(filteredUsers);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [inputValue]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSuggestionClick = (username) => {
    setInputValue(`@${username}`);
    setShowSuggestions(false);
  };

  return (
    <div className="relative">
      <textarea
        ref={inputRef}
        className="w-full text-black placeholder:text-black bg-white border-transparent focus:border-transparent focus:ring-transparent font-normal text-xl dark:text-white dark:placeholder:text-white dark:bg-slate-800"
        rows="2"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="What do you have in mind?"
      />
      {showSuggestions && (
        <div className="absolute left-0 right-0 mt-1 bg-white shadow-lg rounded-lg z-30">
          {suggestions.map((user, index) => (
            <div
              key={index}
              className="flex items-center p-2 cursor-pointer hover:bg-gray-100"
              onClick={() => handleSuggestionClick(user.username)}
            >
              <img src={user.avatar} alt={user.username} className="w-8 h-8 rounded-full" />
              <div className="ml-2">
                <div className="font-semibold">{user.displayName}</div>
                <div className="text-gray-500">@{user.username}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SuggestionInput;
