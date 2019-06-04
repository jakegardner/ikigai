import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { View, Text } from 'react-native';
import ButtonBar from './ButtonBar';

storiesOf('ButtonBar', module)
  .add('default view', () => (
    <ButtonBar
      buttons={[
        { label: 'Today', onPress: () => null },
      ]}
    />
  ));
