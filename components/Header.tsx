import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Platform,
  StatusBar,
  ViewStyle,
  StyleProp,
  TextInput,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { Colors } from '@constants/Colors';
import { FontFamily } from '@constants/Fonts';
import { moderateScale } from '@utils/matrix';
interface HeaderProps {
  leftOnPress?: () => void;
  rightOnPress?: () => void;
  backgroundColor?: string;
  containerStyle?: StyleProp<ViewStyle>;
}

const Header: React.FC<HeaderProps> = ({
  backgroundColor = Colors.white,
  containerStyle,
  leftOnPress,
  rightOnPress,
}) => {
  const insets = useSafeAreaInsets();

  const headerHeight = Platform.select({
    ios: 44,
    android: 56,
    default: 56,
  });

  const containerHeight: ViewStyle = {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : insets.top,
    height: headerHeight + (Platform.OS === 'android' ? StatusBar.currentHeight || 0 : insets.top),
    backgroundColor,
  };
  
  return (
    <SafeAreaView style={[styles.container, containerHeight, containerStyle]}>
      <View style={styles.header}>
        <View style={styles.leftContainer}>
          <TouchableOpacity
            onPress={leftOnPress}
            activeOpacity={0.9}
            style={styles.iconButton}
          >
            <Image
              source={require("@assets/svgs/back.svg")}
              style={styles.icon}
              contentFit="contain"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.titleContainer}>
          <View style={styles.searchContainer}>
            <Image
              source={require("@assets/svgs/search.svg")}
              style={styles.searchIcon}
              contentFit="contain"
            />
            <TextInput
              style={styles.searchInput}
              value='Search Carrerfour market'
              // placeholder='Search Carrerfour market'
              placeholderTextColor={"#666666"}
            />
          </View>
        </View>

        <View style={styles.rightContainer}>
          <TouchableOpacity
            onPress={rightOnPress}
            activeOpacity={0.9}
            style={styles.iconButton}
          >
            <Image
              source={require("@assets/svgs/heart.svg")}
              style={styles.icon}
              contentFit="contain"
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    zIndex: 9999,
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor:Colors.white
  },
  leftContainer: {
    width: 72,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  rightContainer: {
    width: 72,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchContainer: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    width: Platform.OS === 'ios' ? '100%' : '90%',
    borderRadius: 20,
    alignItems: 'center',
    paddingHorizontal: 10,
    flexDirection: 'row',
  },
  searchIcon: {
    height: 18,
    width: 18,
  },
  searchInput: {
    paddingLeft: 10,
    fontFamily: FontFamily.Regular,
    color:Colors.silver,
    fontSize: moderateScale(16),
    height: 40,flex:1,
    textAlign:'center',
    top:Platform.OS == 'ios'?0:2
  },
  iconButton: {
    borderColor: Colors.silver,
    borderWidth: 1,
    padding: 10,
    borderRadius: 20,
  },
  icon: {
    height: 20,
    width: 20,
  },
});

export default Header;