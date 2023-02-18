import api from '..';
import {API_KEY} from '../../../configs';

export const getCurrentWeather = async ({
  lat,
  lon,
}: {
  lat: string;
  lon: string;
}) => {
  const res = await api.get(`forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
  return res.data;
};

export const searchCityByName = async ({city}: {city: string}) => {
  const res = await api.get(
    `geo/1.0/direct?q=${city}&limit=5&appid=${API_KEY}`,
  );
  return res.data;
};
