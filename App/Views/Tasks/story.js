import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { View, Text } from 'react-native';
import Tasks from './Tasks';

storiesOf('Tasks', module)
  .add('default view', () => (
    <Tasks
      topicName={'Language'}
      navButtons={[
        { label: 'Back', onPress: () => null },
        { label: 'Add', onPress: () => null },
      ]}
      items={[
        { label: 'Study grammar', onPress: () => null },
        { label: 'List to dialog', onPress: () => null },
      ]}
      buttons={[
        { label: 'Today', onPress: () => null },
        { label: 'Topics', onPress: () => null },
      ]}
    />
  ));
