'use client';
import { createContext, useState, useEffect } from "react";
import { createThirdwebClient, getContract, resolveMethod } from "thirdweb";
import { defineChain } from "thirdweb/chains"; 

export const FarcasterContext = createContext();

export function FarcasterContextProvider(props) {
    const [isModalOpen, setModalOpen] = useState(false);

    const toggleModal = () => {
        setModalOpen(!isModalOpen);
    };

     const client = createThirdwebClient({ 
        clientId: process.env.NEXT_PUBLIC_THIRDWAB_CLIENT_ID
      }); 
      
      const contract = getContract({ 
        client, 
        chain: defineChain(84532), 
        address:  process.env.NEXT_PUBLIC_BASE_CONTRACT_ADDRESS
      });

      

    return (
        <FarcasterContext.Provider
            value={{
                isModalOpen,
                setModalOpen,
                toggleModal,
                contract
            }}
        >
            {props.children}
        </FarcasterContext.Provider>
    );
}