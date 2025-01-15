import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";

export default function Profile() {
  const menuItems: { icon: keyof typeof Ionicons.glyphMap; title: string; badge: string | null }[] = [
    { icon: "person-outline", title: "Personal Information", badge: null },
    { icon: "settings-outline", title: "Settings", badge: null },
    { icon: "shield-outline", title: "Privacy & Security", badge: "New" },
    { icon: "help-circle-outline", title: "Help & Support", badge: null },
    { icon: "log-out-outline", title: "Logout", badge: null },
  ];

  return (
        <View className="flex w-screen h-screen py-10 px-6" style={{ backgroundColor: "#e8ecf4" }}>
      <StatusBar barStyle="dark-content" />
      <ScrollView>
        {/* Header */}
        <View className="flex flex-row items-center justify-between w-full bg-white px-6 py-4 rounded-lg mt-4">
        <View className="flex flex-row gap-3 items-center justify-center">
          {/* <Image src={require('@/assets/images/logo.jpeg')} className="w-10 h-10" /> */}

          <View className="flex flex-col justify-center">
            <Text
              className="text-xl text-left text-black"
              style={{ fontFamily: "Quicksand_700Bold" }}
            >
              Profile
            </Text>
          </View>
        </View>
        <TouchableOpacity className="relative h-6 w-6">
          <Ionicons name="notifications-outline" size={24} color="black" />
          <View
            className="bg-blue-600 absolute top-0"
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              borderRadius: "100%",
              height: 18,
              width: 18,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
            }}
          >
            <Text
              className="text-white"
              style={{ fontFamily: "Quicksand_700Bold" }}
            >
              3
            </Text>
          </View>
        </TouchableOpacity>
      </View>

        {/* Profile Picture Section */}
        <View className="items-center py-8">
          <View className="relative">
            <View className="w-32 h-32 rounded-full bg-blue-100 items-center justify-center">
              <Text className="text-4xl font-bold text-blue-600">JI</Text>
            </View>
            <TouchableOpacity
              className="absolute bottom-0 right-0 bg-blue-600 p-3 rounded-full shadow-lg"
              style={{ elevation: 4 }}
            >
              <AntDesign name="camera" size={20} color="white" />
            </TouchableOpacity>
          </View>
          <Text className="mt-4 text-xl h-fit" style={{fontFamily: "Quicksand_700Bold"}}>John Isaac</Text>
          <Text className="text-gray-500" style={{fontFamily: "Quicksand_600SemiBold"}}>john.isaac@example.com</Text>
        </View>

        {/* Menu Items */}
        <View className="">
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              className="flex-row items-center bg-white my-1 p-4 rounded-xl"
              style={{ elevation: 1 }}
            >
              <Ionicons name={item.icon} size={24} color="#4b5563" />
              <Text className="flex-1 ml-4 text-base" style={{    fontFamily: "Quicksand_400Regular",}}>{item.title}</Text>
              {item.badge && (
                <View className="bg-blue-100 px-2 py-1 rounded-full">
                  <Text className="text-blue-600 text-xs" style={{fontFamily: "Quicksand_400Regular"}}>{item.badge}</Text>
                </View>
              )}
              <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Version Info */}
        <Text className="text-center text-gray-400 py-6" style={{fontFamily: "Quicksand_400Regular"}}>Version 1.0.0</Text>
      </ScrollView>
    </View>
  );
}
