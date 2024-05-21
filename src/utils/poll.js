"use server";
import axios from "axios";
import contractAbi from "./contract.json";
import { ethers } from "ethers";

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
    const provider = new ethers.BrowserProvider(window.ethereum);

    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractAbi, signer);
    const votes = await contract.getVotes(pollId);
    const pollVotes = await votes.map((vote) => vote.toString());
    return pollVotes;
  } catch (error) {
    console.log(error);
    return error;
  }
}
