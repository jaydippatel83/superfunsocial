"use client";
import { createContext, useState, useEffect } from "react";
import contractAbi from "../../utils/contract.json";
import axios from "axios";
import { ethers } from "ethers";

export const FarcasterContext = createContext();

const contractAddress = process.env.CONTRACT_ADDRESS;

export function FarcasterContextProvider(props) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [polls, setPolls] = useState([]);

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

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

  async function CreatePoll(name, numOfChoice, pollId) {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);

      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractAbi,
        signer
      );
      const transaction = await contract.createPoll(name, numOfChoice, pollId);
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
        contractAbi,
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
        CreatePoll,
        getVotes,
        getPolls,
        polls,
      }}
    >
      {props.children}
    </FarcasterContext.Provider>
  );
}
