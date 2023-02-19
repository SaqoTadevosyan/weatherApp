import api from '..';
import {API_KEY} from '../../../configs';
import {CityGeoData} from '../../../types';

export const getFutureWeather = async ({lat, lon}: CityGeoData) => {
  const res = await api.get(
    `data/2.5/forecast?units=metric&lat=${lat}&lon=${lon}&appid=${API_KEY}`,
  );
  return res?.data;
};

export const getCurrentWeather = async ({lat, lon}: CityGeoData) => {
  const res = await api.get(
    `data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${API_KEY}`,
  );
  return res?.data;
};

export const searchCityByName = async ({city}: {city: string}) => {
  const res = await api.get(
    `geo/1.0/direct?q=${city}&limit=5&appid=${API_KEY}`,
  );
  return res?.data;
};
