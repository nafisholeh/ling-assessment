import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { Stack } from 'expo-router';
import React from 'react';
import { Provider } from 'react-redux';

import store from '@/store/index';

const RootStack: React.FC = () => (
  <Stack>
    <Stack.Screen name="index" />
  </Stack>
);

const RootLayout: React.FC = () => (
  <Provider store={store}>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider {...eva} theme={eva.light}>
      <RootStack />
    </ApplicationProvider>
  </Provider>
);

export default RootLayout;
