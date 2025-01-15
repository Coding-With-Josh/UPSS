import { Button } from '@/components/Button';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useColorScheme } from 'nativewind';
import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';

export default function Example() {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const router = useRouter();
  const {setColorScheme, colorScheme} = useColorScheme();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#e8ecf4"}} className={`flex justify-center items-center text-black w-screen h-screen px-8`}>
      <View style={{ position: 'absolute', top: 40, left: 40 }}>
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="chevron-back-circle-outline" size={27} color="black" className='text-lg' />
      </TouchableOpacity>
      </View>
      <TouchableOpacity style={{ position: 'absolute', top: 40, right: 40 }} onPress={() => setColorScheme('dark')}>
        <Text>Theme</Text>
      </TouchableOpacity>
      <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome back!</Text>
        <Text style={styles.subtitle}>Sign in to your account</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.input}>
        <Text style={styles.inputLabel}>Email address</Text>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          clearButtonMode="while-editing"
          keyboardType="email-address"
          onChangeText={email => setForm({ ...form, email })}
          placeholder="john@example.com"
          className='bg-transparent border border-gray-400'
          placeholderTextColor="#6b7280"
          style={styles.inputControl}
          value={form.email}
        />
        </View>

        <View style={styles.input}>
        <Text style={styles.inputLabel}>Password</Text>
        <TextInput
          autoCorrect={false}
          clearButtonMode="while-editing"
          onChangeText={password => setForm({ ...form, password })}
          placeholderTextColor="#6b7280"
          className='bg-transparent border border-gray-400'
          style={styles.inputControl}
          secureTextEntry={true}
          value={form.password}
        />
        </View>

        <View style={styles.formAction}>
        <TouchableOpacity style={styles.btn} onPress={() => router.push('/home')}>
          <Text style={styles.btnText}>Sign in</Text>
        </TouchableOpacity>
        </View>
      </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24, // Increase padding
    width: '90%', // Add width
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    fontFamily: "Quicksand_400Regular",
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e8ecf4',
  },
  // Add width to the form
  form: {
    marginBottom: 24,
    width: '100%', // Add this
  },
  header: {
    marginVertical: 36,
    fontFamily: "Quicksand_400Regular"

  },
  title: {
    fontSize: 32,
    color: '#1d1d1d',
    marginBottom: 6,
    textAlign: 'center',
    fontFamily: "Quicksand_700Bold"

  },
  subtitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#929292',
    fontFamily: "Quicksand_400Regular",
    textAlign: 'center',
  },
  /** Form */
  formAction: {
    marginVertical: 24,
  },
  formFooter: {
    fontSize: 15,
    fontWeight: '500',
    fontFamily: "Quicksand_400Regular",
    color: '#222',
    textAlign: 'center',
  },
  /** Input */
  input: {
    marginBottom: 16,
    fontFamily: "Quicksand_400Regular"

  },
  inputLabel: {
    fontSize: 17,
    fontWeight: '600',
    color: '#222',
    marginBottom: 8,
    fontFamily: "Quicksand_400Regular"

  },
  inputControl: {
    height: 44,
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
    fontFamily: "Quicksand_400Regular"

  },
  /** Button */
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    backgroundColor: '#007aff',
    borderColor: '#007aff',
    fontFamily: "Quicksand_400Regular"

  },
  btnText: {
    fontSize: 17,
    lineHeight: 24,
    color: '#fff',
    fontFamily: "Quicksand_600SemiBold"
  },
});