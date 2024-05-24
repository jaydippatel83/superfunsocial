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
