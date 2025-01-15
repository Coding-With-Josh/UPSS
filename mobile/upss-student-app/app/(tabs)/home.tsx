import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { Button } from '@/components/ui/button'
import { BlurView } from 'expo-blur'

const Home = () => {
  return (
    <ScrollView className='flex items-center justify-center w-screen h-screen py-10 px-6 bg-blue-50/80'>
      <View className='flex items-center justify-center w-full fixed'>
        <View></View>
      </View>
    </ScrollView>
  )
}

export default Home