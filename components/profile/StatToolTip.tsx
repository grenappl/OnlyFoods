import { Modal, View, Text, TouchableOpacity } from 'react-native';
import { BookHeart, BookOpen, Heart, X } from 'lucide-react-native';

interface TooltipProps {
  visible: boolean;
  title: string;
  description: string;
  onClose: () => void;
}

export const STAT_TOOLTIPS = {
  Recipes: {
    title: 'Recipes',
    description: 'Recipes you have created for the community.',
  },
  Saves: {
    title: 'Saves',
    description: 'Your recipes people have saved as their favorites.',
  },
  Favorites: {
    title: 'Favorites',
    description: 'Recipes you have marked as your all-time favorites.',
  }
};

export default function StatTooltip({ visible, title, description, onClose }: TooltipProps) {
  const icon = title === 'Recipes' ? <BookOpen color="#F39C12" size={20} /> :
    title === 'Saves' ? <Heart color="#FB4141" /> :
    <BookHeart color="#2ECC71" />

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <TouchableOpacity
        activeOpacity={1}
        onPress={onClose}
        className="flex-1 justify-center items-center px-6"
        style={{ backgroundColor: 'rgba(0,0,0,0.1)' }}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={onClose}
          className="flex-1 justify-center items-center px-6"
        >
          <TouchableOpacity
            activeOpacity={1}
            className="w-full bg-background-50 dark:bg-background-dark-100 rounded-3xl p-5"
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.1,
              shadowRadius: 12,
              elevation: 6,
            }}
          >
            {/* Close button */}
            <TouchableOpacity
              onPress={onClose}
              className="absolute top-4 right-4"
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <X size={16} color="#9CA3AF" />
            </TouchableOpacity>

            <View className='flex-row gap-3'>
              {icon}
              <Text className="text-base font-bold text-text-700 dark:text-text-dark-700 mb-2">
                {title}
              </Text>
            </View>
            <Text className="text-sm text-text-400 dark:text-text-dark-600 leading-5 text-justify">
              {description}
            </Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
}