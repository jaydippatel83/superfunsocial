"use client";
import Image from "next/image";
import React, { useState, useContext } from "react";
import { FarcasterContext } from "@/context/farcaster";
import Link from "next/link";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import { contractABI } from "@/utils/contract";

const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

const DynamicFrame = ({ metadata, link }) => {
  const [loader, setLoader] = useState(false);
  const [loadingButtonIndex, setLoadingButtonIndex] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const {
    description,
    "fc:frame:image": frameImage,
    "fc:frame:post_url": postUrl,
    "fc:frame:image:aspect_ratio": aspectRatio,
    "og:title": ogTitle,
    "og:description": ogDescription,
    "og:image": ogImage,
    "og:url": ogUrl,
    ...buttons
  } = metadata;

  const farcasterContext = useContext(FarcasterContext);
  const { connectMetaMaskAndGetSigner, castVote } = farcasterContext;

  const handleButtonClick = async (buttonAction, buttonTarget, index) => {
    setLoader(true);
    setLoadingButtonIndex(index);
    console.log(
      `Button clicked: action=${buttonAction}, target=${buttonTarget}`
    );
    if (buttonAction === "post_redirect" && buttonTarget) {
      window.location.href = buttonTarget;
      setLoader(false);
      setLoadingButtonIndex(null);
    } else if (buttonAction === "post" && buttonTarget) {
      window.open(buttonTarget, "_blank");
      setLoader(false);
      setLoadingButtonIndex(null);
    } else if (buttonAction === "link" && buttonTarget) {
      window.open(buttonTarget, "_blank");
      setLoader(false);
      setLoadingButtonIndex(null);
    } else if (buttonAction === "tx" && buttonTarget) {
      try {
        await connectMetaMaskAndGetSigner();
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();

        var baseUrl = postUrl.split("?")[0];
        const apiUrl = buttonTarget.replace(
          "https://superfunsocial.vercel.app",
          "http://localhost:3002"
        );
        console.log(baseUrl, "baseUrl---be");
        baseUrl = baseUrl.replace(
          "https://superfunsocial.vercel.app",
          "http://localhost:3002"
        );

        console.log(baseUrl, "baseUrl- Ad");

        const urlParts = apiUrl.split("/");
        const pollId = urlParts[urlParts.length - 2];
        const choice = urlParts[urlParts.length - 1];
        console.log(`Extracted pollId: ${pollId}, choice: ${choice}`);

        var transaction;
        if (signer) {
          const contract = new ethers.Contract(
            contractAddress,
            contractABI,
            signer
          );
          transaction = await contract.vote(pollId, choice);
        }

        if (transaction) {
          const response = await fetch(baseUrl, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          // console.log(response, "res");
          const result = await response.json();
          console.log("API call result:", result.url);
          if (result?.url) {
            var resultUrl = result?.url.replace(
              "https://superfunsocial.vercel.app",
              "http://localhost:3002"
            );
            const response = await fetch(resultUrl, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            });
            console.log(response, "res");
            const result = await response.json();

            console.log("API call result:", result);
          }
        }

        setLoader(false);
        setLoadingButtonIndex(null);
      } catch (error) {
        setLoader(false);
        setLoadingButtonIndex(null);
        console.error("API call error:", error);
        setErrorMessage(error.reason || error.message || "An error occurred");
      }
    }
  };

  const renderButtons = () => {
    const buttonElements = [];
    for (let i = 1; buttons[`fc:frame:button:${i}`]; i++) {
      const buttonText = buttons[`fc:frame:button:${i}`];
      const buttonAction = buttons[`fc:frame:button:${i}:action`];
      let buttonTarget = buttons[`fc:frame:button:${i}:target`];

      if (buttonTarget) {
        buttonTarget = buttonTarget.replace(
          "https://superfunsocial.vercel.app",
          "http://localhost:3002"
        );
      }
      buttonElements.push(
        <button
          key={i}
          onClick={() => handleButtonClick(buttonAction, buttonTarget, i)}
          className="px-4 w-full py-2 mb-2 font-semibold text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100 hover:border-gray-400"
        >
          {loadingButtonIndex === i ? (
            <div className="w-6 h-6 border-4 border-t-blue-500 border-solid rounded-full animate-spin mx-auto"></div>
          ) : (
            buttonText
          )}
        </button>
      );
    }
    return buttonElements;
  };

  const [aspectWidth, aspectHeight] = aspectRatio.split(":").map(Number);
  return (
    <div className="max-w-4xl mx-auto my-2 bg-white border border-gray-300 rounded-lg overflow-hidden">
      {frameImage && (
        <div
          className="relative"
          style={{ paddingTop: `${(aspectHeight / aspectWidth) * 100}%` }}
        >
          <Link href={link}>
            <Image
              src={frameImage}
              alt={ogTitle}
              layout="fill"
              objectFit="cover"
              className="absolute inset-0 w-full h-full"
            />
          </Link>
        </div>
      )}
      <div className="p-2 rounded-b-lg bg-gray-300 flex justify-between">
        {renderButtons()}
      </div>
      {errorMessage && (
        <div className="mt-4 text-center text-red-500">{errorMessage}</div>
      )}
    </div>
  );
};

export default DynamicFrame;
