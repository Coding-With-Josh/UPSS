import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

interface Flashcard {
    question: string;
    answer: string;
}

const sampleFlashcards: Flashcard[] = [
    { question: "What is React Native?", answer: "A framework for building native apps using React" },
    { question: "What is JSX?", answer: "A syntax extension for JavaScript that allows you to write HTML-like code" },
    { question: "What is State?", answer: "A built-in object that stores property values belonging to a component" },
];

export default function FlashcardScreen() {
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const flipAnimation = useRef(new Animated.Value(0)).current;

    const flipCard = () => {
        setIsFlipped(!isFlipped);
        Animated.timing(flipAnimation, {
            toValue: isFlipped ? 0 : 1,
            duration: 800,
            useNativeDriver: true,
        }).start();
    };

    const frontInterpolate = flipAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg'],
    });

    const backInterpolate = flipAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: ['180deg', '360deg'],
    });

    const handleNext = () => {
        setIsFlipped(false);
        flipAnimation.setValue(0);
        setCurrentCardIndex((prev) => (prev + 1) % sampleFlashcards.length);
    };

    const handlePrevious = () => {
        setIsFlipped(false);
        flipAnimation.setValue(0);
        setCurrentCardIndex((prev) => (prev - 1 + sampleFlashcards.length) % sampleFlashcards.length);
    };

    const frontAnimatedStyle = {
        transform: [{ rotateY: frontInterpolate }],
        backfaceVisibility: 'hidden' as const,
        position: 'absolute' as const,
    };

    const backAnimatedStyle = {
        transform: [{ rotateY: backInterpolate }],
        backfaceVisibility: 'hidden' as const,
        position: 'absolute' as const,
    };

    // ... keep the rest of your return statement and styles the same ...
    return (
        <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
            <TouchableOpacity onPress={() => router.back()} className="my-4">
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.progress}>
                    Card {currentCardIndex + 1} of {sampleFlashcards.length}
                </Text>
                
                <View style={styles.cardContainer}>
                    <Animated.View style={[styles.card, frontAnimatedStyle]}>
                        <LinearGradient colors={['#ffffff', '#f8f8f8']} style={styles.cardGradient}>
                            <Text style={styles.cardTitle}>Question</Text>
                            <Text style={styles.cardText}>
                                {sampleFlashcards[currentCardIndex].question}
                            </Text>
                            <Text style={styles.tapHint}>Tap to see answer</Text>
                        </LinearGradient>
                    </Animated.View>

                    <Animated.View style={[styles.card, styles.cardBack, backAnimatedStyle]}>
                        <LinearGradient colors={['#f8f8f8', '#ffffff']} style={styles.cardGradient}>
                            <Text style={styles.cardTitle}>Answer</Text>
                            <Text style={styles.cardText}>
                                {sampleFlashcards[currentCardIndex].answer}
                            </Text>
                            <Text style={styles.tapHint}>Tap to see question</Text>
                        </LinearGradient>
                    </Animated.View>

                    <TouchableOpacity 
                        style={styles.flipButton}
                        onPress={flipCard}
                        activeOpacity={0.8}
                    >
                        <View style={styles.flipButtonInner} />
                    </TouchableOpacity>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={handlePrevious}>
                        <Text style={styles.buttonText}><AntDesign name="arrowleft"/> Previous</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={handleNext}>
                        <Text style={styles.buttonText}>Next <AntDesign name="arrowright"/></Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
        padding: 20,
    },
    cardContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    progress: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
    },
    card: {
        width: Dimensions.get('window').width - 40,
        height: 300,
        borderRadius: 20,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardGradient: {
        width: '100%',
        height: '100%',
        borderRadius: 20,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardBack: {
        transform: [{ rotateY: '180deg' }],
    },
    cardTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
    },
    cardText: {
        fontSize: 20,
        textAlign: 'center',
        color: '#444',
        lineHeight: 28,
    },
    tapHint: {
        position: 'absolute',
        bottom: 20,
        color: '#666',
        fontSize: 14,
    },
    flipButton: {
        position: 'absolute',
        right: -15,
        top: '50%',
        backgroundColor: '#fff',
        borderRadius: 25,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    flipButtonInner: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#4c669f',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    button: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        padding: 15,
        borderRadius: 12,
        width: '45%',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '600',
    },
});