"use client";
import { createContext, useState, useEffect } from "react";
import { contractABI } from "../utils/contract.js";
import axios from "axios";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import { useNeynarContext } from "@neynar/react";
import { useRouter } from "next/navigation.js";
import { usePathname } from "next/navigation";

export const FarcasterContext = createContext();

const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

export function FarcasterContextProvider(props) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [polls, setPolls] = useState([]);
  const [provider, setProvider] = useState();
  const [address, setAddress] = useState();
  const { user } = useNeynarContext();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    let localuser = localStorage.getItem("neynar_authenticated_user");

    if (!user && !localuser) {
      router.push("/login");
    }
  }, [user]);

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  function setEthreumProvider(provider) {
    setProvider(provider);
  }

  async function getPoll(pollId) {
    try {
      var poll;
      await axios
        .get(`https://frame-backend-z2b9.onrender.com/polls/${pollId}`)
        .then((res) => {
          poll = res.data.data;
        });
      return poll;
    } catch (error) {
      console.log(error);
      return error;
    }
  } // Get data from our own backend..

  const getPolls = async () => {
    await axios
      .get("https://frame-backend-z2b9.onrender.com/polls")
      .then((res) => {
        setPolls(res.data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }; // Get data from our own backend..

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
        setAddress(accounts[0]);
      } catch (err) {
        console.log(err);
        if (err.code === 4902) {
          try {
            const accounts = await ethereum.request({
              method: "eth_requestAccounts",
            });
            console.log(accounts);
            setAddress(accounts[0]);
          } catch (err) {
            alert(err.message);
          }
        }
      }
    }
  }

  async function CreatePoll(name, numOfChoice, pollId) {
    try {
      await connectMetaMaskAndGetSigner();
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      var transaction;
      if (signer) {
        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        transaction = await contract.createPoll(name, numOfChoice, pollId);
      }
      return transaction;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async function castVote(pollId, choice) {
    try {
      await connectMetaMaskAndGetSigner();
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      var transaction;
      if (signer) {
        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        transaction = await contract.vote(pollId, choice);
      }

      console.log(transaction, "transaction");

      return transaction;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async function getVotes(pollId) {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);

      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      const votes = await contract.getVotes(pollId);
      const pollVotes = await votes.map((vote) => vote.toString());
      return pollVotes;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  return (
    <FarcasterContext.Provider
      value={{
        isModalOpen,
        setModalOpen,
        toggleModal,
        getPoll,
        castVote,
        CreatePoll,
        getVotes,
        getPolls,
        setEthreumProvider,
        connectMetaMaskAndGetSigner,
        polls,
      }}
    >
      {props.children}
    </FarcasterContext.Provider>
  );
}
