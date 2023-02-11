import {BASE_URL} from './endpoints';
import axios from 'axios';

export const ax = axios.create({
  baseURL: BASE_URL,
});
