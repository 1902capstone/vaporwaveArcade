import { createStackNavigator, createAppContainer } from 'react-navigation';
import Home from './screens/Home';
import Menu from './screens/Menu'


const AppNavigator = createStackNavigator({
  Home: { screen: Home },
  Menu: {screen: Menu},
});

const Navigator = createAppContainer(AppNavigator)
export default Navigator;
