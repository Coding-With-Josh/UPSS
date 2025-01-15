import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Image, ScrollView, Animated } from "react-native";
import { Text, TouchableOpacity, View } from "react-native";
import { useState, useRef } from "react";


// Add this data
const modules = [
    { id: 1, title: "Introduction to Numbers", duration: "2 hours", lessons: 4 },
  { id: 2, title: "Basic Algebra", duration: "3 hours", lessons: 6 },
  { id: 3, title: "Linear Equations", duration: "4 hours", lessons: 5 },
  { id: 4, title: "Quadratic Equations", duration: "3 hours", lessons: 4 },
  { id: 5, title: "Geometry Basics", duration: "3 hours", lessons: 5 },
  { id: 6, title: "Trigonometry", duration: "4 hours", lessons: 6 },
];

const learningObjectives = [
  "Master fundamental mathematical concepts",
  "Solve complex algebraic equations",
  "Understand geometric principles",
  "Apply mathematical concepts to real-world problems",
  "Develop analytical thinking skills",
  "Prepare for advanced mathematics courses",
];

export default function CoursePage() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-gray-50">
      <CourseHeader
        onBack={() => router.back()}
        title="Mathematics 101"
        instructor="Dr. Smith"
        image={require("@/assets/images/courses/course-one.jpeg")}
      />
      <View className="w-full h-[1px] bg-gray-200 px-6"/>

      <ScrollView className="flex-1">
        <View className="bg-white rounded-t-3xl -mt-8 px-4 md:px-6 pt-10 pb-24">
          <Text
            className="text-xl md:text-2xl lg:text-3xl mb-1"
            style={{ fontFamily: "Quicksand_700Bold" }}
          >
            Mathematics 101
          </Text>
          <Text
            className="text-gray-500 mb-4 text-sm md:text-base"
            style={{ fontFamily: "Quicksand_400Regular" }}
          >
            Instructor: Dr. Smith
          </Text>

          <ProgressBar progress={60} />

          <Text
            className="text-gray-600 mb-6 text-sm md:text-base"
            style={{ fontFamily: "Quicksand_400Regular" }}
          >
            Master the fundamentals of mathematics through this comprehensive
            course. Perfect for beginners and intermediate learners looking to
            strengthen their mathematical foundation.
          </Text>

          <View className="flex-row justify-between mb-6 flex-wrap gap-4">
            <InfoCard icon="time-outline" label="Duration" value="12 weeks" />
            <InfoCard icon="book-outline" label="Lessons" value="24 total" />
            <InfoCard icon="trophy-outline" label="Level" value="Beginner" />
          </View>

          <Text
            className="text-lg md:text-xl mb-4"
            style={{ fontFamily: "Quicksand_700Bold" }}
          >
            Course Modules
          </Text>
          <View className="bg-white rounded-xl mb-6">
            {modules.map((module) => (
              <ModuleItem key={module.id} module={module} onPress={() => {}} />
            ))}
          </View>

          <Text
            className="text-lg md:text-xl mb-4"
            style={{ fontFamily: "Quicksand_700Bold" }}
          >
            What you'll learn
          </Text>
          <View className="mb-6">
            {learningObjectives.map((objective, index) => (
              <View key={index} className="flex-row items-start mb-3">
                <Ionicons name="checkmark-circle" size={24} color="#3b82f6" />
                <Text
                  className="ml-2 text-gray-600 flex-1 text-sm md:text-base"
                  style={{ fontFamily: "Quicksand_400Regular" }}
                >
                  {objective}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      <View className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100">
        <TouchableOpacity
          className="bg-blue-500 p-3 md:p-4 rounded-xl"
          onPress={() => router.push("/(course-routes)/module")}
        >
          <Text
            className="text-white text-center text-base md:text-lg"
            style={{ fontFamily: "Quicksand_700Bold" }}
          >
            Continue Learning
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


const ProgressBar = ({ progress }: { progress: number }) => (
  <View className="h-2 bg-gray-200 rounded-full mb-4">
    <View
      className="h-full bg-blue-500 rounded-full"
      style={{ width: `${progress}%` }}
    />
  </View>
);

// Add these new components
const InfoCard = ({
  icon,
  label,
  value,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
}) => (
  <View className="items-center flex-1 min-w-[100px]">
    <Ionicons name={icon} size={24} color="#3b82f6" />
    <Text
      className="text-gray-500 text-xs md:text-sm mt-1"
      style={{ fontFamily: "Quicksand_400Regular" }}
    >
      {label}
    </Text>
    <Text
      className="font-semibold text-sm md:text-base"
      style={{ fontFamily: "Quicksand_600SemiBold" }}
    >
      {value}
    </Text>
  </View>
);

const ModuleItem = ({
  module,
  onPress,
}: {
  module: { id: number; title: string; duration: string; lessons: number };
  onPress: () => void;
}) => (
  <TouchableOpacity 
    className="p-3 md:p-4 border-b border-gray-100" 
    onPress={onPress}
  >
    <Text 
      className="text-sm md:text-base"
      style={{ fontFamily: "Quicksand_600SemiBold" }}
    >
      Module {module.id}: {module.title}
    </Text>
    <Text
      className="text-gray-500 text-xs md:text-sm"
      style={{ fontFamily: "Quicksand_400Regular" }}
    >
      {module.duration} • {module.lessons} lessons
    </Text>
  </TouchableOpacity>
);


const CourseHeader = ({ onBack, title, instructor, image }: any) => (
  <View className="bg-white p-4 md:p-6 pt-12 md:pt-14">
    <TouchableOpacity onPress={onBack} className="mb-4">
      <Ionicons name="arrow-back" size={24} color="#1E293B" />
    </TouchableOpacity>
    <View className="flex-row items-center gap-3 md:gap-4">
      <Image source={image} className="w-16 h-16 md:w-20 md:h-20 rounded-xl" />
      <View className="flex-1">
        <Text
          className="text-xl md:text-2xl mb-1"
          style={{ fontFamily: "Quicksand_700Bold" }}
        >
          {title}
        </Text>
        <Text
          className="text-gray-500 text-sm md:text-base"
          style={{ fontFamily: "Quicksand_400Regular" }}
        >
          Instructor: {instructor}
        </Text>
      </View>
    </View>
  </View>
);
