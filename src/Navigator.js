import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Icon from "react-native-vector-icons/FontAwesome";
import Imoveis from "./screens/Imoveis";
import AddImoveis from "./screens/AddImoveis";
import Profile from "./screens/Profile";
import Login from "./screens/Login";
import Registro from "./screens/Registro";

// Atualize a definição do stack navigator para a tela de autenticação
const AuthStack = createStackNavigator();

function AuthStackScreen() {
    return (
        <AuthStack.Navigator initialRouteName="Login">
            <AuthStack.Screen name="Login" component={Login} options={{ title: 'Login' }} />
            <AuthStack.Screen name="Registro" component={Registro} options={{ title: 'Registro' }} />
        </AuthStack.Navigator>
    );
}

const Stack = createStackNavigator();

function ProfileStack() {
    return (
        <Stack.Navigator initialRouteName="Auth">
            <Stack.Screen name="Auth" component={AuthStackScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ProfileScreen" component={Profile} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}

const Tab = createBottomTabNavigator();

function MyTabs() {
    return (
        <Tab.Navigator
            initialRouteName="Imoveis"
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
            <MyTabs />
        </NavigationContainer>
    );
}
