import { Modal, View, Text, TouchableOpacity } from 'react-native';
import { AlertTriangle, X } from 'lucide-react-native';

interface ConfirmModalProps {
  visible: boolean;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  danger?: boolean;
}

export default function ConfirmModal({
  visible,
  title = 'Are you sure?',
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  danger = false,
}: ConfirmModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onCancel}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={onCancel}
        className="flex-1 items-center justify-center px-6"
        style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <TouchableOpacity
          activeOpacity={1}
          className="w-full rounded-3xl bg-background-50 p-6 dark:bg-background-dark-200">
          <TouchableOpacity
            onPress={onCancel}
            className="absolute right-4 top-4"
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <X size={18} color="#9CA3AF" />
          </TouchableOpacity>

          <View className="mb-4 items-center">
            <View
              className={`size-16 items-center justify-center rounded-full ${
                danger
                  ? 'bg-secondary-50 dark:bg-secondary-900'
                  : 'bg-primary-50 dark:bg-primary-900'
              }`}>
              <AlertTriangle size={32} color={danger ? '#FB4141' : '#F59E0B'} />
            </View>
          </View>

          <Text className="mb-2 text-center text-lg font-bold text-text-800 dark:text-text-dark-800">
            {title}
          </Text>
          <Text className="mb-6 text-center text-sm leading-5 text-text-700 dark:text-text-dark-700">
            {message}
          </Text>

          <View className="flex-row gap-3">
            <TouchableOpacity
              onPress={onCancel}
              className="flex-1 items-center rounded-2xl bg-background-100 py-3 dark:bg-background-dark-100">
              <Text className="text-base font-semibold text-text-600 dark:text-text-dark-600">
                {cancelText}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onConfirm}
              className={`flex-1 items-center rounded-2xl py-3 ${
                danger ? 'bg-secondary-500' : 'bg-primary-500'
              }`}>
              <Text className="text-base font-semibold text-white">{confirmText}</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
}
