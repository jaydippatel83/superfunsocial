"use client";
import Layout from "@/components/layout/Layout";
import RightSIdeBar from "@/components/sidebar/RightSIdeBar";
import GameCard from "@/components/superplay/GameCard";
import { gamesData } from "@/lib/utils";
import axios from "axios";
import { ethers } from "ethers";
import React, { useEffect } from "react";

const page = () => {
  const handleChnageBase = async () => {
    const signer = await window.ethereum;
    console.log(signer, "signersigner");
    const currentUser = "0x3Fe0ab910eA2f59D4E7ee7375FA69Acff238B798";
    const d = {
      currentUser,
      signer,
    };
    try {
      const response = await fetch("http://localhost:6000/nft-base-checker", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(d),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data, "data");
      return data.eligible;
    } catch (error) {
      console.error("Error calling API:", error);
      throw error;
    }
  };

  useEffect(() => {
    connectMetaMaskAndGetSigner();
  }, []);

  async function connectMetaMaskAndGetSigner() {
    if (typeof window != "undefined") {
      const { ethereum } = window;

      if (!ethereum) {
        toast.error("Please install the Metamask Extension!");
      }
      try {
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        console.log("Found an account! Address: ", accounts[0]);
        console.log(accounts);
      } catch (err) {
        console.log(err);
        if (err.code === 4902) {
          try {
            const accounts = await ethereum.request({
              method: "eth_requestAccounts",
            });
            console.log(accounts);
          } catch (err) {
            alert(err.message);
          }
        }
      }
    }
  }

  return (
    <Layout>
      <main
        id="site__main"
        className="2xl:ml-[--w-side]  xl:ml-[--w-side-sm] p-2.5 h-[calc(100vh-var(--m-top))] mt-[--m-top]"
      >
        <div
          className="lg:flex 2xl:gap-8 gap-6 max-w-[1065px] mx-auto"
          id="js-oversized"
        >
          <div className="flex-none">
            <div class="page-heading ">
              <h1 class="page-title"> Games </h1>
            </div>
            <div className="grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-2 p-2">
              {gamesData.map((game) => (
                <div key={game.id} className="group">
                  <GameCard game={game} />
                </div>
              ))}
            </div>
            <button onClick={handleChnageBase}>call</button>
          </div>
          <RightSIdeBar />
        </div>
      </main>
    </Layout>
  );
};

export default page;
