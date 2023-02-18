import React from 'react';
import {View, Text} from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  background-color: #ffffff;
  padding: 10px 30px;
  border-radius: 20px;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px;
`;

const AdditionalText = styled.Text`
  color: rgba(34, 33, 91, 0.6);
  font-size: 14px;
`;

const TemperatureText = styled.Text`
  color: #22215b;
  font-weight: 700;
  font-size: 30px;
`;

export default function WeatherBlock() {
  return (
    <Container>
      <View>
        <AdditionalText>Date </AdditionalText>
        <AdditionalText>Feels like </AdditionalText>
        <AdditionalText>Pressure </AdditionalText>
        <AdditionalText>Humidity </AdditionalText>
      </View>
      <View>
        <TemperatureText>28</TemperatureText>
      </View>
    </Container>
  );
}
