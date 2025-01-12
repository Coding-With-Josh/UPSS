import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

export function Button({children}: any) {
  return (
    <TouchableOpacity className='flex w-6 h-4 bg-blue-600'>
        {children}
    </TouchableOpacity>
  )
}