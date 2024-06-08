"use server";
import axios from "axios"; 
import { ethers } from "ethers";
import { contractABI } from "./contract";

const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

const provider = new ethers.JsonRpcProvider(
  `${process.env.NEXT_PUBLIC_ALCHEMY_URL}`
);
const signer = new ethers.Wallet(process.env.NEXT_PUBLIC_PRIVATE_KEY, provider);
const contract = new ethers.Contract(contractAddress, contractABI, signer);

export async function getPoll(pollId) {
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

export async function getVotes(pollId) {
  try {
    const votes = await contract.getVotes(pollId);

    const pollVotes = await votes.map((vote) => vote.toString());

    console.log(pollVotes, "pollVotes");

    return pollVotes;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function giveVote(pollId, choice, signer) {
  try {
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
