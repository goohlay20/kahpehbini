import axios from "axios";

const useDeleteData = () => {
  const deleteData = async(url, accesstoken) => {
    try {
      await axios.delete(
        url,
        { headers: { Authorization: `Bearer ${accesstoken}` } }
      );
    } catch (err) {
      console.error(err.response?.data?.message || 'An error occurred');
      throw err;  
    }
  };

  return [ deleteData ];
};

export default useDeleteData;