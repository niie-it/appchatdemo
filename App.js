import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { UserContextProvider } from './Contexts/UserContext';

// You can import from local files
import { UI } from './components/index';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      <UserContextProvider>
        <NavigationContainer>
          <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="Login" component={UI.Login} />
            <Drawer.Screen name="Home" component={UI.Home} />
            <Drawer.Screen name="Register" component={UI.Register} />
          </Drawer.Navigator>
        </NavigationContainer>
      </UserContextProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
});
