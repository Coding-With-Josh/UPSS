import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';

interface Assignment {
    id: string;
    title: string;
    description: string;
    subject: string;
    dueDate: string;
    status: 'pending' | 'submitted' | 'overdue' | 'graded';
    score?: number;
    totalPoints: number;
    submissionType: 'file' | 'text' | 'both';
    teacherName: string;
    attachments?: string[];
}

const AssignmentScreen = () => {
    const assignments: Assignment[] = [
        {
            id: '1',
            title: 'Mathematics Assignment 1',
            description: 'Complete exercises 1-10 from Chapter 3: Linear Equations',
            subject: 'Mathematics',
            dueDate: '2024-02-15',
            status: 'pending',
            totalPoints: 100,
            submissionType: 'file',
            teacherName: 'Dr. Smith',
            attachments: ['Chapter3_Exercises.pdf'],
        },
        {
            id: '2',
            title: 'Physics Lab Report',
            description: 'Write a detailed report on the pendulum experiment conducted in lab',
            subject: 'Physics',
            dueDate: '2024-02-10',
            status: 'graded',
            score: 85,
            totalPoints: 100,
            submissionType: 'both',
            teacherName: 'Prof. Johnson',
            attachments: ['Lab_Guidelines.pdf', 'Data_Sheet.xlsx'],
        },
    ];

    const getStatusColor = (status: Assignment['status']) => {
        switch (status) {
            case 'pending':
                return '#FFA500';
            case 'submitted':
                return '#2196F3';
            case 'graded':
                return '#4CAF50';
            case 'overdue':
                return '#FF0000';
            default:
                return '#000000';
        }
    };

    const handleAssignmentPress = (assignment: Assignment) => {
        Alert.alert(
            assignment.title,
            `Subject: ${assignment.subject}\nDue Date: ${assignment.dueDate}\n\n${assignment.description}`,
            [
                { text: 'View Details', onPress: () => console.log('View details') },
                { text: 'Submit', onPress: () => console.log('Submit') },
                { text: 'Close', style: 'cancel' },
            ]
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>Assignments</Text>
                <TouchableOpacity style={styles.filterButton}>
                    <MaterialIcons name="filter-list" size={24} color="#333" />
                </TouchableOpacity>
            </View>
            <ScrollView style={styles.scrollView}>
                {assignments.map((assignment) => (
                    <TouchableOpacity
                        key={assignment.id}
                        style={styles.assignmentCard}
                        onPress={() => handleAssignmentPress(assignment)}
                    >
                        <View style={styles.cardHeader}>
                            <Text style={styles.subject}>{assignment.subject}</Text>
                            <Text
                                style={[
                                    styles.status,
                                    { color: getStatusColor(assignment.status) },
                                ]}
                            >
                                {assignment.status.toUpperCase()}
                            </Text>
                        </View>
                        <Text style={styles.assignmentTitle}>{assignment.title}</Text>
                        <Text style={styles.description} numberOfLines={2}>
                            {assignment.description}
                        </Text>
                        <View style={styles.cardFooter}>
                            <View style={styles.footerLeft}>
                                <Text style={styles.teacherName}>
                                    <MaterialIcons name="person" size={16} color="#666" />
                                    {' ' + assignment.teacherName}
                                </Text>
                                <Text style={styles.dueDate}>
                                    <MaterialIcons name="event" size={16} color="#666" />
                                    {' Due: ' + assignment.dueDate}
                                </Text>
                            </View>
                            {assignment.score !== undefined && (
                                <Text style={styles.score}>
                                    {assignment.score}/{assignment.totalPoints}
                                </Text>
                            )}
                        </View>
                        {assignment.attachments && (
                            <View style={styles.attachments}>
                                <MaterialIcons name="attach-file" size={16} color="#666" />
                                <Text style={styles.attachmentText}>
                                    {assignment.attachments.length} attachment(s)
                                </Text>
                            </View>
                        )}
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    filterButton: {
        padding: 8,
    },
    scrollView: {
        flex: 1,
        padding: 16,
    },
    assignmentCard: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    subject: {
        fontSize: 14,
        color: '#666',
        fontWeight: '500',
    },
    assignmentTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 8,
    },
    description: {
        fontSize: 14,
        color: '#666',
        marginBottom: 12,
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    footerLeft: {
        flex: 1,
    },
    teacherName: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4,
    },
    dueDate: {
        fontSize: 14,
        color: '#666',
    },
    status: {
        fontSize: 12,
        fontWeight: '500',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        backgroundColor: '#f0f0f0',
    },
    score: {
        fontSize: 16,
        color: '#4CAF50',
        fontWeight: '600',
    },
    attachments: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
        paddingTop: 8,
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    attachmentText: {
        fontSize: 12,
        color: '#666',
        marginLeft: 4,
    },
});

export default AssignmentScreen;