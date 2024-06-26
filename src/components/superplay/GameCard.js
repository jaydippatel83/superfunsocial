'use client';
import { IonIcon } from '@ionic/react';
import { arrowRedo, bookmark } from 'ionicons/icons';
import Image from 'next/image';
import React, { useContext } from 'react';
import { ethers } from 'ethers';
import { FunPassAbi } from '@/utils/FunPassAbi';
import { FarcasterContext } from '@/context/farcaster';
import { toast } from "react-toastify";

const GameCard = ({ pass }) => {


    const farcasterContext = useContext(FarcasterContext);
    const { connectMetaMaskAndGetSigner } = farcasterContext;

    async function buyPass(tokenId, price) {
        let contractAddress = "0x6020fC64A9EB25bfc6A1aB383cfeCD5460c66A3C";

        try {
            await connectMetaMaskAndGetSigner();
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();

            if (signer) {
                const contract = new ethers.Contract(
                    contractAddress,
                    FunPassAbi,
                    signer
                );

                let tx = await contract.buyFunPass(tokenId, { value: ethers.parseEther(price) });
                await tx.wait();
                toast.success("Fun Pass purchased successfully!");
            }

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="relative bg-white shadow-xl rounded-lg transition-transform transform duration-300 m-2">
            <div className="card shadow-xl">
                <div className="card-media h-60 relative">
                    <img src={pass?.image} alt={pass?.name} className="object-cover rounded-t-lg" ></img>
                </div>
                <div className="card-body p-2">
                    <div className="flex">
                        <button
                            onClick={() => buyPass(pass?.tokenId, pass?.price)}
                            type="button" className="button bg-secondery flex-1 ">Fun Pass {pass?.price}</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GameCard;