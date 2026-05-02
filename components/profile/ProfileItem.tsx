import { Text, View, TouchableOpacity } from "react-native";

interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  onPress: () => void;
  danger?: boolean;
}

export default function ProfileItem({ icon, label, onPress, danger = false }: MenuItemProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      // className="flex-row items-center bg-background-50 dark:bg-background-dark-50 px-4 py-4 rounded-2xl mb-3"
      // style={{
      //   // iOS
      //   shadowColor: '#000',
      //   shadowOffset: { width: 0, height: 1 },
      //   shadowOpacity: 0.05,
      //   shadowRadius: 2,
      //   // Android
      //   elevation: 2, 
      // }}
      className="flex-row items-center bg-background-50 dark:bg-background-dark-50 px-4 py-4 rounded-2xl mb-3 border border-background-400 dark:border-background-dark-200"
    >
      <View className="w-8 items-center">{icon}</View>
      <Text
        className={`flex-1 ml-3 font-semibold text-base ${
          danger ? 'text-secondary-500' : 'text-text-700 dark:text-text-dark-700'
        }`}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}