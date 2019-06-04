import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { View, Text } from 'react-native';
import TopicsList from './TopicsList';

storiesOf('TopicsList', module)
  .add('default view', () => (
    <TopicsList
      items={[
        { label: 'Language', onPress: () => null },
        { label: 'Development', onPress: () => null },
      ]}
      buttons={[
        { label: 'Today', onPress: () => null },
      ]}
    />
  ));
