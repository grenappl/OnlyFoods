import { TouchableOpacity } from 'react-native';
import { Moon, Sun } from 'lucide-react-native';
import useTheme from '@/hooks/useTheme';

function AuthThemeSwitch() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <TouchableOpacity
      onPress={toggleTheme}
      className="absolute top-12 right-6"
    >
      {isDark
        ? <Moon size={24} color='#F9FAFB' />
        : <Sun size={24} color="#111827" />
      }
    </TouchableOpacity>
  );
}

export default AuthThemeSwitch;