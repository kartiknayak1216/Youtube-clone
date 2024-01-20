import axios from "axios";

export const BASE_URL = "https://youtube-v31.p.rapidapi.com";
const options = {
  params: {
    maxResults: 50,
  },
  headers: {
    "X-RapidAPI-Key": "85b901f156msh18d7f44e922990ep10c524jsnd34e4b6e75e8",
    "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
  },
};

export const fetch = async (url) => {
  const { data } = await axios.get(`${BASE_URL}/${url}`, options);
  return data;
};
