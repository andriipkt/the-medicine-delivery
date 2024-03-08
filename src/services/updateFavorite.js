import axios from "axios";

export const updateFavorite = async (medicineId, body) => {
  try {
    const { data } = await axios.patch(
      `/api/medicines/${medicineId}/favorite`,
      body
    );
    return data;
  } catch (error) {
    console.error("Error updating favorite:", error);
    throw error;
  }
};
