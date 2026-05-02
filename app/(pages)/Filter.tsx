import useTheme from "@/hooks/useTheme";
import { ChefHat, Clock, Search, Users } from "lucide-react-native";
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
  const { isDark } = useTheme();
  const [search, setSearch] = useState('');

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
    <ScrollView className="flex-1 bg-background-200 dark:bg-background-dark-100 pt-8">
      <View className="px-4 py-6 gap-6">
        <Text className="text-2xl text-text-700 dark:text-text-dark-900 font-semibold">Find Your Recipe</Text>

        <View className="gap-2">
          <View className="flex-row gap-2">
            <Search size={18} color={isDark ? '#9CA3AF' : "#6B7280"} />
            <Text className="text-sm text-text-500 dark:text-text-dark-800">Search</Text>
          </View>
          <View className="flex-row items-center bg-background-50 dark:bg-background-dark-50 border border-text-200 dark:border-background-dark-300 rounded-xl px-4">
            <TextInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Find recipes..."
              placeholderTextColor={isDark ? '#6B7280' : "#9CA3AF"}
              className="flex-1 py-3 text-sm text-text-500 dark:text-text-dark-700"
            />
          </View>
        </View>

        <View className="gap-2">
          <View className="flex-row items-center gap-2">
            <Clock size={18} color={isDark ? '#9CA3AF' : "#6B7280"} />
            <Text className="text-sm text-text-500 dark:text-text-dark-800">Cook Time</Text>
          </View>
          <View className="gap-2">
            {cookTimes.map((time) => {
              const isSelected = cookTimeRange === time.value;
              return (
                <TouchableOpacity
                  key={time.value}
                  onPress={() => setCookTimeRange(time.value)}
                  className={`w-full px-5 py-3 rounded-xl border ${
                    isSelected ? "bg-accent-500 border-accent-500"
                      : isDark ? "bg-background-dark-50 border-background-dark-300": "bg-background-50 border-text-200"
                  }`}
                >
                  <Text
                    className={`text-sm ${
                      isSelected ? "text-background-50" : isDark ? "text-text-dark-800": "text-text-800"
                    }`}
                  >
                    {time.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        
        <View className="gap-2">
          <View className="flex-row gap-2">
            <Users size={18} color={isDark ? '#9CA3AF' : "#6B7280"} />
            <Text className="text-sm text-text-500 dark:text-text-dark-800">Serving Size</Text>
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

        <View className="gap-2 mb-5">
          <View className="flex-row gap-2">
            <ChefHat size={18} color={isDark ? '#9CA3AF' : "#6B7280"} />
            <Text className="text-sm text-text-500 dark:text-text-dark-800">Ingredients</Text>
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

        {/* Apply Button */}
        <TouchableOpacity
          className="w-full py-4 rounded-xl bg-accent-500 dark:bg-accent-600 items-center shadow-md"
          activeOpacity={0.85}
        >
          <Text className="text-white text-base font-semibold">
            Apply Filters
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="w-full py-4 rounded-xl bg-secondary-500 dark:bg-secondary-600 items-center shadow-md"
          activeOpacity={0.85}
        >
          <Text className="text-white text-base font-semibold">
            Reset Filters
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}