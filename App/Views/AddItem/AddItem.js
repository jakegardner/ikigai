import React from 'react';
import uuid from 'react-native-uuid';
import {
  Dimensions,
  View,
  TextInput,
  Text,
  StyleSheet,
} from 'react-native';
import { compose, withProps, withState } from 'recompose';
import ButtonBar from '../../Components/ButtonBar';

const { width: screenWidth, height: screenHeight } = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    height: screenHeight - 128,
    width: screenWidth,
  },
  formContainer: {
    paddingHorizontal: 15,
  },
  formInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  formInputLabel: {
    fontSize: 14,
    marginRight: 5,
  },
  label: {
    fontSize: 14,
  },
  textInput: {
    lineHeight: 18,
    width: 250,
  },
});

const FormInput = ({ label, children }) => (
  <View style={styles.formInputContainer}>
    <Text style={styles.formInputLabel}>{`${label}:`}</Text>
    {children}
  </View>
);

const AddForm = ({ topicName, setName }) => (
  <View style={styles.formContainer}>
    <FormInput label={'Name'} >
      <TextInput style={styles.textInput} onChangeText={setName} />
    </FormInput>
    {topicName && <FormInput label={'Date'}>
    </FormInput>}
    {topicName && <FormInput label={'Repeat'} />}
    {topicName && <FormInput label={'Topic'}>
      <Text style={styles.label}>{topicName}</Text>
    </FormInput>}
  </View>
);

const AddItem = ({ buttons, topicName, setName }) => (
  <View style={styles.container}>
    <AddForm
      topicName={topicName}
      setName={setName}
    />
    <ButtonBar buttons={buttons} />
  </View>
);

const enhance = compose(
  withState('name', 'setName'),
  withProps(({
    navigation,
    addTopic,
    addTask,
    name,
  }) => ({
    buttons: [
      { label: 'Cancel', onPress: () => navigation.goBack() },
      {
        label: 'Save',
        onPress: () => {
          const topicId = navigation.getParam('topicId');
          if (topicId) {
            addTask({
              topicId,
              task: {
                label: name,
                id: uuid.v4(),
              },
            });
          } else {
            addTopic({
              id: uuid.v4(),
              label: name,
              tasks: [],
            });
          }
          navigation.goBack();
        },
      },
    ],
  })),
);

const wrapped = enhance(AddItem);
wrapped.navigationOptions = {
  title: 'New Item',
};

export default wrapped;
