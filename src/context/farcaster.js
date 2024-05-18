'use client';
import { createContext, useState, useEffect } from "react";
export const FarcasterContext = createContext();

export function FarcasterContextProvider(props) {
    const [isModalOpen, setModalOpen] = useState(false);

    const toggleModal = () => {
        setModalOpen(!isModalOpen);
    };

    return (
        <FarcasterContext.Provider
            value={{
                isModalOpen,
                setModalOpen,
                toggleModal
            }}
        >
            {props.children}
        </FarcasterContext.Provider>
    );
}