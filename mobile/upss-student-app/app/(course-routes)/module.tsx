import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View, ScrollView } from "react-native";
import { useRouter } from "expo-router";

export default function ModulePage() {
    const router = useRouter();

    return (
        <View className="flex-1 bg-gray-50">
            <View className="bg-white p-6 pt-14">
                <TouchableOpacity onPress={() => router.back()} className="mb-4">
                    <Ionicons name="arrow-back" size={24} color="#1E293B" />
                </TouchableOpacity>
                <View className="mb-4">
                    <Text className="text-2xl mb-1" style={{ fontFamily: "Quicksand_700Bold" }}>
                        Module 1
                    </Text>
                    <Text className="text-gray-500" style={{ fontFamily: "Quicksand_400Regular" }}>
                        4 lessons • 45 mins total
                    </Text>
                </View>
            </View>

            <ScrollView className="p-4">
                <View className="bg-white rounded-xl">
                        <LessonItem 
                            lesson={1}
                            completed={true}
                            type={'note'}
                        />
                        <LessonItem 
                            lesson={2}
                            completed={false}
                            type={'quiz'}
                        />
                        <LessonItem 
                            lesson={3}
                            completed={false}
                            type={'game'}
                        />
                        <LessonItem 
                            lesson={4}
                            completed={false}
                            type={'assignment'}
                        />
                        <LessonItem 
                            lesson={5}
                            completed={false}
                            type={'flashcard'}
                        />
                </View>

                <TouchableOpacity 
                    className="bg-blue-500 p-4 rounded-xl mt-6 mb-4"
                    onPress={() => {/* Handle continue */}}
                >
                    <Text 
                        className="text-white text-center text-lg"
                        style={{ fontFamily: "Quicksand_700Bold" }}
                    >
                        Continue Learning
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}
type LessonType = 'note' | 'quiz' | 'game' | 'assignment' | 'flashcard';

interface LessonItemProps {
    lesson: number;
    completed: boolean;
    type: LessonType;
}

const getLessonIcon = (type: LessonType) => {
    switch (type) {
        case 'note': return 'book-outline';
        case 'quiz': return 'help-circle-outline';
        case 'game': return 'game-controller-outline';
        case 'assignment': return 'document-text-outline';
        case 'flashcard': return 'card-outline';
        default: return 'play-circle-outline';
    }
};

const LessonItem = ({ lesson, completed, type }: LessonItemProps) => {
        const router = useRouter();
        return (
    <TouchableOpacity 
        onPress={()=> {
            type === "note" ? router.push("/(course-routes)/note") : type === "quiz" ? router.push("/(course-routes)/quiz") : 
        type === "game" ? router.push("/(course-routes)/game") : type === "assignment" ? router.push("/(course-routes)/assignment") : router.push("/(course-routes)/flashcard")
        }}
        className="flex-row items-center justify-between p-4 border-b border-gray-100"
    >
        <View className="flex-row items-center gap-3">
            <View className={`p-2 rounded-lg ${completed ? 'bg-green-100' : 'bg-blue-100'}`}>
                <Ionicons 
                    name={completed ? "checkmark-circle" : getLessonIcon(type)} 
                    size={20} 
                    color={completed ? "#22c55e" : "#3b82f6"} 
                />
            </View>
            <View>
                <Text className="text-base" style={{ fontFamily: "Quicksand_700Bold" }}>
                    Lesson {lesson}
                </Text>
                <Text className="text-gray-500" style={{ fontFamily: "Quicksand_400Regular" }}>
                    {type.charAt(0).toUpperCase() + type.slice(1)} • 12 mins
                </Text>
            </View>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#3b82f6" />
    </TouchableOpacity>
        )
    };
