import React from 'react'
import { Image, Text, View } from 'react-native'

function Header() {
  return (
    <View className="items-center pt-8 px-4 bg-background">
        <Image source={require('@/assets/logo.png')} className='object-fit items-center w-[50%] h-12'/>
    </View>
  )
}

export default Header