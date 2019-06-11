import React from 'react'
import {
  Dimensions,
  View,
  TextInput,
  Text,
  StyleSheet,
} from 'react-native'
import NavigationBar from '../../Components/NavigationBar';
import ButtonBar from '../../Components/ButtonBar';

const { width: screenWidth, height: screenHeight } = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    height: screenHeight - 80,
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

const AddForm = ({ topicName }) => (
  <View style={styles.formContainer}>
    <FormInput label={'Name'} >
      <TextInput style={styles.textInput} onChange={() => null} />
    </FormInput>
    {topicName && <FormInput label={'Date'}>
    </FormInput>}
    {topicName && <FormInput label={'Repeat'} />}
    {topicName && <FormInput label={'Topic'}>
      <Text style={styles.label}>{topicName}</Text>
    </FormInput>}
  </View>
);

const AddItem = ({ title, navButtons, buttons, topicName }) => (
  <View style={styles.container}>
    <NavigationBar
      title={title}
      navButtons={navButtons}
    />
    <AddForm
      topicName={topicName}
    />
    <ButtonBar buttons={buttons} />
  </View>
);

export default AddItem;
