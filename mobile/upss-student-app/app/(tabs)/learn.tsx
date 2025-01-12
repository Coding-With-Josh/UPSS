import {
    View,
    Text,
    ScrollView,
    TextInput,
    TouchableOpacity,
  } from "react-native";
  import React from "react";
  import { SafeAreaView } from "react-native-safe-area-context";
  import { Avatar, AvatarImage } from "@/components/Avatar";
  import { Ionicons } from "@expo/vector-icons";
  
  export default function Learn() {
    return (
      <View
        className="flex w-screen h-screen py-10 px-6"
        style={{ backgroundColor: "#e8ecf4" }}
      >
        <View className="flex flex-row items-center justify-between w-full bg-white px-6 py-4 rounded-lg mt-4">
          <View className="flex flex-row gap-3 items-center justify-center">
            {/* <Image src={require('@/assets/images/logo.jpeg')} className="w-10 h-10" /> */}
        
            <View className="flex flex-col justify-center">

              <Text
                className="text-xl text-left text-black"
                style={{ fontFamily: "Quicksand_700Bold" }}
              >
                Learn
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
      </View>
    );
  }
  