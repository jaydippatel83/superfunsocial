import axios from 'axios';

export const verifyUser = async (signerUuid, fid) => {
  let _isVerifiedUser = false;
  try {
    const {
      data: { isVerifiedUser },
    } = await axios.post('/api/login', { signerUuid, fid });
    _isVerifiedUser = isVerifiedUser;
  } catch (err) {
    const axiosError = err;
    if (axiosError.response) {
      const { message } = axiosError.response.data;
      console.error(message);
    } else {
      console.error('An unexpected error occurred:', axiosError.message);
    }
  }
  return _isVerifiedUser;
};

export const getUserById= async(id)=>{
  const headers = {
    accept: "application/json",
    api_key: process.env.NEXT_PUBLIC_NEYNAR_API_KEY,
  };
  const url = `https://api.neynar.com/v2/farcaster/user/bulk?fids=${id}`;
  const response = await axios.get(url, {
    headers,
  });
  const data = response.data.users; 
  return data;
}