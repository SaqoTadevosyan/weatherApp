import React, {useCallback, useEffect, useState} from 'react';
import {Keyboard, Text, TextInput, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import {SearchIcon} from '../icons/Home';
import {debounce} from 'lodash';
import {searchCityByName} from '../services/api/search';
import {useQuery} from 'react-query';
import {CityGeoData} from '../types';

const Container = styled.View`
  flex-direction: row;
`;

const SearchInputContainer = styled.View`
  background-color: #ffffff;
  padding: 1px 28px;
  border-radius: 20px;
  flex: 1;
`;

const SearchButton = styled.TouchableOpacity`
  border: 1px solid #2f2e65;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  padding: 3px 10px;
  background-color: #ffffff;
  margin-left: 5px;
`;

const SuggestedCityName = styled.Text`
  color: #567df4;
`;

interface Props {
  setSelectedCityGeoData: (city: CityGeoData) => void;
}

export default function SearchBar({setSelectedCityGeoData}: Props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestionMenu, setShowSuggestionMenu] = useState<boolean>(false);

  const {data: cities, refetch} = useQuery(
    'suggestedCities',
    () => (searchTerm ? searchCityByName({city: searchTerm}) : () => {}),
    {
      refetchOnWindowFocus: false,
      enabled: false,
    },
  );
  const searchCityDebounced = useCallback(debounce(refetch, 500), []);

  useEffect(() => {
    if (searchTerm) {
      searchCityDebounced();
    }
  }, [searchTerm]);

  const handleSelectSuggestion = (name: string, geoData: CityGeoData) => {
    setSelectedCityGeoData({lat: geoData.lat, lon: geoData.lon});
    setSearchTerm(name);
    Keyboard.dismiss();
  };

  const handleSearch = () => {
    if (cities?.[0]) {
      const {lon, lat} = cities[0];
      setSelectedCityGeoData({lon, lat});
      Keyboard.dismiss();
    }
  };

  return (
    <>
      <Container>
        <SearchInputContainer>
          <TextInput
            placeholder="Enter full city name"
            value={searchTerm}
            onChangeText={setSearchTerm}
            onFocus={() => setShowSuggestionMenu(true)}
            onBlur={() => setShowSuggestionMenu(false)}
          />
        </SearchInputContainer>
        <SearchButton onPress={handleSearch}>{SearchIcon}</SearchButton>
      </Container>
      {showSuggestionMenu && cities?.length > 0
        ? cities?.map((city, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  handleSelectSuggestion(city.name, {
                    lat: city.lat,
                    lon: city.lon,
                  });
                }}>
                <SuggestedCityName>
                  {city.name}, {city.country}
                </SuggestedCityName>
              </TouchableOpacity>
            );
          })
        : cities?.length === 0 && (
            <TouchableOpacity
              onPress={() => {
                handleSelectSuggestion('London', {
                  lat: '51.5085',
                  lon: '-0.1257',
                });
              }}>
              <Text>
                Nothing found. <SuggestedCityName>London</SuggestedCityName> Try
                instead.
              </Text>
            </TouchableOpacity>
          )}
    </>
  );
}
