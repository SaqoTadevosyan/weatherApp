import React from 'react';
import {View} from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  background-color: #ffffff;
  padding: 10px 30px;
  border-radius: 20px;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px;
  height: 120px;
  margin-right: 10px;
`;

const AdditionalText = styled.Text`
  color: rgba(34, 33, 91, 0.6);
  font-size: 12px;
`;

const TemperatureText = styled.Text`
  color: #22215b;
  font-weight: 700;
  font-size: 30px;
`;

const TemperatureContainer = styled.View`
  margin-left: 20px;
  align-items: center;
  margin-top: 20px;
`;

interface Props {
  feelsLike: number;
  pressure: number;
  humidity: number;
  temperature: number;
  date?: string;
}

export default function WeatherBlock({
  feelsLike,
  pressure,
  humidity,
  temperature,
  date,
}: Props) {
  return (
    <Container>
      <View>
        {date && <AdditionalText>Date : {date}</AdditionalText>}
        <AdditionalText>Feels like : {Math.ceil(feelsLike)}°C</AdditionalText>
        <AdditionalText>Pressure : {pressure}</AdditionalText>
        <AdditionalText>Humidity : {humidity}</AdditionalText>
      </View>
      <TemperatureContainer>
        <TemperatureText>{Math.ceil(temperature)}°C</TemperatureText>
      </TemperatureContainer>
    </Container>
  );
}
