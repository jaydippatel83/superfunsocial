"use client";
import Image from "next/image";
import React, { useState, useContext, useEffect } from "react";
import { FarcasterContext } from "@/context/farcaster";
import Link from "next/link";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import { contractABI } from "@/utils/contract";

const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

const DynamicFrame = ({ metadata, link }) => {
  const [data, setData] = useState(metadata);
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
  } = data;

  const farcasterContext = useContext(FarcasterContext);
  const { connectMetaMaskAndGetSigner, castVote } = farcasterContext;

  useEffect(() => {
    if (!aspectRatio) {
      setData((prevData) => ({
        ...prevData,
        "fc:frame:image:aspect_ratio": "1:1",
      }));
    }
  }, [aspectRatio]);

  const handleButtonClick = async (buttonAction, buttonTarget, index) => {
    if (typeof window !== "undefined") {
      setLoader(true);
      setLoadingButtonIndex(index);
      var currentPollId;
      var currentChoice;

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
            "https://demo.superfun.social",
            "https://demo.superfun.social"
          );

          baseUrl = baseUrl.replace(
            "https://demo.superfun.social",
            "https://demo.superfun.social"
          );

          const urlParts = apiUrl.split("/");
          const pollId = urlParts[urlParts.length - 2];
          currentPollId = pollId;
          const choice = urlParts[urlParts.length - 1];
          currentChoice = choice;

          var transaction;
          if (signer && pollId !== "voted") {
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
                "Access-Control-Allow-Origin": "*",
              },
            });
            const result = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(result, "text/html");

            const metaElements = doc.head.querySelectorAll("meta");
            const metaTags = Array.from(metaElements).map((meta) => ({
              property: meta.getAttribute("property"),
              content: meta.getAttribute("content"),
            }));
            const updatedData = {};
            metaTags.forEach((meta) => {
              updatedData[meta.property] = meta.content;
            });
            setData(updatedData);

            if (result?.url) {
              var resultUrl = result?.url.replace(
                "http://demo.superfun.social",
                "https://demo.superfun.social"
              );
              const response = await fetch(resultUrl, {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  "Access-Control-Allow-Origin": "*",
                },
              });
              const result = await response.json();
              setData((prevData) => ({
                ...prevData,
                "fc:frame:image": result.image,
                "fc:frame:image:aspect_ratio": "1:1",
              }));
            }
          }

          if (pollId === "voted") {
            const previewUrl = `https://demo.superfun.social/api/voted/${choice}`;
            const response = await fetch(previewUrl, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
              },
            });
            const result = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(result, "text/html");

            const metaElements = doc.head.querySelectorAll("meta");
            const metaTags = Array.from(metaElements).map((meta) => ({
              property: meta.getAttribute("property"),
              content: meta.getAttribute("content"),
            }));
            const updatedData = {};
            metaTags.forEach((meta) => {
              updatedData[meta.property] = meta.content;
            });
            setData(updatedData);
          }

          setLoader(false);
          setLoadingButtonIndex(null);
        } catch (error) {
          toast.error(error.reason || error.message || "An error occurred");
          if (error.reason == "You have already voted!") {
            var getVotesUrl;
            if (currentPollId !== "voted") {
              getVotesUrl = `https://demo.superfun.social/api/voted/${currentPollId}`;
            } else if (currentPollId == "voted") {
              getVotesUrl = `https://demo.superfun.social/api/voted/${currentChoice}`;
            }
            const response = await fetch(getVotesUrl, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
              },
            });
            const result = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(result, "text/html");

            const metaElements = doc.head.querySelectorAll("meta");
            const metaTags = Array.from(metaElements).map((meta) => ({
              property: meta.getAttribute("property"),
              content: meta.getAttribute("content"),
            }));
            const updatedData = {};
            metaTags.forEach((meta) => {
              updatedData[meta.property] = meta.content;
            });
            setData(updatedData);
          }
          setLoader(false);
          setLoadingButtonIndex(null);
        }
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
          "http://superfunsocial.vercel.app",
          "https://demo.superfun.social"
        );
      }
      buttonElements.push(
        <button
          key={i}
          onClick={() => handleButtonClick(buttonAction, buttonTarget, i)}
          className="px-4 w-full py-2  m-1.5 font-semibold text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100 hover:border-gray-400"
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

  const [aspectWidth, aspectHeight] = aspectRatio
    ? aspectRatio.split(":").map(Number)
    : [1, 1];
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
      <div className="rounded-b-lg bg-gray-300 flex justify-between">
        {renderButtons()}
      </div>
    </div>
  );
};

export default DynamicFrame;
