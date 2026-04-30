import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";


export default function FilterPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string[]>([]);
  const [cookTimeRange, setCookTimeRange] = useState<string>("all");

  const difficulties = ["Easy", "Medium", "Hard"];
  const cookTimes = [
    { value: "all", label: "Any Time" },
    { value: "quick", label: "Under 30 min" },
    { value: "medium", label: "30-60 min" },
    { value: "long", label: "Over 60 min" },
  ];

  const toggleDifficulty = (difficulty: string) => {
    setSelectedDifficulty((prev) =>
      prev.includes(difficulty)
        ? prev.filter((d) => d !== difficulty)
        : [...prev, difficulty]
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Find Your Recipe</Text>

      <View style={styles.section}>
        <Text style={styles.label}>Search</Text>
        <View style={styles.searchWrapper}>
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search recipes..."
            placeholderTextColor="rgba(44, 62, 80, 0.4)"
            style={styles.searchInput}
          />
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.labelRow}>
          <Text style={styles.label}>Difficulty Level</Text>
        </View>
        <View style={styles.difficultyRow}>
          {difficulties.map((difficulty) => {
            const isSelected = selectedDifficulty.includes(difficulty);
            return (
              <TouchableOpacity
                key={difficulty}
                onPress={() => toggleDifficulty(difficulty)}
                style={[
                  styles.difficultyButton,
                  isSelected ? styles.difficultyButtonSelected : styles.difficultyButtonUnselected,
                ]}
              >
                <Text
                  style={[
                    styles.difficultyText,
                    isSelected ? styles.difficultyTextSelected : styles.difficultyTextUnselected,
                  ]}
                >
                  {difficulty}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.labelRow}>
          <Text style={styles.label}>Cook Time</Text>
        </View>
        <View style={styles.cookTimeList}>
          {cookTimes.map((time) => {
            const isSelected = cookTimeRange === time.value;
            return (
              <TouchableOpacity
                key={time.value}
                onPress={() => setCookTimeRange(time.value)}
                style={[
                  styles.cookTimeButton,
                  isSelected ? styles.cookTimeButtonSelected : styles.cookTimeButtonUnselected,
                ]}
              >
                <Text
                  style={[
                    styles.cookTimeText,
                    isSelected ? styles.cookTimeTextSelected : styles.cookTimeTextUnselected,
                  ]}
                >
                  {time.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <TouchableOpacity style={styles.applyButton} activeOpacity={0.85}>
        <Text style={styles.applyButtonText}>Apply Filters</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    gap: 24,
  },
  title: {
    fontSize: 24,
    color: "#2C3E50",
    marginBottom: 4,
  },
  section: {
    gap: 8,
  },
  label: {
    fontSize: 13,
    color: "rgba(44, 62, 80, 0.7)",
  },
  labelRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 4,
  },
  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FDF6EC",
    borderWidth: 1,
    borderColor: "rgba(44, 62, 80, 0.2)",
    borderRadius: 12,
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 14,
    color: "#2C3E50",
  },
  difficultyRow: {
    flexDirection: "row",
    gap: 8,
  },
  difficultyButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
  },
  difficultyButtonSelected: {
    backgroundColor: "#2ECC71",
    borderColor: "#2ECC71",
  },
  difficultyButtonUnselected: {
    backgroundColor: "#FDF6EC",
    borderColor: "rgba(44, 62, 80, 0.3)",
  },
  difficultyText: {
    fontSize: 13,
  },
  difficultyTextSelected: {
    color: "#FDF6EC",
  },
  difficultyTextUnselected: {
    color: "#2C3E50",
  },
  cookTimeList: {
    gap: 8,
  },
  cookTimeButton: {
    width: "100%",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
  cookTimeButtonSelected: {
    backgroundColor: "#2ECC71",
    borderColor: "#2ECC71",
  },
  cookTimeButtonUnselected: {
    backgroundColor: "#FDF6EC",
    borderColor: "rgba(44, 62, 80, 0.3)",
  },
  cookTimeText: {
    fontSize: 13,
  },
  cookTimeTextSelected: {
    color: "#FDF6EC",
  },
  cookTimeTextUnselected: {
    color: "#2C3E50",
  },
  applyButton: {
    backgroundColor: "#2ECC71",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#2ECC71",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  applyButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});