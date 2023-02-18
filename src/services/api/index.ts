import axios from 'axios';
import {Alert} from 'react-native';
import {API_KEY} from '../../configs';

const api = axios.create({
  baseURL: `http://openweathermap.org/api?appid=${API_KEY}`,
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
