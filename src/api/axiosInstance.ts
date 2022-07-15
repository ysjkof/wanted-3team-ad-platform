import axios from 'axios';
import { BASE_URL } from '../constants/constants';

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-type': 'application/json',
  },
});
