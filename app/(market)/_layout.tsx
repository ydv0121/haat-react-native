import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

const MarketLayout = () => {
    return (
        <Stack>
            <Stack.Screen name='index' options={{ title: "Market", headerShown: false }} />
        </Stack>
    )
}

export default MarketLayout