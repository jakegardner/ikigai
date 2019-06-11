import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { View, Text } from 'react-native';
import AddItem from './AddItem';

storiesOf('AddItem', module)
  .add('add topic', () => (
    <AddItem
      title={'New Topic'}
      navButtons={[
        { label: 'Back', onPress: () => null },
      ]}
      buttons={[
        { label: 'Cancel', onPress: () => null },
        { label: 'Save', onPress: () => null },
      ]}
    />
  ))
  .add('add task', () => (
    <AddItem
      title={'New Task'}
      navButtons={[
        { label: 'Back', onPress: () => null },
      ]}
      buttons={[
        { label: 'Cancel', onPress: () => null },
        { label: 'Save', onPress: () => null },
      ]}
      topicName={'Language'}
    />
  ));
