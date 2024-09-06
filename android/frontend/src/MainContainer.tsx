import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from "react-native-vector-icons/Ionicons"
import Home from './screens/Home'
import UserDashboard from './screens/UserDashboard'

const Tab = createBottomTabNavigator();

const MainContainer = () => {
    return (
        <NavigationContainer independent={true}>
            <Tab.Navigator
            initialRouteName="Home"
            screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                    let iconName;
                    let routeName = route.name
                    if (routeName === "Home")
                        iconName = focused ? 'home' : 'home-outline'
                    if (routeName === "UserDashboard")
                        iconName = focused ? 'person-circle' : 'person-circle-outline'
                    return <Ionicons name={iconName} size={size} color={color} />
                },
                
            })}>
                <Tab.Screen options={{headerShown: false}} name='Home' component={Home}/>
                <Tab.Screen options={{headerShown: false, title: "User Dashboard"}} name='UserDashboard' component={UserDashboard}/>
            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default MainContainer;
