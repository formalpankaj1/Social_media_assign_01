import axios from 'axios';
import { apiUrl } from './config';

const API = axios.create({ baseURL: `${apiUrl}` });


API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
});


export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPost = (id) => API.get(`/posts/${id}`);
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
export const createPost = (newPost) => API.post('/posts', newPost);
export const likePostInapi = (id) => API.patch(`/posts/${id}/likePost`);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePostInapi = (id) => API.delete(`/posts/${id}`);
export const getSpecificUserInapi = (user) => API.get(`/users/${user}`);
export const followUserInapi = (username) => API.post(`/users/${username}`);
export const unfollowUserInapi = (username) => API.delete(`/users/${username}`);

export const signIn = (formData) => API.post('/users/signin', formData);
export const registerInapi = (formData) => API.post('/users/register', formData);
