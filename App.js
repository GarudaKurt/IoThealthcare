import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Monitoring from './components/Monitoring';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='login' component={SignIn} options={{headerShown:false}}/>
        <Stack.Screen name='create' component={SignUp} options={{headerShown:false}}/>
        <Stack.Screen name='monitor' component={Monitoring} options={{headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App

