import AsyncStorage from '@react-native-async-storage/async-storage';
import {HISTORY_LIMIT} from '../constants';
import {StoreRecord} from '../types';

export const saveSearchQuery = async (query: string) => {
  const currentStoreJSON = await AsyncStorage.getItem('records');
  if (currentStoreJSON) {
    let currentStore: StoreRecord[] = JSON.parse(currentStoreJSON);
    currentStore.unshift({query, date: new Date()});
    currentStore = currentStore.slice(0, HISTORY_LIMIT);
    await AsyncStorage.setItem('records', JSON.stringify(currentStore));
  } else {
    const currentStore = [{query, date: new Date()}];
    await AsyncStorage.setItem('records', JSON.stringify(currentStore));
  }
};

export const getSearchRecordsFromStore = async () => {
  const currentStoreJSON = await AsyncStorage.getItem('records');
  return JSON.parse(currentStoreJSON) || [];
};

export const removeRecordFromStore = async (index: number) => {
  const currentStoreJSON = await AsyncStorage.getItem('records');
  let currentStore: StoreRecord[] = JSON.parse(currentStoreJSON);
  currentStore.splice(index, 1);
  await AsyncStorage.setItem('records', JSON.stringify(currentStore));
};
