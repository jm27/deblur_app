import axios from "axios";

export const submitImage = async (image) => {
  const formData = new FormData();
  formData.append("image", image);

  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/images`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
