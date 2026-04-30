import { Heart, X } from 'lucide-react-native';
import { View, TouchableOpacity, Text } from 'react-native';

interface ActionButtonsProps {
  onPass: () => void;
  onLike: () => void;
  onUndo?: () => void;
  canUndo?: boolean;
}

export function ActionButtons({ onPass, onLike, onUndo, canUndo }: ActionButtonsProps) {
  return (
    <View className="flex-row items-center justify-center gap-6 pb-6 px-8">
      {/* Undo Button */}
      {onUndo && (
        <TouchableOpacity
          onPress={onUndo}
          disabled={!canUndo}
          className={`w-12 h-12 rounded-full items-center justify-center ${
            canUndo ? 'bg-gray-200' : 'bg-gray-100 opacity-50'
          }`}
        >
          <Text className="text-xl">↩️</Text>
        </TouchableOpacity>
      )}

      {/* Pass/Skip Button */}
      <TouchableOpacity
        onPress={onPass}
        className="w-14 h-14 rounded-full bg-secondary-500 items-center justify-center shadow-lg"
      >
        <X color="white" />
      </TouchableOpacity>

      {/* Like/Favorite Button */}
      <TouchableOpacity
        onPress={onLike}
        className="w-14 h-14 rounded-full bg-primary-500 items-center justify-center shadow-lg"
      >
        <Heart color="white" />
      </TouchableOpacity>
    </View>
  );
}
