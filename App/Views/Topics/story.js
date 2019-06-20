/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react-native';
import Topics from './Topics';

storiesOf('Topics', module)
  .add('default view', () => (
    <Topics
      navButtons={[
        { label: 'Settings', onPress: () => null },
        { label: 'Add', onPress: () => null },
      ]}
      items={[
        { label: 'Language', onPress: () => null },
        { label: 'Development', onPress: () => null },
      ]}
      buttons={[
        { label: 'Today', onPress: () => null },
      ]}
    />
  ));
