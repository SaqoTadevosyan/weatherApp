import React from 'react';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  background-color: #e5e5e5;
  padding-left: 30px;
  padding-right: 30px;
`;

export default function MainWrapper({
  children,
}: {
  children: React.ReactElement;
}) {
  return <Container>{children}</Container>;
}
