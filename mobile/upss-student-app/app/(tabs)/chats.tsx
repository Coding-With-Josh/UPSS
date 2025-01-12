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
import { useRouter } from 'expo-router';

export default function Chats() {
    const router = useRouter();

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
              Chats
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
      <ScrollView className="w-full mt-4">
        <View className="flex flex-col gap-4">
          <TextInput
            placeholder="Search chats..."
            className="w-full bg-gray-100 px-4 py-3 rounded-lg"
            style={{ fontFamily: "Quicksand_400Regular" }}
          />

          {[1, 2, 3].map((_, i) => (
            <TouchableOpacity
              key={i}
              className="flex flex-row items-center justify-between bg-white p-4 rounded-lg"
              style={{
                marginBottom: 15,
              }}
              onPress={() => router.push("/(properties)/chat-page")}
            >
              <View className="flex flex-row gap-3">
                <Avatar className="w-12 h-12">
                  <AvatarImage
                    source={{ uri: `https://i.pravatar.cc/150?img=${i + 1}` }}
                  />
                </Avatar>
                <View>
                  <Text
                    style={{ fontFamily: "Quicksand_700Bold" }}
                    className="text-base"
                  >
                    {["Math Tutor", "Study Group", "Physics Help"][i]}
                  </Text>
                  <Text
                    style={{ fontFamily: "Quicksand_400Regular" }}
                    className="text-gray-500"
                  >
                    {
                      [
                        "Let's solve this equation",
                        "Meeting at 3 PM",
                        "Need help with homework",
                      ][i]
                    }
                  </Text>
                </View>
              </View>
              <View className="items-end">
                <Text
                  style={{ fontFamily: "Quicksand_400Regular" }}
                  className="text-xs text-gray-500"
                >
                  {["2m ago", "1h ago", "5h ago"][i]}
                </Text>
                <View className="bg-blue-600 rounded-full w-5 h-5 items-center justify-center mt-1"
                    style={{
                        borderRadius: 30,
                    }}
                >
                  <Text
                    style={{ fontFamily: "Quicksand_700Bold" }}
                    className="text-white text-xs"
                  >
                    {i + 1}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}

        </View>
      </ScrollView>
    </View>
  );
}
