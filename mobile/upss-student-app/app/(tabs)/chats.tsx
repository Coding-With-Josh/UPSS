import { View, Text, ScrollView, TextInput, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Avatar, AvatarImage } from "@/components/Avatar";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from 'expo-router';

export default function Chats() {
    const router = useRouter();
    const chatData = [
        {
            name: "John Doe",
            lastMessage: "Hello there!",
            time: "10:30 AM",
            unreadCount: 2,
            avatar: null
        },
        {
            name: "Jane Smith",
            lastMessage: "How are you?",
            time: "9:45 AM",
            unreadCount: 1,
            avatar: null
        },
        {
            name: "Mike Johnson",
            lastMessage: "See you later!",
            time: "Yesterday",
            unreadCount: 0,
            avatar: null
        },
        {
            name: "Sarah Wilson",
            lastMessage: "Can we meet tomorrow?",
            time: "Yesterday",
            unreadCount: 3,
            avatar: null
        },
        {
            name: "Alex Brown",
            lastMessage: "Thanks for your help!",
            time: "2 days ago",
            unreadCount: 0,
            avatar: null
        },
        {
            name: "Emily Davis",
            lastMessage: "The project is done",
            time: "2 days ago",
            unreadCount: 1,
            avatar: null
        }
    ];

    const [searchQuery, setSearchQuery] = useState('');
    const [filteredChats, setFilteredChats] = useState(chatData);

    useEffect(() => {
        const filtered = chatData.filter((chat) =>
            chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredChats(filtered);
    }, [searchQuery]);

    return (
        <View className="flex w-screen h-screen py-10 px-6" style={{ backgroundColor: "#e8ecf4" }}>
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
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />

                    {filteredChats.map((chat, i) => (
                        <TouchableOpacity
                            key={i}
                            className="flex flex-row items-center justify-between bg-white p-5 rounded-lg"
                            style={{ marginBottom: 7 }}
                            onPress={() => router.push({
                                pathname: "/(properties)/chat-page",
                                params: {
                                    id: i,
                                    name: chat.name,
                                    lastMessage: chat.lastMessage
                                }
                            })}
                        >
                            <View className="flex flex-row gap-3">
                                <Avatar className="w-12 h-12 rounded-full" 
                                    style={{
                                        borderRadius: 60,
                                    }}
                                >
                                    <AvatarImage
                                    style={{
                                        borderRadius: 60,
                                    }}
                                        source={{ uri: chat.avatar || `https://i.pravatar.cc/150?img=${i + 1}` }}
                                    />
                                </Avatar>
                                <View>
                                    <Text
                                        style={{ fontFamily: "Quicksand_700Bold" }}
                                        className="text-base"
                                    >
                                        {chat.name}
                                    </Text>
                                    <Text
                                        style={{ fontFamily: "Quicksand_400Regular" }}
                                        className="text-gray-500"
                                    >
                                        {chat.lastMessage}
                                    </Text>
                                </View>
                            </View>
                            <View className="items-end">
                                <Text
                                    style={{ fontFamily: "Quicksand_400Regular" }}
                                    className="text-xs text-gray-500"
                                >
                                    {chat.time}
                                </Text>
                                {chat.unreadCount > 0 && (
                                    <View 
                                        className="bg-blue-600 rounded-full w-5 h-5 items-center justify-center mt-1"
                                        style={{
                                            borderRadius: 30,
                                        }}
                                    >
                                        <Text
                                            style={{ fontFamily: "Quicksand_700Bold" }}
                                            className="text-white text-xs"
                                        >
                                            {chat.unreadCount}
                                        </Text>
                                    </View>
                                )}
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}
