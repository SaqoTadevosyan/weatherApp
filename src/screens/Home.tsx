import React, {useState} from 'react';
import {View} from 'react-native';
import SearchBar from '../components/SearchBar';
import WeatherBlock from '../components/WeatherBlock';
import {CityGeoData} from '../types';
import MainWrapper from '../wrappers/MainWrapper';
export default function Home() {
  const [selectedCityGeoData, setSelectedCityGeoData] = useState<CityGeoData>({
    lan: '',
    lon: '',
  });
  return (
    <MainWrapper>
      <SearchBar setSelectedCityGeoData={setSelectedCityGeoData} />
      <WeatherBlock />
    </MainWrapper>
  );
}
