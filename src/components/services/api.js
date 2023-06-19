import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
axios.defaults.params = {
  key: '35294695-6bfc4b24db5372eaae3354bab',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  page: 1,
  per_page: 12,
};

export const fetchPhotosWithQuery = async searchQuery => {
  const response = await axios.get(`/?q=${searchQuery}`);
  return response.data.hits;
};

const api = {
  fetchPhotosWithQuery,
};

export default api;
