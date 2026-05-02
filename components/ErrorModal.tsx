import { Modal, View, Text, TouchableOpacity } from 'react-native';
import { AlertCircle, X } from 'lucide-react-native';

interface ErrorModalProps {
  visible: boolean;
  message: string;
  onClose: () => void;
}

export default function ErrorModal({ visible, message, onClose }: ErrorModalProps) {
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
        style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
      >
        <TouchableOpacity
          activeOpacity={1}
          className="w-full bg-background-50 dark:bg-background-dark-200 rounded-3xl p-6"
        >
          <TouchableOpacity
            onPress={onClose}
            className="absolute top-4 right-4"
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <X size={18} color="#9CA3AF" />
          </TouchableOpacity>

          <View className="items-center mb-4">
            <View className="size-16 rounded-full bg-secondary-50 dark:bg-secondary-900 items-center justify-center">
              <AlertCircle size={32} color="#FB4141" />
            </View>
          </View>

          <Text className="text-center text-lg font-bold text-text-800 dark:text-text-dark-800 mb-2">
            Something went wrong!
          </Text>
          <Text className="text-center text-sm text-text-700 dark:text-text-dark-700 leading-5 mb-6">
            {message}
          </Text>

          <TouchableOpacity
            onPress={onClose}
            className="bg-secondary-500 rounded-2xl py-3 items-center"
          >
            <Text className="text-white font-semibold text-base">Try Again</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
}