import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'other';
    timestamp: Date;
}

export default function ChatPage() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');

    const sendMessage = () => {
        if (newMessage.trim()) {
            const message: Message = {
                id: Date.now().toString(),
                text: newMessage,
                sender: 'user',
                timestamp: new Date(),
            };
            setMessages([...messages, message]);
            setNewMessage('');
        }
    };

    const renderMessage = ({ item }: { item: Message }) => (
        <View style={[
            styles.messageContainer,
            item.sender === 'user' ? styles.userMessage : styles.otherMessage
        ]}>
            <Text style={styles.messageText}>{item.text}</Text>
            <Text style={styles.timestamp}>
                {item.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Chat</Text>
            </View>
            
            <FlatList
                data={messages}
                renderItem={renderMessage}
                keyExtractor={(item) => item.id}
                style={styles.messageList}
            />

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={newMessage}
                    onChangeText={setNewMessage}
                    placeholder="Type a message..."
                    multiline
                />
                <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
                    <Text style={styles.sendButtonText}>Send</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    headerText: {
        fontSize: 20,
        fontFamily: "Quicksand_700Bold"
    },
    messageList: {
        flex: 1,
        padding: 16,
    },
    messageContainer: {
        minWidth: '10%',
        maxWidth: '80%',
        marginVertical: 4,
        paddingHorizontal: 12,
        paddingVertical: 3,
        borderRadius: 12,
    },
    userMessage: {
        alignSelf: 'flex-end',
        backgroundColor: '#007AFF',
        fontFamily: "Quicksand_400Regular"
    },
    otherMessage: {
        alignSelf: 'flex-start',
        backgroundColor: '#E8E8E8',
        fontFamily: "Quicksand_400Regular"
    },
    messageText: {
        color: '#fff',
        fontFamily: "Quicksand_500Medium"
    },
    timestamp: {
        textAlign: "right",
        fontSize: 9,
        color: '#rgba(255, 255, 255, 0.7)',
        marginTop: 4,
    },
    inputContainer: {
        flexDirection: 'row',
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    input: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginRight: 8,
        fontFamily: "Quicksand_500Medium",
        maxHeight: 100,
    },
    sendButton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#007AFF',
        borderRadius: 20,
        paddingHorizontal: 16,
    },
    sendButtonText: {
        color: '#fff',
        fontFamily: "Quicksand_700Bold",
    },
});