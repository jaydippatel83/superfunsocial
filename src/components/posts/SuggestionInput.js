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
    const text = e.target.innerText;
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
    const newValue = text.join("@") + "@" + username + " ";
    setValue(newValue);
    setShowSuggestions(false);
    inputRef.current.innerHTML = highlightText(newValue);
    placeCaretAtEnd(inputRef.current);
  };

  const highlightText = (text) => {
    return text.split(/(@\w+)/).map((part, index) => {
      if (part.startsWith("@")) {
        return `<span class="highlight">${part}</span>`;
      }
      return part;
    }).join("");
  };

  const placeCaretAtEnd = (el) => {
    el.focus();
    if (typeof window.getSelection != "undefined" && typeof document.createRange != "undefined") {
      const range = document.createRange();
      range.selectNodeContents(el);
      range.collapse(false);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    } else if (typeof document.body.createTextRange != "undefined") {
      const textRange = document.body.createTextRange();
      textRange.moveToElementText(el);
      textRange.collapse(false);
      textRange.select();
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.innerHTML = highlightText(value);
      placeCaretAtEnd(inputRef.current);
    }
  }, [value]);

  return (
    <div className="flex-1 ">
      <div className="relative">
      <div
        ref={inputRef}
        contentEditable
        className="ml-2 w-full relative text-gray-600 placeholder:text-zinc-400 bg-white border-transparent focus:border-transparent focus:ring-transparent font-normal text-lg dark:text-white dark:placeholder:text-white dark:bg-slate-800 outline-none"
        onInput={handleChange}
        placeholder="What do you have in mind?"
        style={{
          overflow: "hidden",
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
          padding: "0.5rem",
        }}
        data-placeholder="What do you have in mind?"
      ></div>
      {value === "" && (
        <div className="ml-2 absolute top-0 left-0 pointer-events-none p-2 text-gray-400">
          What do you have in mind?
        </div>
      )}
      <textarea
        value={value}
        onChange={() => {}}
        className="hidden"
        aria-hidden="true"
      />
      </div>

      {showSuggestions && suggestions?.length > 0 && (
        <ul className="absolute bg-white dark:bg-dark3 border rounded-lg max-w-72 z-50 overflow-y-scroll">
          {suggestions &&
            suggestions.map((user) => (
              <li
                key={user.fid}
                onClick={() => handleSuggestionClick(user.username)}
                className="p-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 flex justify-start"
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
