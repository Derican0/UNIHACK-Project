import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  console.log('App component rendered');
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}