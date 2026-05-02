import useTheme from '@/hooks/useTheme'
import React from 'react'
import { Image, View } from 'react-native'

function Header() {
  const { isDark } = useTheme()

  const logoSrc = isDark ? require('@/assets/logo-dark.png') : require('@/assets/logo.png')

  return (
    <View className="items-center pt-8 px-4 bg-background-200 dark:bg-background-dark-100">
        <Image source={logoSrc} className='items-center w-[50%] h-12' resizeMode="contain"/>
    </View>
  )
}

export default Header