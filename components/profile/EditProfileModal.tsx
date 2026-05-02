import useTheme from "@/hooks/useTheme";
import { X } from "lucide-react-native";
import { Modal, Text, TouchableOpacity, View } from "react-native";

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  content: React.ReactNode;
}

export default function EditProfileModal({ visible, onClose, content }: ModalProps){
  const { isDark } = useTheme();

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
        className="flex-1 justify-center items-center px-6 h-full"
        style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
      >
        <TouchableOpacity
          activeOpacity={1}
          className="w-full bg-background-50 dark:bg-background-dark-100 rounded-3xl p-6"
        >
          <TouchableOpacity
            onPress={onClose}
            className="absolute top-4 right-4"
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <X size={18} color={isDark ? '#9CA3AF' : "#4B5563"} />
          </TouchableOpacity>

          {content}
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  )
}