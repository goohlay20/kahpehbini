import axios from "axios";

const useAddData = () => {
  const addData = async(url, details, accesstoken="") => {
    try {
      if(!accesstoken){
        await axios.post( url, details);
      } else {
        const {
          data: { data }
        } = await axios.post( url, details, { headers: { Authorization: `Bearer ${accesstoken}` } });
        return data;
      }
    } catch (err) {
      console.error(err.response?.data?.message || 'An error occurred');
      throw err;
    }
  };

  return [ addData ];
};

export default useAddData;