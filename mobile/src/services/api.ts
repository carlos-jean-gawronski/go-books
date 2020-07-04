import axios from 'axios';
import { HOST_ADD } from '../../credentials.json';

const api = axios.create({
  baseURL: `http://${HOST_ADD}:3333`,
});

export default api;
