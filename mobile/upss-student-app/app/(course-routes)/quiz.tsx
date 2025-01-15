import { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const dummyQuestions = [
    {
        id: '1',
        question: 'What is the capital of France?',
        options: ['London', 'Berlin', 'Paris', 'Madrid'],
        correctAnswer: 'Paris'
    },
    {
        id: '2',
        question: 'Which planet is closest to the Sun?',
        options: ['Mars', 'Venus', 'Mercury', 'Jupiter'],
        correctAnswer: 'Mercury'
    },
    {
        id: '3',
        question: 'What is 2 + 2?',
        options: ['3', '4', '5', '6'],
        correctAnswer: '4'
    },
    {
        id: '4',
        question: 'Which language is React built in?',
        options: ['Python', 'JavaScript', 'Java', 'C++'],
        correctAnswer: 'JavaScript'
    },
    {
        id: '5',
        question: 'What color is the sky on a clear day?',
        options: ['Red', 'Green', 'Blue', 'Yellow'],
        correctAnswer: 'Blue'
    },
    {
        id: '6',
        question: 'What is the largest mammal?',
        options: ['Elephant', 'Blue Whale', 'Giraffe', 'Hippopotamus'],
        correctAnswer: 'Blue Whale'
    },
    {
        id: '7',
        question: 'How many continents are there?',
        options: ['5', '6', '7', '8'],
        correctAnswer: '7'
    },
    {
        id: '8',
        question: 'What is H2O commonly known as?',
        options: ['Air', 'Fire', 'Earth', 'Water'],
        correctAnswer: 'Water'
    },
    {
        id: '9',
        question: 'Who painted the Mona Lisa?',
        options: ['Van Gogh', 'Da Vinci', 'Picasso', 'Michelangelo'],
        correctAnswer: 'Da Vinci'
    },
    {
        id: '10',
        question: 'What is 5 x 5?',
        options: ['15', '20', '25', '30'],
        correctAnswer: '25'
    }
];

export default function QuizPage() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const router = useRouter();

    const handleAnswerClick = (selectedAnswer: string) => {
        if (selectedAnswer === dummyQuestions[currentQuestion].correctAnswer) {
            setScore(score + 1);
        }

        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < dummyQuestions.length) {
            setCurrentQuestion(nextQuestion);
        } else {
            setShowScore(true);
        }
    };

    const restartQuiz = () => {
        setCurrentQuestion(0);
        setScore(0);
        setShowScore(false);
    };

    return (
        <SafeAreaView style={styles.container}>
            {showScore ? (
                <View style={styles.scoreSection}>
                    <Text style={styles.scoreText}>
                        You scored {score} out of {dummyQuestions.length}
                    </Text>
                    <TouchableOpacity style={styles.button} onPress={restartQuiz}>
                        <Text style={styles.buttonText}>Restart Quiz</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => router.back()}>
                        <Text style={styles.buttonText}>Back to Courses</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <ScrollView contentContainerStyle={styles.quizContainer}>
                    <Text style={styles.questionCount}>
                        Question {currentQuestion + 1}/{dummyQuestions.length}
                    </Text>
                    <Text style={styles.questionText}>{dummyQuestions[currentQuestion].question}</Text>
                    <View style={styles.optionsContainer}>
                        {dummyQuestions[currentQuestion].options.map((option, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.optionButton}
                                onPress={() => handleAnswerClick(option)}
                            >
                                <Text style={styles.optionText}>{option}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    quizContainer: {
        padding: 20,
    },
    questionCount: {
        fontSize: 18,
        marginBottom: 20,
    },
    questionText: {
        fontSize: 24,
        marginBottom: 30,
        fontFamily: "Quicksand_600SemiBold"
    },
    optionsContainer: {
        marginTop: 20,
    },
    optionButton: {
        backgroundColor: '#e0e0e0',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        fontFamily: "Quicksand_400Regular",
    },
    optionText: {
        fontSize: 16,
        textAlign: 'center',
        fontFamily: "Quicksand_400Regular",
    },
    scoreSection: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    scoreText: {
        fontSize: 24,
        marginBottom: 30,
        fontFamily: "Quicksand_400Regular",
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 8,
        marginVertical: 10,
        width: '100%',
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
        fontFamily: "Quicksand_600SemiBold"
    },
});