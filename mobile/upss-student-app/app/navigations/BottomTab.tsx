import { View, Text, StyleSheet, Platform } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from "@expo/vector-icons";
import Home from "../(tabs)/home";
import Learn from "../(tabs)/learn";
import Profile from "../(tabs)/me";
import Chats from "../(tabs)/chats";

const BottomTabNavigator = createBottomTabNavigator();

export default function BottomTab() {
  //   const tabBarHeight = useBottomTabBarHeight();
  return (
    <BottomTabNavigator.Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: styles.label,
        tabBarStyle: [
          styles.tabContainer,
          Platform.OS === "ios" && {
            shadowOffset: { height: -2, width: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 15,
            width: "100%",
          },    
        ],
        tabBarItemStyle: {
          marginBottom: 7,
        },
        tabBarInactiveTintColor: "gray",
        tabBarActiveTintColor: "#0071ff",
      }}
      safeAreaInsets={{
        bottom: 0,
      }}
    >
      <BottomTabNavigator.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="home"
              size={22}
              color={focused ? "#0071ff" : "gray"}
            />
          ),
        }}
      />
      <BottomTabNavigator.Screen
        name="Learn"
        component={Learn}
        options={{
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="book"
              size={21}
              color={focused ? "#0071ff" : "gray"}
            />
          ),
        }}
      />
      <BottomTabNavigator.Screen
        name="Chats"
        component={Chats}
        options={{
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="message1"
              size={22}
              color={focused ? "#0071ff" : "gray"}
            />
          ),
        }}
      />
      <BottomTabNavigator.Screen
        name="Me"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="user"
              size={22}
              color={focused ? "#0071ff" : "gray"}
            />
          ),
        }}
      />
    </BottomTabNavigator.Navigator>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    position: "absolute",
    width: "100%",
    // left: "5%",
    bottom: 0,
    backgroundColor: "white",
    height: 60,
  },
  label: {
    textTransform: "capitalize",
    fontFamily: "Quicksand_400Regular",
    fontSize: 12,
  },
});
