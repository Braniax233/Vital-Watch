import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Import screens
import DashboardScreen from '../screens/DashboardScreen';
import HealthMetricsScreen from '../screens/HealthMetricsScreen';
import FitnessTipsScreen from '../screens/FitnessTipsScreen';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Metrics') {
            iconName = focused ? 'stats-chart' : 'stats-chart-outline';
          } else if (route.name === 'Tips') {
            iconName = focused ? 'bulb' : 'bulb-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#6366f1',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
        tabBarStyle: {
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={DashboardScreen}
        options={{
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen 
        name="Metrics" 
        component={HealthMetricsScreen}
        options={{
          tabBarLabel: 'Metrics',
        }}
      />
      <Tab.Screen 
        name="Tips" 
        component={FitnessTipsScreen}
        options={{
          tabBarLabel: 'Tips',
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;