import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { BlurHash, IMAGE_BASE_URL } from '@constants/common';
import { FontFamily } from '@constants/Fonts';
import { height, horizontalScale, moderateScale, verticalScale } from '@utils/matrix';
import { useRouter } from 'expo-router';
import React from 'react';
import { Colors } from '@constants/Colors';
import { Image } from 'expo-image';
import { LocalizedString } from '@types';

const { width } = Dimensions.get('window');
const cardWidth = (width - 40) / 3;

interface GroceryItem {
    title: string | null | undefined;
    image: any;
    onPress: () => void;
    isSelected?: boolean
}

const Card: React.FC<GroceryItem> = ({ title, image, onPress, isSelected = false }) => {
    const router = useRouter()
    return (
        <TouchableOpacity activeOpacity={0.9} onPress={onPress} style={[styles.card, {
            borderWidth: isSelected ? 2 : 0.5,
            borderColor: isSelected ? Colors.red : Colors.silver,
        }]}>
            <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
                <View style={styles.content}>
                    <Text style={styles.title}>{title}</Text>
                </View>
                <View style={{ marginTop: 'auto' }}>
                    <Image
                        source={{ uri: IMAGE_BASE_URL + image }}
                        style={styles.image}
                        contentFit="cover"
                        placeholder={BlurHash}
                        transition={1000}
                    />
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: Colors.white,
        borderRadius: 8,
        margin: 8,
        width: horizontalScale(104),
        shadowColor: Colors.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1,
        elevation: 3,
        overflow: 'hidden',
        height: verticalScale(104)
    },
    content: {
        padding: 10,
    },
    title: {
        // flex: 1,
        fontSize: moderateScale(14),
        color: Colors.brown,
        fontFamily: FontFamily.SemiBold
    },
    image: {
        width: '100%',
        height: cardWidth - 60,
        top: 10
    },
});

export default Card;