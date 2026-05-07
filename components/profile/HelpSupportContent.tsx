import { View, Text, TouchableOpacity, Linking } from 'react-native';
import { Mail, MessageCircle, FileText, ChevronRight, ExternalLink } from 'lucide-react-native';
import useTheme from '@/hooks/useTheme';
import { useState } from 'react';

export function HelpSupportContent() {
  const { isDark } = useTheme();

  const iconColor = isDark ? '#9CA3AF' : '#6B7280';

  const faqs = [
    {
      question: 'How do I save a recipe?',
      answer: 'Swipe right on any recipe in the Discover page to save it to your favorites.',
    },
    {
      question: 'How do I create my own recipe?',
      answer: 'Go to the Recipes tab and tap "New Recipe" to start creating your own.',
    },
    {
      question: 'How do I delete a favorite?',
      answer: 'In the Favorites tab, tap the heart icon on any recipe to remove it.',
    },
    {
      question: 'How do I change my profile picture?',
      answer: 'Go to Profile → Edit Profile and tap the profile picture to upload a new one.',
    },
  ];

  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const contactOptions = [
    {
      icon: <Mail size={20} color={iconColor} />,
      label: 'Email Support',
      description: 'support@onlyfoods.com',
      onPress: () => Linking.openURL('mailto:support@onlyfoods.com'),
    },
    {
      icon: <FileText size={20} color={iconColor} />,
      label: 'Terms & Privacy Policy',
      description: 'Read our policies',
      onPress: () => Linking.openURL('https://onlyfoods.com/privacy'),
    },
  ];

  return (
    <View>
      <Text className="text-center text-2xl font-bold text-text-800 dark:text-text-dark-800 mb-5">
        Help & Support
      </Text>

      {/* FAQ Section */}
      <Text className="text-sm font-semibold text-text-500 dark:text-text-dark-500 uppercase tracking-wider mb-3">
        Frequently Asked Questions
      </Text>

      <View className="bg-background-100 dark:bg-background-dark-100 rounded-2xl mb-5 overflow-hidden">
        {faqs.map((faq, index) => (
          <View
            key={index}
            className={`${
              index < faqs.length - 1
                ? 'border-b border-background-200 dark:border-background-dark-300'
                : ''
            }`}
          >
            <TouchableOpacity
              onPress={() => setExpandedFaq(expandedFaq === index ? null : index)}
              activeOpacity={0.7}
              className="flex-row items-center justify-between px-4 py-4"
            >
              <Text className="flex-1 text-sm font-medium text-text-800 dark:text-text-dark-800 pr-3">
                {faq.question}
              </Text>
              <ChevronRight
                size={16}
                color={iconColor}
                style={{
                  transform: [{ rotate: expandedFaq === index ? '90deg' : '0deg' }],
                }}
              />
            </TouchableOpacity>
            {expandedFaq === index && (
              <View className="px-4 pb-4">
                <Text className="text-sm text-text-500 dark:text-text-dark-500 leading-5">
                  {faq.answer}
                </Text>
              </View>
            )}
          </View>
        ))}
      </View>

      {/* Contact Section */}
      <Text className="text-sm font-semibold text-text-500 dark:text-text-dark-500 uppercase tracking-wider mb-3">
        Contact Us
      </Text>

      <View className="bg-background-100 dark:bg-background-dark-100 rounded-2xl overflow-hidden">
        {contactOptions.map((option, index) => (
          <TouchableOpacity
            key={index}
            onPress={option.onPress}
            activeOpacity={0.7}
            className={`flex-row items-center px-4 py-4 ${
              index < contactOptions.length - 1
                ? 'border-b border-background-200 dark:border-background-dark-300'
                : ''
            }`}
          >
            <View className="w-8 items-center">{option.icon}</View>
            <View className="flex-1 ml-3">
              <Text className="text-sm font-medium text-text-800 dark:text-text-dark-800">
                {option.label}
              </Text>
              <Text className="text-xs text-text-400 dark:text-text-dark-500 mt-0.5">
                {option.description}
              </Text>
            </View>
            <ExternalLink size={14} color={iconColor} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}