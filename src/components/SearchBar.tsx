import React, {useCallback, useEffect, useState} from 'react';
import {Text, TextInput, TouchableOpacity} from 'react-native';
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

export default function SearchBar({
  setSelectedCityGeoData,
}: {
  setSelectedCityGeoData: (city: CityGeoData) => void;
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const {data: cities, refetch} = useQuery(
    'suggestedCities',
    () => searchCityByName({city: searchTerm}),
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

  return (
    <>
      <Container>
        <SearchInputContainer>
          <TextInput
            placeholder="Enter full city name"
            value={searchTerm}
            onChangeText={setSearchTerm}
          />
        </SearchInputContainer>
        <SearchButton>{SearchIcon}</SearchButton>
      </Container>
      {cities?.map(city => {
        return (
          <TouchableOpacity
            key={city.lon}
            onPress={() =>
              setSelectedCityGeoData({lon: city.lon, lan: city.lan})
            }>
            <Text>{city.name}</Text>
          </TouchableOpacity>
        );
      })}
    </>
  );
}
