import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import PostScreen from './src/screens/PostScreen';
import { PostProvider } from './src/contexts/PostContext';
import PostListScreen from './src/screens/PostListScreen';
import CategoryScreen from './src/screens/CategoryScreen';
import AddEditPostScreen from './src/screens/AddEditPostScreen';


const Stack = createNativeStackNavigator();


function MyStack() {
  return(
    <Stack.Navigator initialRouteName='Home'>
      <Stack.Screen
        name = "Home"
        component = { CategoryScreen }
        options = {{ 
          //animation: 'default',
          headerStyle: {
            backgroundColor: '#176B87',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}/>
      <Stack.Screen
        name = "Posts"
        component = { PostListScreen }
        options = {({ route }) => ({ 
          title: route.params.category,
          animation: 'slide_from_bottom',
          headerStyle: {
            backgroundColor: '#176B87',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        })}
        />
      <Stack.Screen
        name = "Post"
        component = { PostScreen }
        options = {({ route }) => ({ 
          title: route.params.category + ' post',
          animation: 'slide_from_bottom',
          //cardStyleInterpolator: CardStyleInterpolators.forScaleFromCenterAndroid,
          headerStyle: {
            backgroundColor: '#176B87',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        })}/>
      <Stack.Screen
        name = "Edit Post"
        component = { AddEditPostScreen }
        options = {{ 
          animation: 'fade',
          //cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
          headerBackVisible: false,
          headerStyle: {
            backgroundColor: '#176B87',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }}/>
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <PostProvider>
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    </PostProvider>
  );
}
