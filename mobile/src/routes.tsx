import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './pages/Home';
import Books from './pages/Books';
import BookDetail from './pages/BookDetail';
import BookSearch from './pages/BookSearch';

const AppStack = createStackNavigator();
const Routes = () => {
  return (
    <NavigationContainer>
      <AppStack.Navigator
        headerMode="none"
        screenOptions={{
          cardStyle: {
            backgroundColor: '#f0f0f5',
          },
        }}
      >
        <AppStack.Screen name="Home" component={Home} />
        <AppStack.Screen name="Books" component={Books} />
        <AppStack.Screen name="BookDetail" component={BookDetail} />
        <AppStack.Screen name="BookSearch" component={BookSearch} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
