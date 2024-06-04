'use client';
import { createContext, useState } from "react";


export const PostcardContext = createContext();

export function PostcardContextProvider(props) {
    const [isOpen, setIsOpen] = useState(false); 
 
    return (
        <PostcardContext.Provider
            value={
                isOpen
            }
        >
            {props.children}
        </PostcardContext.Provider>
    )
}