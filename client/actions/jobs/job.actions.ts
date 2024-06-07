import axios from "axios";

export const getAllVacancies = async () => {
  try {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_API_URL!}/jobs/all/`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const getJobFilters = async () => {
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_API_URL!}/jobs/filters`
    );
    return data;
  } catch (error) {
    throw new Error("Cannot Get Job Filters");
  }
};
