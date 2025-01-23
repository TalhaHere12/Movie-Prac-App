import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from '../screen/HomeScreen'
import MovieDetailsScreen from '../screen/MovieDetailsScreen'
const Stack=createStackNavigator()
const AppNavigation = () => {
  return (
    <Stack.Navigator>
       <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Movies' }} />
       <Stack.Screen name="MovieDetails" component={MovieDetailsScreen} options={{ title: 'Movie Details' }} />

    </Stack.Navigator>
  )
}

export default AppNavigation

const styles = StyleSheet.create({})