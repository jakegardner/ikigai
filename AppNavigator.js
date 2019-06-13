import { createStackNavigator, createAppContainer } from 'react-navigation';

import Today from './App/Views/Today';
import AddItem from './App/Views/AddItem';
import Topics from './App/Views/Topics';
import Tasks from './App/Views/Tasks';

const AppNavigator = createStackNavigator(
  {
    Today,
    AddItem,
    Topics,
    Tasks,
  },
  {
    initialRouteName: 'Today',
  },
);

export default createAppContainer(AppNavigator);
