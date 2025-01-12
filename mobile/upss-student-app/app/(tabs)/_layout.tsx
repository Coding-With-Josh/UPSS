import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import "../global.css";
import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from 'nativewind';
import BottomTab from '../navigations/BottomTab';

export default function TabLayout() {
  const {colorScheme} = useColorScheme();

  return (
    <BottomTab/>
  );
}
