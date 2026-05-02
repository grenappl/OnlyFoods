import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
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
    <ScrollView className="flex-1 bg-white">
      <View className="px-4 py-6 gap-6">
        <Text className="text-2xl text-[#2C3E50]">Find Your Recipe</Text>

        {/* Search */}
        <View className="gap-2">
          <Text className="text-sm text-[#2C3E50]/70">Search</Text>
          <View className="flex-row items-center bg-[#fffcf7] border border-[#2C3E50]/20 rounded-xl px-3">
            <TextInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search recipes..."
              placeholderTextColor="rgba(44, 62, 80, 0.4)"
              className="flex-1 py-3 text-sm text-[#2C3E50]"
            />
          </View>
        </View>

        {/* Difficulty */}
        <View className="gap-2">
          <View className="flex-row items-center gap-1.5">
            <Text className="text-sm text-[#2C3E50]/70">Difficulty Level</Text>
          </View>
          <View className="flex-row gap-2">
            {difficulties.map((difficulty) => {
              const isSelected = selectedDifficulty.includes(difficulty);
              return (
                <TouchableOpacity
                  key={difficulty}
                  onPress={() => toggleDifficulty(difficulty)}
                  className={`px-4 py-2 rounded-full border ${
                    isSelected
                      ? "bg-[#3bc475] border-[#2ECC71]"
                      : "bg-[#fffcf7] border-[#2C3E50]/30"
                  }`}
                >
                  <Text
                    className={`text-sm ${
                      isSelected ? "text-[#FDF6EC]" : "text-[#2C3E50]"
                    }`}
                  >
                    {difficulty}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Cook Time */}
        <View className="gap-2">
          <View className="flex-row items-center gap-1.5">
            <Text className="text-sm text-[#2C3E50]/70">Cook Time</Text>
          </View>
          <View className="gap-2">
            {cookTimes.map((time) => {
              const isSelected = cookTimeRange === time.value;
              return (
                <TouchableOpacity
                  key={time.value}
                  onPress={() => setCookTimeRange(time.value)}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    isSelected
                      ? "bg-[#3bc475] border-[#2ECC71]"
                      : "bg-[#fffcf7] border-[#2C3E50]/30"
                  }`}
                >
                  <Text
                    className={`text-sm ${
                      isSelected ? "text-[#FDF6EC]" : "text-[#2C3E50]"
                    }`}
                  >
                    {time.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Apply Button */}
        <TouchableOpacity
          className="w-full py-4 rounded-xl bg-[#2ECC71] items-center shadow-md"
          activeOpacity={0.85}
        >
          <Text className="text-white text-base font-semibold">
            Apply Filters
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}