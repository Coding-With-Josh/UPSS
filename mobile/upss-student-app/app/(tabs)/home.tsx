import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/Avatar";
import React from "react";
import { Button } from "@/components/ui/button";
import { BlurView } from "expo-blur";
import { AntDesign, Ionicons } from "@expo/vector-icons";

const Home = () => {
  return (
    <View
      className="flex w-screen h-screen py-10 px-6"
      style={{ backgroundColor: "#e8ecf4" }}
    >
      <View className="flex flex-row items-center justify-between w-full bg-white px-6 py-4 rounded-lg mt-4">
        <View className="flex flex-row gap-3 items-center justify-center">
          {/* <Image src={require('@/assets/images/logo.jpeg')} className="w-10 h-10" /> */}
          <TouchableOpacity>
            <Avatar>
              <AvatarImage
                source={require("@/assets/images/logo.jpeg")}
                className="w-10 h-10"
              />
              {/* <AvatarFallback>CG</AvatarFallback> */}
            </Avatar>
          </TouchableOpacity>

          <View className="flex flex-col justify-center">
            <Text
              className="text-lg text-left text-gray-800"
              style={{ fontFamily: "Quicksand_400Regular" }}
            >
              Welcome,
            </Text>
            <Text
              className="text-xl text-left text-black"
              style={{ fontFamily: "Quicksand_700Bold" }}
            >
              Joshua Idele
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
      <View
        className="mt-6"
        style={{
          marginTop: 50,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "white",
            borderRadius: 16,
            paddingHorizontal: 16,
            paddingVertical: 12,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.1,
            shadowRadius: 2,
            elevation: 2,
          }}
        >
          <Ionicons name="search-outline" size={20} color="#64748b" />
          <TextInput
            placeholder="Search courses, tasks..."
            placeholderTextColor="#64748b"
            style={{
              flex: 1,
              marginLeft: 12,
              fontSize: 16,
              fontFamily: "Quicksand_400Regular",
            }}
          />
          <TouchableOpacity>
            <BlurView
              intensity={70}
              style={{
                backgroundColor: "#f3f4f6",
                padding: 8,
                borderRadius: 12,
              }}
            >
              <Ionicons name="options-outline" size={18} color="#64748b" />
            </BlurView>
          </TouchableOpacity>
        </View>
        <View className="my-8 w-screen">
          <Text
            className="text-xl text-left text-black mt-8"
            style={{
              fontFamily: "Quicksand_700Bold",
              color: "#1E293B",
              fontSize: 24,
              marginTop: 40,
              marginBottom: 20,
            }}
          >
            Continue where you left off
          </Text>
          <ScrollView
            className="flex flex-row gap-4"
            style={{
              display: "flex",
              gap: 4,
            }}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
            <TouchableOpacity
              className="bg-white flex flex-row items-center justify-between gap-3 w-72 h-32 rounded-2xl p-4 mr-4"
              style={{
                width: 500,
                paddingVertical: 16,
                paddingHorizontal: 20,
                paddingRight: 40,
                marginRight: 20,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: "white",
                borderRadius: 13,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 2,
                elevation: 2,
              }}
            >
              <View className="flex flex-row items-center justify-between gap-3">
                <Image source={require("@/assets/images/react-logo.png")} width={20} height={20} className="h-40 w-40"/>
                <View className="flex flex-col gap-2">
                  <View>
                    <Text
                      style={{ fontFamily: "Quicksand_700Bold", fontSize: 18 }}
                    >
                      Course Title
                    </Text>
                    <Text
                      style={{
                        fontFamily: "Quicksand_400Regular",
                        color: "#64748b",
                      }}
                    >
                      Progress: 60%
                    </Text>
                  </View>
                </View>

              </View>
                <TouchableOpacity className="bg-blue-100 p-3 rounded-xl flex items-center"
                  style={{
                    width: 42,
                    borderWidth: 2,
                    height: 42,
                    borderRadius: 40,
                    display: "flex",
                    borderColor: "#3b82f6",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Ionicons name="chevron-forward" size={20} color="#3b82f6"/>
                </TouchableOpacity>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-white flex flex-row items-center justify-between gap-3 w-72 h-32 rounded-2xl p-4 mr-4"
              style={{
                width: 500,
                paddingVertical: 16,
                paddingHorizontal: 20,
                paddingRight: 40,
                marginRight: 20,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: "white",
                borderRadius: 13,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 2,
                elevation: 2,
              }}
            >
              <View className="flex flex-row items-center justify-between gap-3">
                <Image source={require("@/assets/images/react-logo.png")} width={20} height={20} className="h-40 w-40"/>
                <View className="flex flex-col gap-2">
                  <View>
                    <Text
                      style={{ fontFamily: "Quicksand_700Bold", fontSize: 18 }}
                    >
                      Course Title
                    </Text>
                    <Text
                      style={{
                        fontFamily: "Quicksand_400Regular",
                        color: "#64748b",
                      }}
                    >
                      Progress: 60%
                    </Text>
                  </View>
                </View>

              </View>
                <TouchableOpacity className="bg-blue-100 p-3 rounded-xl flex items-center"
                  style={{
                    width: 42,
                    borderWidth: 2,
                    height: 42,
                    borderRadius: 40,
                    display: "flex",
                    borderColor: "#3b82f6",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Ionicons name="chevron-forward" size={20} color="#3b82f6"/>
                </TouchableOpacity>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-white flex flex-row items-center justify-between gap-3 w-72 h-32 rounded-2xl p-4 mr-4"
              style={{
                width: 500,
                paddingVertical: 16,
                paddingHorizontal: 20,
                paddingRight: 40,
                marginRight: 20,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: "white",
                borderRadius: 13,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 2,
                elevation: 2,
              }}
            >
              <View className="flex flex-row items-center justify-between gap-3">
                <Image source={require("@/assets/images/react-logo.png")} width={20} height={20} className="h-40 w-40"/>
                <View className="flex flex-col gap-2">
                  <View>
                    <Text
                      style={{ fontFamily: "Quicksand_700Bold", fontSize: 18 }}
                    >
                      Course Title
                    </Text>
                    <Text
                      style={{
                        fontFamily: "Quicksand_400Regular",
                        color: "#64748b",
                      }}
                    >
                      Progress: 60%
                    </Text>
                  </View>
                </View>

              </View>
                <TouchableOpacity className="bg-blue-100 p-3 rounded-xl flex items-center"
                  style={{
                    width: 42,
                    borderWidth: 2,
                    height: 42,
                    borderRadius: 40,
                    display: "flex",
                    borderColor: "#3b82f6",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Ionicons name="chevron-forward" size={20} color="#3b82f6"/>
                </TouchableOpacity>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-white flex flex-row items-center justify-between gap-3 w-72 h-32 rounded-2xl p-4 mr-4"
              style={{
                width: 500,
                paddingVertical: 16,
                paddingHorizontal: 20,
                paddingRight: 40,
                marginRight: 20,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: "white",
                borderRadius: 13,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 2,
                elevation: 2,
              }}
            >
              <View className="flex flex-row items-center justify-between gap-3">
                <Image source={require("@/assets/images/react-logo.png")} width={20} height={20} className="h-40 w-40"/>
                <View className="flex flex-col gap-2">
                  <View>
                    <Text
                      style={{ fontFamily: "Quicksand_700Bold", fontSize: 18 }}
                    >
                      Course Title
                    </Text>
                    <Text
                      style={{
                        fontFamily: "Quicksand_400Regular",
                        color: "#64748b",
                      }}
                    >
                      Progress: 60%
                    </Text>
                  </View>
                </View>

              </View>
                <TouchableOpacity className="bg-blue-100 p-3 rounded-xl flex items-center"
                  style={{
                    width: 42,
                    borderWidth: 2,
                    height: 42,
                    borderRadius: 40,
                    display: "flex",
                    borderColor: "#3b82f6",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Ionicons name="chevron-forward" size={20} color="#3b82f6"/>
                </TouchableOpacity>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-white flex flex-row items-center justify-between gap-3 w-72 h-32 rounded-2xl p-4 mr-4"
              style={{
                width: 500,
                paddingVertical: 16,
                paddingHorizontal: 20,
                paddingRight: 40,
                marginRight: 20,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: "white",
                borderRadius: 13,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 2,
                elevation: 2,
              }}
            >
              <View className="flex flex-row items-center justify-between gap-3">
                <Image source={require("@/assets/images/react-logo.png")} width={20} height={20} className="h-40 w-40"/>
                <View className="flex flex-col gap-2">
                  <View>
                    <Text
                      style={{ fontFamily: "Quicksand_700Bold", fontSize: 18 }}
                    >
                      Course Title
                    </Text>
                    <Text
                      style={{
                        fontFamily: "Quicksand_400Regular",
                        color: "#64748b",
                      }}
                    >
                      Progress: 60%
                    </Text>
                  </View>
                </View>

              </View>
                <TouchableOpacity className="bg-blue-100 p-3 rounded-xl flex items-center"
                  style={{
                    width: 42,
                    borderWidth: 2,
                    height: 42,
                    borderRadius: 40,
                    display: "flex",
                    borderColor: "#3b82f6",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Ionicons name="chevron-forward" size={20} color="#3b82f6"/>
                </TouchableOpacity>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-white flex flex-row items-center justify-between gap-3 w-72 h-32 rounded-2xl p-4 mr-4"
              style={{
                width: 500,
                paddingVertical: 16,
                paddingHorizontal: 20,
                paddingRight: 40,
                flexDirection: "row",
                marginRight: 20,
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: "white",
                borderRadius: 13,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 2,
                elevation: 2,
              }}
            >
              <View className="flex flex-row items-center justify-between gap-3">
                <Image source={require("@/assets/images/react-logo.png")} width={20} height={20} className="h-40 w-40"/>
                <View className="flex flex-col gap-2">
                  <View>
                    <Text
                      style={{ fontFamily: "Quicksand_700Bold", fontSize: 18 }}
                    >
                      Course Title
                    </Text>
                    <Text
                      style={{
                        fontFamily: "Quicksand_400Regular",
                        color: "#64748b",
                      }}
                    >
                      Progress: 60%
                    </Text>
                  </View>
                </View>

              </View>
                <TouchableOpacity className="bg-blue-100 p-3 rounded-xl flex items-center"
                  style={{
                    width: 42,
                    borderWidth: 2,
                    height: 42,
                    borderRadius: 40,
                    display: "flex",
                    borderColor: "#3b82f6",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Ionicons name="chevron-forward" size={20} color="#3b82f6"/>
                </TouchableOpacity>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-white flex flex-row items-center justify-between gap-3 w-72 h-32 rounded-2xl p-4 mr-4"
              style={{
                width: 500,
                paddingVertical: 16,
                paddingHorizontal: 20,
                paddingRight: 40,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: "white",
                borderRadius: 13,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 2,
                elevation: 2,
              }}
            >
              <View className="flex flex-row items-center justify-between gap-3">
                <Image source={require("@/assets/images/react-logo.png")} width={20} height={20} className="h-40 w-40"/>
                <View className="flex flex-col gap-2">
                  <View>
                    <Text
                      style={{ fontFamily: "Quicksand_700Bold", fontSize: 18 }}
                    >
                      Course Title
                    </Text>
                    <Text
                      style={{
                        fontFamily: "Quicksand_400Regular",
                        color: "#64748b",
                      }}
                    >
                      Progress: 60%
                    </Text>
                  </View>
                </View>

              </View>
                <TouchableOpacity className="bg-blue-100 p-3 rounded-xl flex items-center"
                  style={{
                    width: 42,
                    borderWidth: 2,
                    height: 42,
                    borderRadius: 40,
                    display: "flex",
                    borderColor: "#3b82f6",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Ionicons name="chevron-forward" size={20} color="#3b82f6"/>
                </TouchableOpacity>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default Home;
