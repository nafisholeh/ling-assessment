import React from 'react';
import { Stack } from 'expo-router';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

const RootStack: React.FC = () => (
  <Stack>
    <Stack.Screen name="index" />
  </Stack>
);

const RootLayout: React.FC = () => (
  <>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider {...eva} theme={eva.light}>
      <RootStack />
    </ApplicationProvider>
  </>
);

export default RootLayout;
