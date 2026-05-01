import { useColorScheme } from 'nativewind'
import React from 'react'
import { Image, View } from 'react-native'

function Header() {
  const { colorScheme } = useColorScheme()

  const logoSrc = colorScheme === 'light' ? require('@/assets/logo.png') : require('@/assets/logo-dark.png')

  return (
    <View className="items-center pt-8 px-4 bg-background-200 dark:bg-background-dark-100">
        <Image source={logoSrc} className='object-fit items-center w-[50%] h-12' resizeMode="contain"/>
    </View>
  )
}

export default Header