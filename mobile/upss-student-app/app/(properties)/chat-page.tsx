import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, Image, Modal, Animated } from 'react-native';
import { useState, useRef, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import * as Location from 'expo-location';
import { Audio } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';
import * as WebBrowser from 'expo-web-browser';

interface Message {
    id: string;
    type: 'text' | 'image' | 'document' | 'location' | 'audio';
    content: any;
    sender: 'user' | 'other';
    timestamp: Date;
}

export default function ChatPage({name}: any) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [isRecording, setIsRecording] = useState(false);
    const [recording, setRecording] = useState<Audio.Recording | null>(null);
    const [showAttachments, setShowAttachments] = useState(false);
    const [recordingDuration, setRecordingDuration] = useState(0);
    const recordingTimer = useRef<NodeJS.Timeout | null>(null);
    const recordingRef = useRef<Audio.Recording | null>(null);
    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const [isPlaying, setIsPlaying] = useState<string | null>(null);
    const router = useRouter();
    const [isRecorderReady, setIsRecorderReady] = useState(false);

    // Cleanup both recording and sound when component unmounts
    useEffect(() => {
        let isMounted = true;

        const cleanup = async () => {
            try {
                if (recordingRef.current) {
                    await recordingRef.current.stopAndUnloadAsync();
                }
                if (recordingTimer.current) {
                    clearInterval(recordingTimer.current);
                }
                if (sound) {
                    await sound.unloadAsync();
                }
            } catch (error) {
                console.error('Cleanup error:', error);
            }
        };

        return () => {
            isMounted = false;
            cleanup();
        };
    }, [sound]);

    // Handle text messages
    const sendMessage = () => {
        if (newMessage.trim()) {
            const message: Message = {
                id: Date.now().toString(),
                type: 'text',
                content: newMessage,
                sender: 'user',
                timestamp: new Date(),
            };
            setMessages([...messages, message]);
            setNewMessage('');
        }
    };

    // Handle image attachments
    const handleImagePicker = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
        });

        if (!result.canceled) {
            const message: Message = {
                id: Date.now().toString(),
                type: 'image',
                content: result.assets[0].uri,
                sender: 'user',
                timestamp: new Date(),
            };
            setMessages([...messages, message]);
        }
    };

    // Handle document attachments
    const handleDocumentPicker = async () => {
        const result = await DocumentPicker.getDocumentAsync({});
        if (result.assets && result.assets.length > 0) {
            const message: Message = {
                id: Date.now().toString(),
                type: 'document',
                content: { name: result.assets[0].name, uri: result.assets[0].uri },
                sender: 'user',
                timestamp: new Date(),
            };
            setMessages([...messages, message]);
        }
    };

    // Handle location sharing
    const shareLocation = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === 'granted') {
            const location = await Location.getCurrentPositionAsync({});
            const message: Message = {
                id: Date.now().toString(),
                type: 'location',
                content: {
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                },
                sender: 'user',
                timestamp: new Date(),
            };
            setMessages([...messages, message]);
        }
    };

    // Handle voice recording with proper cleanup
    const prepareRecorder = async () => {
        try {
            await Audio.requestPermissionsAsync();
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
                staysActiveInBackground: true,
                playThroughEarpieceAndroid: false,
                shouldDuckAndroid: true,
            });
            setIsRecorderReady(true);
        } catch (error) {
            console.error('Failed to prepare recorder:', error);
            setIsRecorderReady(false);
        }
    };

    const startRecording = async () => {
        try {
            // Prepare recorder if not ready
            if (!isRecorderReady) {
                await prepareRecorder();
            }

            // Clean up any existing recording
            if (recordingRef.current) {
                await recordingRef.current.stopAndUnloadAsync();
            }

            const { recording } = await Audio.Recording.createAsync(
                Audio.RecordingOptionsPresets.HIGH_QUALITY
            );

            recordingRef.current = recording;
            setIsRecording(true);
            setRecordingDuration(0);

            if (recordingTimer.current) {
                clearInterval(recordingTimer.current);
            }

            recordingTimer.current = setInterval(() => {
                setRecordingDuration(prev => prev + 1);
            }, 1000);
        } catch (error) {
            console.error('Failed to start recording:', error);
            setIsRecording(false);
            setIsRecorderReady(false);
        }
    };

    const stopRecording = async () => {
        try {
            if (!recordingRef.current) {
                console.log('No active recording found');
                return;
            }

            if (recordingTimer.current) {
                clearInterval(recordingTimer.current);
            }

            setIsRecording(false);
            
            const recording = recordingRef.current;
            recordingRef.current = null;

            await recording.stopAndUnloadAsync();
            const uri = recording.getURI();

            if (uri && recordingDuration > 1) {
                const message: Message = {
                    id: Date.now().toString(),
                    type: 'audio',
                    content: { uri, duration: recordingDuration },
                    sender: 'user',
                    timestamp: new Date(),
                };
                setMessages(prev => [...prev, message]);
            }

            setRecordingDuration(0);
        } catch (error) {
            console.error('Failed to stop recording:', error);
            setIsRecording(false);
            setIsRecorderReady(false);
        }
    };

    const playAudio = async (uri: string, messageId: string) => {
        try {
            if (sound) {
                await sound.unloadAsync();
            }
            const { sound: newSound } = await Audio.Sound.createAsync({ uri });
            setSound(newSound);
            setIsPlaying(messageId);
            
            await newSound.playAsync();
            newSound.setOnPlaybackStatusUpdate((status) => {
                if (status && !status.isLoaded) {
                    // Error case
                    setIsPlaying(null);
                    return;
                }
                
                if (status.isLoaded && status.didJustFinish) {
                    setIsPlaying(null);
                    sound?.unloadAsync();
                }
            });
        } catch (err) {
            console.error('Failed to play audio', err);
            setIsPlaying(null);
        }
    };

    const openLocation = async (latitude: number, longitude: number) => {
        const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
        await WebBrowser.openBrowserAsync(url);
    };

    const renderMessage = ({ item }: { item: Message }) => (
        <View style={[
            styles.messageContainer,
            item.sender === 'user' ? styles.userMessage : styles.otherMessage
        ]}>
            {item.type === 'text' && <Text style={styles.messageText}>{item.content}</Text>}
            {item.type === 'image' && (
                <TouchableOpacity onPress={() => WebBrowser.openBrowserAsync(item.content)}>
                    <Image source={{ uri: item.content }} style={styles.imageMessage} />
                </TouchableOpacity>
            )}
            {item.type === 'document' && (
                <TouchableOpacity 
                    style={styles.documentContainer}
                    onPress={() => WebBrowser.openBrowserAsync(item.content.uri)}
                >
                    <Ionicons name="document" size={24} color="#fff" />
                    <Text style={styles.documentText}>{item.content.name}</Text>
                </TouchableOpacity>
            )}
            {item.type === 'location' && (
                <TouchableOpacity 
                    style={styles.locationContainer}
                    onPress={() => openLocation(item.content.latitude, item.content.longitude)}
                >
                    <LinearGradient
                        colors={['#4c669f', '#3b5998', '#192f6a']}
                        style={styles.locationGradient}
                    >
                        <Ionicons name="location" size={24} color="#fff" />
                        <Text style={styles.messageText}>View Location</Text>
                    </LinearGradient>
                </TouchableOpacity>
            )}
            {item.type === 'audio' && (
                <TouchableOpacity 
                    style={styles.audioContainer}
                    onPress={() => isPlaying === item.id ? 
                        sound?.stopAsync() : 
                        playAudio(item.content.uri, item.id)}
                >
                    <Ionicons 
                        name={isPlaying === item.id ? "pause" : "play"} 
                        size={24} 
                        color="#fff" 
                    />
                    <Text style={styles.messageText}>
                        {Math.floor(item.content.duration / 60)}:
                        {(item.content.duration % 60).toString().padStart(2, '0')}
                    </Text>
                </TouchableOpacity>
            )}
            <Text style={styles.timestamp}>
                {item.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Text>
        </View>
    );

    const AttachmentMenu = () => (
        <Modal
            transparent={true}
            visible={showAttachments}
            animationType="slide"
            onRequestClose={() => setShowAttachments(false)}
        >
            <TouchableOpacity 
                style={styles.modalOverlay}
                activeOpacity={1}
                onPress={() => setShowAttachments(false)}
            >
                <View style={styles.attachmentMenu}>
                    <TouchableOpacity 
                        style={styles.attachmentOption}
                        onPress={() => {
                            handleImagePicker();
                            setShowAttachments(false);
                        }}
                    >
                        <Ionicons name="image" size={24} color="#007AFF" />
                        <Text style={styles.attachmentText}>Image</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.attachmentOption}
                        onPress={() => {
                            handleDocumentPicker();
                            setShowAttachments(false);
                        }}
                    >
                        <Ionicons name="document" size={24} color="#007AFF" />
                        <Text style={styles.attachmentText}>Document</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.attachmentOption}
                        onPress={() => {
                            shareLocation();
                            setShowAttachments(false);
                        }}
                    >
                        <Ionicons name="location" size={24} color="#007AFF" />
                        <Text style={styles.attachmentText}>Location</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </Modal>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
            <TouchableOpacity 
                    onPress={() => router.back()}
                    style={styles.backButton}
                >
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerText}>{name}</Text>
            </View>
            
            <FlatList
                data={[...messages].reverse()}
                renderItem={renderMessage}
                keyExtractor={(item) => item.id}
                style={styles.messageList}
                inverted={true}
            />

            <View style={styles.inputContainer}>
                <TouchableOpacity 
                    onPress={() => setShowAttachments(true)}
                    style={styles.attachButton}
                >
                    <Ionicons name="add" size={24} color="#007AFF" />
                </TouchableOpacity>
                
                <TextInput
                    style={styles.input}
                    value={newMessage}
                    onChangeText={setNewMessage}
                    placeholder="Type a message..."
                    multiline
                />
                
                {newMessage.length > 0 ? (
                    <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
                        <Ionicons name="send" size={24} color="#fff" />
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity 
                        style={[styles.sendButton, isRecording && styles.recordingButton]}
                        onPressIn={startRecording}
                        onPressOut={stopRecording}
                        delayPressIn={0}
                        activeOpacity={0.7}
                    >
                        <Ionicons name={isRecording ? "radio" : "mic"} size={24} color="#fff" />
                        {isRecording && (
                            <Text style={styles.recordingTime}>
                                {Math.floor(recordingDuration / 60)}:{(recordingDuration % 60).toString().padStart(2, '0')}
                            </Text>
                        )}
                    </TouchableOpacity>
                )}
            </View>
            <AttachmentMenu />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    // ... your existing styles ...
    header: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        flexDirection: 'row', // Add this
        alignItems: 'center', // Add this
    },
    backButton: {
        marginRight: 10, // Add this
    },
    // ... rest of your styles ...

    headerText: {
        fontSize: 20,
        fontFamily: "Quicksand_700Bold",
        color: "black"
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
    imageMessage: {
        width: 200,
        height: 200,
        borderRadius: 12,
    },
    documentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    documentText: {
        color: '#fff',
        fontFamily: "Quicksand_500Medium",
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    attachmentContainer: {
        flexDirection: 'row',
        gap: 16,
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    recordingButton: {
        backgroundColor: '#FF3B30',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    attachmentMenu: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        paddingBottom: 40,
    },
    attachmentOption: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    attachmentText: {
        marginLeft: 15,
        fontSize: 16,
        fontFamily: "Quicksand_500Medium",
    },
    attachButton: {
        padding: 10,
    },
    recordingTime: {
        position: 'absolute',
        top: -25,
        color: '#FF3B30',
        fontFamily: "Quicksand_700Bold",
    },
    locationGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderRadius: 8,
        gap: 8,
    },
    audioContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.1)',
        padding: 10,
        borderRadius: 8,
        gap: 8,
        minWidth: 100,
    },
});
