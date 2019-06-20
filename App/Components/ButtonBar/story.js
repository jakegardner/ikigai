/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react-native';
import ButtonBar from './ButtonBar';

storiesOf('ButtonBar', module)
  .add('default view', () => (
    <ButtonBar
      buttons={[
        { label: 'Today', onPress: () => null },
      ]}
    />
  ));
