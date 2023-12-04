import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';

import LoginScreen from './src/screens/Login';
import HomeScreen from './src/screens/Home';
import Vocabularies from './src/screens/Vocabularies';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name="Login" component={LoginScreen}/>
        <Stack.Screen name="HomeScreen" component={HomeScreen}/>
        <Stack.Screen name="Vocabularies" component={Vocabularies}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
