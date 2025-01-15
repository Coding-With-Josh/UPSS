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
import { router } from "expo-router";

export default function Learn() {
  return (
    <View
      className="flex w-screen h-screen py-10 pb-20 px-6"
      style={{ backgroundColor: "#e8ecf4" }}
    >
      <View className="flex flex-row items-center justify-between w-full bg-white px-6 py-4 rounded-lg mt-4">
        <View className="flex flex-row gap-3 items-center">
          <Avatar>
                        <AvatarImage
                          source={require("@/assets/images/logo.jpeg")}
                          className="w-10 h-10"
                          style={{
                            width: 60,
                            height: 60,
                          }}
            />
          </Avatar>
          <View>
            <Text
              className="text-xl text-black"
              style={{ fontFamily: "Quicksand_700Bold" }}
            >
              Learn
            </Text>
            <Text
              className="text-sm text-gray-500"
              style={{ fontFamily: "Quicksand_500Medium" }}
            >
              Your learning dashboard
            </Text>
          </View>
        </View>

        <TouchableOpacity className="relative">
          <Ionicons name="notifications-outline" size={24} color="black" />
          <View className="absolute -top-2 -right-2 bg-blue-600 rounded-full h-5 w-5 items-center justify-center">
            <Text
              className="text-xs text-white"
              style={{ fontFamily: "Quicksand_700Bold" }}
            >
              3
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <ScrollView className="flex flex-col w-full mt-6 gap-4">
        <View className="flex flex-row items-center justify-between w-full bg-white px-6 py-2             [] rounded-lg">
          <TextInput
            placeholder="Search subjects..."
            className="flex-1 text-base"
            style={{ fontFamily: "Quicksand_500Medium" }}
          />
          <Ionicons name="search" size={24} color="gray" />
        </View>

        {/* Current Subjects Section */}
        <View className="flex flex-col gap-4 mt-4">
          <Text
            className="text-lg text-black"
            style={{ fontFamily: "Quicksand_700Bold" }}
          >
            My Subjects
          </Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="gap-4"
          >
            {[
              { title: "Mathematics", modules: 12, color: "#FFE4E1" },
              { title: "Physics", modules: 10, color: "#E0FFFF" },
              { title: "Chemistry", modules: 8, color: "#F0FFF0" },
              { title: "Biology", modules: 15, color: "#FFF0F5" },
              { title: "English", modules: 9, color: "#F0F8FF" },
              { title: "History", modules: 11, color: "#FAEBD7" },
            ].map((subject, index) => (
              <TouchableOpacity
                key={index}
                className="bg-white p-4 rounded-lg w-60 mr-4"
                style={{ borderLeftWidth: 6, borderLeftColor: subject.color }}
                onPress={()=> {
                  router.push("/(properties)/course-page")
                }}
              >
                <View className="flex-row justify-between items-center mb-3">
                  <Ionicons name="book-outline" size={24} color="black" />
                  <Text
                    className="text-blue-600"
                    style={{ fontFamily: "Quicksand_700Bold" }}
                  >
                    {subject.modules} modules
                  </Text>
                </View>
                <Text style={{ fontFamily: "Quicksand_700Bold" }}>
                  {subject.title}
                </Text>
                <View className="bg-gray-200 h-2 rounded-full mt-2">
                  <View className="bg-blue-600 h-2 rounded-full w-2/3" />
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Upcoming Tests Section */}
        <View className="flex flex-col gap-4 mt-4">
          <Text
            className="text-lg text-black"
            style={{ fontFamily: "Quicksand_700Bold" }}
          >
            Upcoming Tests
          </Text>

          <View className="flex flex-col gap-3">
            {[
              {
                subject: "Mathematics",
                topic: "Calculus",
                date: "Tomorrow, 9:00 AM",
              },
              {
                subject: "Physics",
                topic: "Mechanics",
                date: "Friday, 11:00 AM",
              },
            ].map((test, index) => (
              <View key={index} className="bg-white p-4 rounded-lg">
                <View className="flex-row justify-between items-center">
                  <View>
                    <Text style={{ fontFamily: "Quicksand_700Bold" }}>
                      {test.subject}
                    </Text>
                    <Text
                      style={{ fontFamily: "Quicksand_500Medium" }}
                      className="text-gray-500"
                    >
                      {test.topic}
                    </Text>
                  </View>
                  <View className="items-end">
                    <Text
                      style={{ fontFamily: "Quicksand_700Bold" }}
                      className="text-blue-600"
                    >
                      {test.date}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Study Resources Section */}
        <View className="flex flex-col gap-4 mt-4 mb-6">
          <Text
            className="text-lg text-black"
            style={{ fontFamily: "Quicksand_700Bold" }}
          >
            Study Resources
          </Text>

          <View className="flex-row justify-between gap-4">
            {[
              { title: "Past Papers", icon: "document-text-outline" as const },
              { title: "Study Notes", icon: "book-outline" as const },
              { title: "Video modules", icon: "play-circle-outline" as const },
            ].map((resource, index) => (
              <TouchableOpacity
                key={index}
                className="bg-white p-4 rounded-lg flex-1 items-center"
              >
                <Ionicons name={resource.icon} size={24} color="black" />
                <Text
                  className="mt-2 text-center"
                  style={{ fontFamily: "Quicksand_600SemiBold" }}
                >
                  {resource.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        {/* Learning Progress Section */}
        <View className="flex flex-col gap-4 mt-4">
          <Text
            className="text-lg text-black"
            style={{ fontFamily: "Quicksand_700Bold" }}
          >
            Learning Progress
          </Text>

          <View className="bg-white p-4 rounded-lg">
            <View className="flex-row justify-between mb-4">
              <Text style={{ fontFamily: "Quicksand_700Bold" }}>
                Overall Progress
              </Text>
              <Text
                className="text-blue-600"
                style={{ fontFamily: "Quicksand_700Bold" }}
              >
                75%
              </Text>
            </View>
            <View className="bg-gray-200 h-3 rounded-full">
              <View className="bg-blue-600 h-3 rounded-full w-3/4" />
            </View>
          </View>
        </View>

        {/* Study Groups Section */}
        <View className="flex flex-col gap-4 mt-4">
          <Text
            className="text-lg text-black"
            style={{ fontFamily: "Quicksand_700Bold" }}
          >
            Study Groups
          </Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="gap-4"
          >
            {[
              { name: "Math Study Group", members: 15, active: true },
              { name: "Physics Discussion", members: 8, active: false },
              { name: "Chemistry Lab Group", members: 12, active: true },
            ].map((group, index) => (
              <View key={index} className="bg-white p-4 rounded-lg w-60 mr-4">
                <View className="flex-row justify-between items-center">
                  <Ionicons name="people-outline" size={24} color="black" />
                  <View
                    className={`h-2 w-2 rounded-full ${
                      group.active ? "bg-green-500" : "bg-gray-400"
                    }`}
                  />
                </View>
                <Text
                  className="mt-2"
                  style={{ fontFamily: "Quicksand_700Bold" }}
                >
                  {group.name}
                </Text>
                <Text
                  className="text-gray-500"
                  style={{ fontFamily: "Quicksand_500Medium" }}
                >
                  {group.members} members
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Recommended Books Section */}
        <View className="flex flex-col gap-4 mt-4">
          <Text
            className="text-lg text-black"
            style={{ fontFamily: "Quicksand_700Bold" }}
          >
            Recommended Books
          </Text>

          <View className="flex flex-col gap-3">
            {[
              {
                title: "Advanced Mathematics",
                author: "John Smith",
                progress: "60%",
              },
              {
                title: "Physics Fundamentals",
                author: "Sarah Johnson",
                progress: "25%",
              },
              {
                title: "Chemistry Basics",
                author: "Robert Wilson",
                progress: "80%",
              },
            ].map((book, index) => (
              <View key={index} className="bg-white p-4 rounded-lg">
                <View className="flex-row justify-between items-center">
                  <View>
                    <Text style={{ fontFamily: "Quicksand_700Bold" }}>
                      {book.title}
                    </Text>
                    <Text
                      style={{ fontFamily: "Quicksand_500Medium" }}
                      className="text-gray-500"
                    >
                      By {book.author}
                    </Text>
                  </View>
                  <Text
                    className="text-blue-600"
                    style={{ fontFamily: "Quicksand_700Bold" }}
                  >
                    {book.progress}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Achievement Badges Section */}
        <View className="flex flex-col gap-4 mt-4 mb-6">
          <Text
            className="text-lg text-black"
            style={{ fontFamily: "Quicksand_700Bold" }}
          >
            Achievement Badges
          </Text>

          <View className="flex-row flex-wrap gap-4 justify-between">
            {[
              { name: "Quick Learner", icon: "trophy-outline" },
              { name: "Perfect Score", icon: "star-outline" },
              { name: "Study Streak", icon: "flame-outline" },
              { name: "Team Player", icon: "people-outline" },
            ].map((badge, index) => (
              <View
                key={index}
                className="bg-white p-4 rounded-lg items-center"
                style={{ width: "48%" }}
              >
                <Ionicons name={badge.icon as any} size={24} color="gold" />
                <Text
                  className="mt-2 text-center"
                  style={{ fontFamily: "Quicksand_600SemiBold" }}
                >
                  {badge.name}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
