import axios from "axios";

export const getCastConversations = async (hash) => {
    const headers = {
        accept: 'application/json',
        api_key: process.env.NEXT_PUBLIC_NEYNAR_API_KEY
    };
    let apiUrl = `https://api.neynar.com/v2/farcaster/cast/conversation?identifier=${hash}&type=hash&reply_depth=5&include_chronological_parent_casts=false`;
    
    try {
        const response = await axios.get(apiUrl, { headers });
        const data = response.data?.conversation.cast;
        return data
        
    } catch (error) {
        console.log(error); 
    }
};
