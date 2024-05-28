'use client';
 
import React, { useState, useRef, useEffect } from 'react';

const AutoResizeTextarea = ({ value, onChange, placeholder }) => {
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; 
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;  
    }
  }, [value]);

  return (
    <textarea
      ref={textareaRef}
      className="w-full !text-black placeholder:!text-black !bg-white !border-transparent focus:!border-transparent focus:!ring-transparent !font-normal !text-xl dark:!text-white dark:placeholder:!text-white dark:!bg-slate-800"
      rows="2"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={{ overflow: 'hidden' }} 
    />
  );
};

export default AutoResizeTextarea;
