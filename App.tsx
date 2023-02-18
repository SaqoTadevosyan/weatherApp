import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {QueryClient, QueryClientProvider} from 'react-query';
import {Navigation} from './src/navigation';

const queryClient = new QueryClient();

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        <Navigation />
      </QueryClientProvider>
    </NavigationContainer>
  );
}

export default App;
