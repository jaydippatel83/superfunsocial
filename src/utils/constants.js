import { createThirdwebClient, getContract } from "thirdweb";
import { baseSepolia } from "thirdweb/chains";
import  { contractABI } from "./contract.js";

export const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_TW_CLIENT_ID,
});

export const pollContract = getContract({
  // the client you have created via `createThirdwebClient()`
  client,
  // the chain the contract is deployed on
  chain: baseSepolia,
  // the contract's address
  address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
  abi: contractABI,
});
