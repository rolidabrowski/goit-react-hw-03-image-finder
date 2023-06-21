import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
axios.defaults.params = {
  key: '35294695-6bfc4b24db5372eaae3354bab',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
};

export const fetchPhotos = async (searchQuery, page = 1, perPage = 12) => {
  const response = await axios.get(
    `/?q=${searchQuery}&page=${page}&per_page=${perPage}`
  );
  return response.data;
};

const api = {
  fetchPhotos,
};

export default api;
