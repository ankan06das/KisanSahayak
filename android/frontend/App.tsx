import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/screens/Login';
import { useFonts } from 'expo-font';
import Home from './src/screens/Home';
import { Provider } from 'react-redux';
import { store } from './store';
import MainContainer from './src/MainContainer';

const Stack = createNativeStackNavigator();

function App() {
  let [fontsLoaded] = useFonts({
    poppins: require("./assets/fonts/Poppins/Poppins-SemiBold.ttf"),
  })
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen options={{headerShown: true}} name="Login" component={Login} />
          <Stack.Screen name="MainContainer" options={{title: "KisanSahayak"}} component={MainContainer} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;