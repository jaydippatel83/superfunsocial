import { NeynarAPIClient } from "@neynar/nodejs-sdk";

const apiKey = process.env.NEYNAR_API_KEY;
const neynarClient = new NeynarAPIClient(apiKey);

export default neynarClient;