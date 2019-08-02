import React from 'react';
import { connect } from 'react-redux';
import { compose, withHandlers } from 'recompose';
import Topics from './Topics';
import { deleteTopic } from './duck';
import { AddButton, BackButton } from '../../Components/NavigationButton';
import { headerStyles } from '../../Common/styles';

const mapStateToProps = state => ({
  items: state.topics.items,
});

const mapDispatchToProps = {
  dispatchDeleteTopic: deleteTopic,
};

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers({
    onTaskPress: ({ navigation }) => item => navigation.navigate('Tasks', {
      topicName: item.label,
      topicId: item.id,
    }),
    onDeletePress: ({ dispatchDeleteTopic }) => task => dispatchDeleteTopic(task),
  }),
);

const wrapped = enhance(Topics);
wrapped.navigationOptions = ({ navigation }) => ({
  title: 'Topics',
  headerLeft: (
    <BackButton
      onPress={() => navigation.goBack()}
    />
  ),
  headerRight: (
    <AddButton
      onPress={() => navigation.navigate('AddItem')}
    />
  ),
  ...headerStyles,
});

export default wrapped;
