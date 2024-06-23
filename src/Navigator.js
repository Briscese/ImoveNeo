import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Imoveis from './screens/Imoveis';
import AddImoveis from './screens/AddImoveis';
import Profile from './screens/Profile';
import DetalhesImovel from './screens/DetalhesImovel'; // Importe DetalhesImovel aqui
import AuthStackScreen from './AuthStackScreen'; // Importa AuthStackScreen

const Stack = createStackNavigator();

function ProfileStack({ userInfo }) {
  return (
    <Stack.Navigator initialRouteName="ProfileScreen" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Auth" component={AuthStackScreen} />
      <Stack.Screen 
        name="ProfileScreen" 
        component={Profile} 
        initialParams={{ userInfo }} 
      />
    </Stack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Profile"
      screenOptions={{
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen 
        name="Imoveis" 
        component={Imoveis} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name='home' size={30} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="Adicionar Imovel" 
        component={AddImoveis} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name='plus' size={30} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileStack} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name='user' size={30} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Tabs" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Tabs" component={MyTabs} />
        <Stack.Screen name="DetalhesImovel" component={DetalhesImovel} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
