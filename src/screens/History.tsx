import {useIsFocused, useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {getSearchRecordsFromStore, removeRecordFromStore} from '../helpers';
import {StoreRecord} from '../types';
import dayjs from 'dayjs';
import MainWrapper from '../wrappers/MainWrapper';
import {DeleteIcon} from '../icons/SearchIcons';
import styled from 'styled-components/native';

const StoredQueryContainer = styled.View`
  flex-direction: row;
  width: 80%;
`;

const StoredQueryName = styled.Text`
  color: #567df4;
`;

export default function History() {
  const [savedQueries, setSavedQueries] = useState([]);
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const getSavedRecords = async () => {
    setSavedQueries(await getSearchRecordsFromStore());
  };

  useEffect(() => {
    getSavedRecords();
  }, [isFocused]);

  const handleDelete = async (index: number) => {
    await removeRecordFromStore(index);
    getSavedRecords();
  };

  return (
    <MainWrapper>
      <>
        <Text>Previews successful search requests :</Text>
        {savedQueries?.length > 0 ? (
          savedQueries.map((record: StoreRecord, index) => {
            return (
              <StoredQueryContainer key={record.date.toString()}>
                <Text>{index + 1}. </Text>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('Home', {
                      searchTermFromStore: record.query,
                    })
                  }>
                  <StoredQueryName>{record.query}, </StoredQueryName>
                </TouchableOpacity>
                <Text>{dayjs(record.date).format('MMMM D, YYYY h:mm A')} </Text>
                <TouchableOpacity onPress={() => handleDelete(index)}>
                  {DeleteIcon}
                </TouchableOpacity>
              </StoredQueryContainer>
            );
          })
        ) : (
          <Text>Not result yet</Text>
        )}
      </>
    </MainWrapper>
  );
}
