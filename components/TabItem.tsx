import React from 'react';
import { TouchableOpacity, Text, Animated, StyleSheet } from 'react-native';
import { MarketSubcategory } from '@types';
import { FontFamily } from '@constants/Fonts';
import { Colors } from '@constants/Colors';
import { moderateScale } from '@utils/matrix';
import { useLanguage } from 'context/LanguageContext';

interface TabItemProps {
  item: MarketSubcategory;
  index: number;
  subCategoryIndex: number;
  tabWidth: number[];
  allTabWidth: number[];
  setTabWidth: (widths: number[]) => void;
  scrollToIndex: (index: number) => void;
}

const TabItem: React.FC<TabItemProps> = ({
  item,
  index,
  subCategoryIndex,
  tabWidth,
  allTabWidth,
  setTabWidth,
  scrollToIndex,
}) => {
  const {currentLanguage} = useLanguage()
  return (
    <TouchableOpacity
      onLayout={(event) => {
        const { width } = event.nativeEvent.layout;
        allTabWidth.push(width);
        setTabWidth([...allTabWidth]);
      }}
      onPress={() => scrollToIndex(index)}
      style={styles.tabItem}
    >
      <Text style={styles.tabText}>{item.name[currentLanguage]}</Text>
      {index === subCategoryIndex && (
        <Animated.View
          style={[
            styles.animatedView,
            { width: tabWidth[index] },
          ]}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tabItem: {
    marginHorizontal: 20,
    height: 50,
    justifyContent: "center",
  },
  tabText: {
    fontFamily: FontFamily.Bold,
    color: Colors.darkBlue1,
    fontSize: moderateScale(16),
  },
  animatedView: {
    height: 2,
    backgroundColor: Colors.red,
    borderRadius: 10,
    bottom: -1,
    position: "absolute",
    zIndex: 9999,
  },
});

export default TabItem;