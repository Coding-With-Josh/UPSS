import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert, Animated, ImageBackground, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

const GameScreen = () => {
    const [score, setScore] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [timeLeft, setTimeLeft] = useState(15);
    const [isActive, setIsActive] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState({ title: '', message: '', isSuccess: true });
    const fadeAnim = new Animated.Value(1);

    const questions = [
        {
            question: "What is the capital of Nigeria?",
            options: ["Lagos", "Abuja", "Kano", "Port Harcourt"],
            correct: 1,
            explanation: "Abuja became Nigeria's capital in 1991."
        },
        {
            question: "Which of these is NOT a data type in JavaScript?",
            options: ["String", "Boolean", "Float", "Number"],
            correct: 2,
            explanation: "Float is not a JavaScript data type. JavaScript uses Number for all numeric values."
        },
        {
            question: "What is 8 x 7?",
            options: ["54", "56", "58", "60"],
            correct: 1,
            explanation: "8 × 7 = 56"
        },
        {
            question: "Which planet is known as the Red Planet?",
            options: ["Venus", "Mars", "Jupiter", "Saturn"],
            correct: 1,
            explanation: "Mars is called the Red Planet due to its reddish appearance."
        },
        {
            question: "What is the largest organ in the human body?",
            options: ["Heart", "Brain", "Skin", "Liver"],
            correct: 2,
            explanation: "The skin is the largest organ in the human body."
        },
        {
            question: "What programming language is React built with?",
            options: ["Python", "Java", "JavaScript", "C++"],
            correct: 2,
            explanation: "React is built using JavaScript."
        }
        // Add more questions as needed
    ];

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isActive && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            handleTimeout();
        }
        return () => clearInterval(timer);
    }, [timeLeft, isActive]);

    const handleTimeout = () => {
        setModalContent({
            title: "Time's up!",
            message: "You ran out of time!",
            isSuccess: false
        });
        setModalVisible(true);
        nextQuestion();
    };

    const handleAnswer = ({selectedOption}: any) => {
        setIsActive(false);
        
        if (selectedOption === questions[currentQuestion].correct) {
            const timeBonus = Math.floor(timeLeft / 2);
            const points = 10 + timeBonus;
            setScore(score + points);
            
            Animated.sequence([
                Animated.timing(fadeAnim, {
                    toValue: 0.3,
                    duration: 200,
                    useNativeDriver: true,
                }),
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 200,
                    useNativeDriver: true,
                }),
            ]).start();

            setModalContent({
                title: "Correct! 🎉",
                message: `+${points} points (${timeBonus} time bonus)\n\n${questions[currentQuestion].explanation}`,
                isSuccess: true
            });
        } else {
            setModalContent({
                title: "Wrong answer! ❌",
                message: `The correct answer was: ${questions[currentQuestion].options[questions[currentQuestion].correct]}\n\n${questions[currentQuestion].explanation}`,
                isSuccess: false
            });
        }
        setModalVisible(true);
        setTimeout(() => {
            nextQuestion();
            setModalVisible(false);
        }, 2000);
    };

    // Custom Modal Component
    const CustomModal = () => (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
        >
            <View style={styles.modalOverlay}>
                <View style={[
                    styles.modalContent,
                    { backgroundColor: modalContent.isSuccess ? 'rgba(0, 255, 0, 0.2)' : 'rgba(255, 0, 0, 0.2)' }
                ]}>
                    <Text style={styles.modalTitle}>{modalContent.title}</Text>
                    <Text style={styles.modalMessage}>{modalContent.message}</Text>
                </View>
            </View>
        </Modal>
    );


    const resetGame = ({event}: any) : void => {
        setScore(0);
        setCurrentQuestion(0);
        setTimeLeft(15);
        setIsActive(true);
        setModalVisible(false);
        setModalContent({ title: '', message: '', isSuccess: true });
    };

    const nextQuestion = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setTimeLeft(15);
            setIsActive(true);
        } else {
            setModalContent({
                title: "Game Over!",
                message: `Final Score: ${score}`,
                isSuccess: true
            });
            setModalVisible(true);
            setIsActive(false);
        }
    };
    
    

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient
                colors={['#1a2a6c', '#2a3a7c', '#1f1f1f']}
                style={styles.background}
            >
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.scoreText}>SCORE: {score}</Text>
                        <Text style={[styles.timerText, timeLeft <= 5 ? styles.timerWarning : null]}>
                            ⏰ {timeLeft}s
                        </Text>
                    </View>

                    <View style={styles.progressBar}>
                        <View style={[styles.progressFill, { width: `${((currentQuestion + 1) / questions.length) * 100}%` }]} />
                    </View>

                    <Animated.View style={[styles.questionContainer, { opacity: fadeAnim }]}>
                        <Text style={styles.questionNumber}>MISSION {currentQuestion + 1}/{questions.length}</Text>
                        <Text style={styles.questionText}>
                            {questions[currentQuestion].question}
                        </Text>
                    </Animated.View>

                    <View style={styles.optionsContainer}>
                        {questions[currentQuestion].options.map((option, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.optionButton}
                                onPress={() => handleAnswer(index)}
                            >
                                <Text style={styles.optionText}>🎯 {option}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <TouchableOpacity style={styles.resetButton} onPress={resetGame}>
                        <Text style={styles.resetText}>ABORT MISSION</Text>
                    </TouchableOpacity>
                </ScrollView>
                <CustomModal/>
            </LinearGradient>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        flex: 1,
    },
    scrollContainer: {
        padding: 20,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 15,
        borderRadius: 10,
    },
    scoreText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#00ff00',
        textShadowColor: 'rgba(0, 255, 0, 0.5)',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 10,
    },
    timerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#00ffff',
        textShadowColor: 'rgba(0, 255, 255, 0.5)',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 10,
    },
    timerWarning: {
        color: '#ff0000',
        textShadowColor: 'rgba(255, 0, 0, 0.5)',
    },
    progressBar: {
        height: 8,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 4,
        marginBottom: 20,
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#00ff00',
        borderRadius: 4,
    },
    questionContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        padding: 20,
        borderRadius: 10,
        marginBottom: 20,
        borderWidth: 2,
        borderColor: '#00ffff',
    },
    questionNumber: {
        fontSize: 14,
        color: '#00ffff',
        marginBottom: 10,
        textTransform: 'uppercase',
    },
    questionText: {
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
        color: '#ffffff',
    },
    optionsContainer: {
        gap: 10,
    },
    optionButton: {
        backgroundColor: 'rgba(0, 150, 255, 0.3)',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#00ffff',
    },
    optionText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '500',
    },
    resetButton: {
        marginTop: 30,
        backgroundColor: 'rgba(255, 0, 0, 0.3)',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ff0000',
    },
    resetText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '500',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    modalContent: {
        padding: 20,
        borderRadius: 10,
        width: '80%',
        borderWidth: 1,
        borderColor: '#00ffff',
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 10,
        textAlign: 'center',
    },
    modalMessage: {
        fontSize: 16,
        color: '#ffffff',
        textAlign: 'center',
    },
});

export default GameScreen;
