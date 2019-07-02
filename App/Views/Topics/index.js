import React from 'react';
import { connect } from 'react-redux';
import { compose, withHandlers } from 'recompose';
import Topics from './Topics';
import { deleteTopic } from './duck';
import NavigationButton from '../../Components/NavigationButton';

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
  headerRight: (
    <NavigationButton
      label="Add"
      onPress={() => navigation.navigate('AddItem')}
    />
  ),
});

export default wrapped;
