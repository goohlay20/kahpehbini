import axios from "axios";

const useUpdateData = () => {
  const updateData = async(url, data, accesstoken) => {
    try {
      await axios.patch(
        url,
        data,
        { headers: { Authorization: `Bearer ${accesstoken}` } }
      );
    } catch (err) {
      console.error(err.response?.data?.message || 'An error occurred');
      throw err;
    }
  };

  return [ updateData ];
};

export default useUpdateData;