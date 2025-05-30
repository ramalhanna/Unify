import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Href, Link } from "expo-router";
import { Image } from "expo-image";
import { ProgressSectionCard } from "@/components/learn/ProgressSectionCard";
import React from "react";

interface ProgressSectionProps {
  header: string;
  navigatePage: Href;
}

export function ProgressSection({
  header,
  navigatePage,
}: ProgressSectionProps) {
  return (
    // wrapping JSX into a singular return element
    <>
      <View style={styles.lessonHeader}>
        <Text style={styles.lessonText}>{header}</Text>
        <Link href={navigatePage} asChild>
          <TouchableOpacity>
            <Feather name="chevron-right" size={28} color="#343434" />
          </TouchableOpacity>
        </Link>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.cardContainer}
      >
        <ProgressSectionCard
          title="Pathway to finance"
          description="Short description"
          image={require("../assets/images/placeholderImg.png")}
          href="/(tabs)/Learn/Lessons/path-way-finance"
        />

        <Link href="./Main-lesson" asChild style={styles.card}>
          <TouchableOpacity>
            <Image
              style={styles.cardImage}
              source={require("../assets/images/placeholderImg.png")}
            />
            <Text style={styles.cardTitle}>Lesson Title</Text>
            <Text style={styles.cardDescription}>Short description</Text>
          </TouchableOpacity>
        </Link>
        <Link href="./Main-lesson" asChild style={styles.card}>
          <TouchableOpacity>
            <Image
              style={styles.cardImage}
              source={require("../assets/images/placeholderImg.png")}
            />
            <Text style={styles.cardTitle}>Lesson Title</Text>
            <Text style={styles.cardDescription}>Short description</Text>
          </TouchableOpacity>
        </Link>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  lessonHeader: {
    // Formats header+arrow for each lesson section
    flexDirection: "row",
    marginTop: 20,
  },
  lessonText: {
    fontSize: 20,
    fontWeight: "500",
    color: "#343434",
  },
  cardContainer: {
    // Container holding all the lesson cards
    flexDirection: "row",
    paddingTop: 20,
    paddingRight: 20,
  },
  card: {
    // Each card as a light grey square
    backgroundColor: "#EEEEEE",
    width: 170,
    height: 170,
    borderRadius: 12,
    marginRight: 16,
    alignItems: "center",
  },
  cardImage: {
    width: 50,
    height: 50,
    alignSelf: "baseline",
    marginLeft: 18,
    marginBottom: 30,
    marginTop: 25,
  },
  cardTitle: {
    alignSelf: "baseline",
    marginLeft: 18,
    marginBottom: 5,
    color: "#9F9D9D",
    fontWeight: "600",
  },
  cardDescription: {
    alignSelf: "baseline",
    marginLeft: 18,
    marginBottom: 6,
    color: "#CECECE",
    fontWeight: "600",
  },
});
