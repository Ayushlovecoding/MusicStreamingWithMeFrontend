import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
});

export async function searchJioSaavnSongs(query) {
  const res = await api.get('/jiosaavn/search/songs', { params: { query } });
  return res.data;
}

export async function getJioSaavnSong(id) {
  const res = await api.get(`/jiosaavn/songs/${id}`);
  return res.data;
}

export default api;
