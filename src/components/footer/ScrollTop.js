"use client";
import React, { useEffect, useState } from 'react';

const ScrollTop = () => {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => { 
        if (typeof window !== 'undefined') {
            const toggleVisibility = () => {
            
                window.scrollY > 400 ? setIsVisible(true) : setIsVisible(false)
            }
            window.addEventListener("scroll", toggleVisibility)
    
            return () => {
                window.removeEventListener("scroll", toggleVisibility)
            }
          } 
        
    }, [])

    const scrollToTop = () => {
        isVisible &&
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            })
    }
    return (
        <button
            className={`fixed bottom-4 right-4 rounded-full p-2 outline-none transition-opacity duration-200 bg-blue-600 text-white ${isVisible ? "opacity-100" : "opacity-0"
                }`}
            onClick={scrollToTop} 
        >
            <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
            </svg>

        </button>
    );
};

export default ScrollTop;