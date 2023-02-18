import {API_URL} from './../../configs/index';
import axios from 'axios';
import {Alert} from 'react-native';

const api = axios.create({
  baseURL: `${API_URL}`,
});

api.interceptors.response.use(
  response => {
    return response;
  },
  () => {
    Alert.alert('something went wrong');
  },
);

export default api;
