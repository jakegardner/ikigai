/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react-native';
import Today from './Today';

storiesOf('Today', module)
  .add('default view', () => (
    <Today
      navButtons={[
        { label: 'Settings', onPress: () => null },
        { label: 'Add', onPress: () => null },
      ]}
      items={[
        { label: 'Study grammar', onPress: () => null },
        { label: 'Listen to dialog', onPress: () => null },
        { label: 'Read React source', onPress: () => null },
      ]}
      buttons={[
        { label: 'Topics', onPress: () => null },
      ]}
    />
  ));
