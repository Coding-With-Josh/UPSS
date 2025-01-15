import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";

const NoteContent = () => {
  const { id } = useLocalSearchParams();
  const [activeTab, setActiveTab] = useState("notes");

  const noteContent = {
    moduleTitle: "Introduction to Mathematics",
    noteTitle: "Algebra Fundamentals",
    dateCreated: "October 15, 2023",
    lastModified: "October 16, 2023",
    content: "These are my notes for the Algebra section...",
    tags: ["Math", "Algebra", "Important"],
    attachments: ["formula_sheet.pdf", "homework1.pdf"],
    teacherNotes: "Important concepts to focus on...",
    videoUrl: "https://example.com/video",
    comments: [
      { id: 1, user: "Teacher", text: "Great notes!", date: "Oct 17, 2023" },
      {
        id: 2,
        user: "Student",
        text: "Thanks for the clarification",
        date: "Oct 18, 2023",
      },
    ],
  };

  const renderNotesTab = () => (
    <View style={styles.content}>
      <View style={styles.tagContainer}>
        {noteContent.tags.map((tag, index) => (
          <View key={index} style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
      </View>

      <TextInput
        style={styles.noteInput}
        multiline
        placeholder="Start taking notes..."
        defaultValue={noteContent.content}
      />

      <View style={styles.attachmentsSection}>
        <Text style={styles.attachmentsTitle}>Attachments</Text>
        {noteContent.attachments.map((file, index) => (
          <TouchableOpacity key={index} style={styles.attachmentItem}>
            <MaterialIcons name="attachment" size={20} color="#4338ca" />
            <Text style={styles.attachmentText}>{file}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderResourcesTab = () => (
    <View style={styles.content}>
      <View style={styles.resourceSection}>
        <Text style={styles.sectionTitle}>Lecture Video</Text>
        <View style={styles.videoPlaceholder}>
          <MaterialIcons name="play-circle-filled" size={40} color="#4338ca" />
        </View>
      </View>

      <View style={styles.resourceSection}>
        <Text style={styles.sectionTitle}>Teacher's Notes</Text>
        <Text style={styles.teacherNotes}>{noteContent.teacherNotes}</Text>
      </View>

      <View style={styles.resourceSection}>
        <Text style={styles.sectionTitle}>Comments</Text>
        {noteContent.comments.map((comment) => (
          <View key={comment.id} style={styles.commentItem}>
            <Text style={styles.commentUser}>{comment.user}</Text>
            <Text style={styles.commentText}>{comment.text}</Text>
            <Text style={styles.commentDate}>{comment.date}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <LinearGradient colors={["#4338ca", "#6366f1"]} style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <MaterialIcons name="arrow-back" size={24} color="#fff" />
            <Text style={styles.backText}>Back to Module</Text>
          </TouchableOpacity>
          <Text style={styles.moduleTitle}>{noteContent.moduleTitle}</Text>
          <Text style={styles.noteTitle}>{noteContent.noteTitle}</Text>
          <View style={styles.metadata}>
            <Text style={styles.dateText}>
              Created: {noteContent.dateCreated}
            </Text>
            <Text style={styles.dateText}>
              Modified: {noteContent.lastModified}
            </Text>
          </View>
        </LinearGradient>

        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === "notes" && styles.activeTab]}
            onPress={() => setActiveTab("notes")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "notes" && styles.activeTabText,
              ]}
            >
              My Notes
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === "resources" && styles.activeTab]}
            onPress={() => setActiveTab("resources")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "resources" && styles.activeTabText,
              ]}
            >
              Resources
            </Text>
          </TouchableOpacity>
        </View>

        {activeTab === "notes" ? renderNotesTab() : renderResourcesTab()}
      </ScrollView>

      {activeTab === "notes" && (
        <View style={styles.toolbar}>
          <TouchableOpacity style={styles.toolbarButton}>
            <MaterialIcons name="format-bold" size={24} color="#4338ca" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.toolbarButton}>
            <MaterialIcons name="format-italic" size={24} color="#4338ca" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.toolbarButton}>
            <MaterialIcons
              name="format-list-bulleted"
              size={24}
              color="#4338ca"
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.toolbarButton}>
            <MaterialIcons name="attach-file" size={24} color="#4338ca" />
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 24,
    paddingTop: 48,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  backText: {
    color: "#fff",
    marginLeft: 8,
    fontSize: 16,
    fontFamily: "Quicksand_400Regular",
  },
  moduleTitle: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.9)",
    marginBottom: 8,
    fontFamily: "Quicksand_600SemiBold",
  },
  noteTitle: {
    fontSize: 24,
    color: "#fff",
    fontFamily: "Quicksand_700Bold",
  },
  metadata: {
    marginTop: 8,
  },
  dateText: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 12,
    fontFamily: "Quicksand_400Regular",
  },
  content: {
    padding: 16,
    fontFamily: "Quicksand_400Regular",
  },
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 16,
  },
  tag: {
    backgroundColor: "#e0e7ff",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    fontFamily: "Quicksand_400Regular",
  },
  tagText: {
    color: "#4338ca",
    fontSize: 12,
    fontFamily: "Quicksand_500Medium",
  },
  noteInput: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    minHeight: 200,
    textAlignVertical: "top",
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
    fontFamily: "Quicksand_400Regular",
  },
  attachmentsSection: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
  },
  attachmentsTitle: {
    fontSize: 16,
    marginBottom: 8,
    fontFamily: "Quicksand_600SemiBold",
  },
  attachmentItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  attachmentText: {
    marginLeft: 8,
    color: "#4338ca",
    fontFamily: "Quicksand_400Regular",
  },
  toolbar: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
  },
  toolbarButton: {
    marginRight: 20,
    fontFamily: "Quicksand_600SemiBold",
  },
  tabContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    marginTop: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "#e2e8f0",
    fontFamily: "Quicksand_600SemiBold",
  },
  activeTab: {
    borderBottomColor: "#4338ca",
  },
  tabText: {
    color: "#64748b",
    fontFamily: "Quicksand_500Medium",
  },
  activeTabText: {
    color: "#4338ca",
  },
  resourceSection: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 12,
    fontFamily: "Quicksand_600SemiBold",
  },
  videoPlaceholder: {
    height: 200,
    backgroundColor: "#f1f5f9",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  teacherNotes: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: "Quicksand_400Regular",
  },
  commentItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
    paddingVertical: 12,
  },
  commentUser: {
    marginBottom: 4,
    fontFamily: "Quicksand_600SemiBold",
  },
  commentText: {
    fontSize: 14,
    marginBottom: 4,
    fontFamily: "Quicksand_400Regular",
  },
  commentDate: {
    fontSize: 12,
    color: "#64748b",
    fontFamily: "Quicksand_400Regular",
  },
});

export default NoteContent;
