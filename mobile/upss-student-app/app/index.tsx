import { Link, useRouter } from "expo-router";
import {
  Text,
  Touchable,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";

const Onboarding = () => {
  const router = useRouter();
  return (
    <View
      className="flex justify-center items-center bg-blue-50/80 dark:bg-black text-black w-screen h-screen px-8"
      style={{ backgroundColor: "#e8ecf4" }}
    >
      <View>
        <View className="mb-24">
          <Text
            className="text-4xl font-bold text-blue-800 text-center mb-2"
            style={{ fontFamily: "Quicksand_700Bold" }}
          >
            Welcome to The UPSS Student App
          </Text>
          <Text
            className="text-gray-600 text-center px-6"
            style={{ fontFamily: "Quicksand_400Regular" }}
          >
            Your digital companion for a better school experience
          </Text>
        </View>

        <View className="space-y-4 w-full px-6 mb-20">
          <View className="bg-white p-4 rounded-lg shadow-sm space-y-4">
            <Text
              className="text-blue-800 font-semibold mb-2"
              style={{ fontFamily: "Quicksand_600SemiBold" }}
            >
              Track Assignments
            </Text>
            <Text
              className="text-gray-600"
              style={{ fontFamily: "Quicksand_400Regular" }}
            >
              Never miss a deadline with our assignment tracker
            </Text>
          </View>

          <View className="bg-white p-4 rounded-lg shadow-sm">
            <Text
              className="text-blue-800 font-semibold mb-2"
              style={{ fontFamily: "Quicksand_600SemiBold" }}
            >
              View Schedule
            </Text>
            <Text
              className="text-gray-600"
              style={{ fontFamily: "Quicksand_400Regular" }}
            >
              Stay organized with your class timetable
            </Text>
          </View>
        </View>

        <TouchableOpacity
          className="flex justify-center items-center bg-blue-600 w-fit py-3 text-white rounded-md shadow-md"
          onPress={() => router.push("/sign-in")}
        >
          <Text
            className="text-white font-semibold"
            style={{ fontFamily: "Quicksand_700Bold" }}
          >
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Onboarding;
// Add onboarding content within the first View

const styles = StyleSheet.create({
  formAction: {
    marginVertical: 24,
  },
});
