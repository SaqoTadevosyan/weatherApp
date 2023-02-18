import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {useQuery} from 'react-query';
import styled from 'styled-components/native';
import SearchBar from '../components/SearchBar';
import WeatherBlock from '../components/WeatherBlock';
import {CACHE_TIME} from '../constants';
import {getCurrentWeather, getFutureWeather} from '../services/api/search';
import {CityGeoData} from '../types';
import MainWrapper from '../wrappers/MainWrapper';

const BlockTitle = styled.Text`
  color: #22215b;
  font-size: 20px;
  margin-top: 20px;
`;

export default function Home() {
  const [selectedCityGeoData, setSelectedCityGeoData] = useState<CityGeoData>({
    lat: '',
    lon: '',
  });

  const {data: futureWeather, refetch: refetchFutureWeather} = useQuery(
    'futureWeather',
    () => getFutureWeather(selectedCityGeoData),
    {
      refetchOnWindowFocus: false,
      enabled: false,
      cacheTime: CACHE_TIME,
    },
  );

  const {data: currentWeather, refetch: refetchCurrentWeather} = useQuery(
    'currentWeather',
    () => getCurrentWeather(selectedCityGeoData),
    {
      refetchOnWindowFocus: false,
      enabled: false,
      cacheTime: CACHE_TIME,
    },
  );

  useEffect(() => {
    if (selectedCityGeoData.lat) {
      refetchFutureWeather();
      refetchCurrentWeather();
    }
  }, [selectedCityGeoData]);
  return (
    <MainWrapper>
      <>
        <SearchBar setSelectedCityGeoData={setSelectedCityGeoData} />
        {currentWeather && (
          <>
            <BlockTitle>Current Weather in {currentWeather.name}</BlockTitle>
            <WeatherBlock
              feelsLike={currentWeather.main.feels_like}
              humidity={currentWeather.main.humidity}
              pressure={currentWeather.main.pressure}
              temperature={currentWeather.main.temp}
            />
          </>
        )}
        {futureWeather?.list && (
          <>
            <BlockTitle>5 Day / 3 Hour Forecast</BlockTitle>
            <FlatList
              data={futureWeather.list}
              renderItem={({item}, index) => (
                <WeatherBlock
                  feelsLike={item.main.feels_like}
                  humidity={item.main.humidity}
                  pressure={item.main.pressure}
                  temperature={item.main.temp}
                  date={item.dt_txt}
                  key={index}
                />
              )}
              horizontal
            />
          </>
        )}
      </>
    </MainWrapper>
  );
}
