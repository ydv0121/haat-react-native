import { View, Text, ListRenderItem, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { FontFamily } from "@constants/Fonts";
import { moderateScale, verticalScale, width } from "@utils/matrix";
import Card from "components/CategoryCard/Card";
import { useGetCategoryData } from "@api/queries/useGetCategory";
import { MARKET_ID } from "@constants/common";
import { MarketCategory } from "@types";
import { Colors } from "@constants/Colors";
import { Image } from "expo-image";
import { useLoader } from "context/LoaderContext";
import RNImage from "components/RNImage";
import { ScrollView } from "react-native-gesture-handler";
import LanguageModal from "components/LangaugeModal";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useLanguage } from "context/LanguageContext";

const Category = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets()
  const [isModalVisible, setModalVisible] = useState(false);
  const { data, isLoading } = useGetCategoryData(MARKET_ID)
  const { currentLanguage } = useLanguage()
  const { setLoading } = useLoader();

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);

  const onCardPress = (item: MarketCategory) => {
    const tempArray = data?.marketCategories.map((product) => {
      return {
        name: product.name,
        serverImageUrl: product.serverImageUrl,
        id: product.id
      }
    })
    const filteredCategory = tempArray?.filter((p) => p.id !== item.id);
    filteredCategory?.unshift({
      name: item.name,
      serverImageUrl: item.serverImageUrl,
      id: item.id
    })

    console.log(filteredCategory);
    router.navigate({
      pathname: '/category/[id]',
      params: { id: item.id, filteredCategory: JSON.stringify(filteredCategory) }
    })
  }

  const renderItem: ListRenderItem<MarketCategory> = ({ item }) => (
    <Card
      title={item.name[currentLanguage]}
      image={item.serverImageUrl}
      onPress={() => onCardPress(item)}
    />
  );
  const onPressViewAll = () => {
    const firstCategoryID = data?.marketCategories[0].id
    const CategoryArray = data?.marketCategories.map((product) => {
      return {
        name: product.name,
        serverImageUrl: product.serverImageUrl,
        id: product.id
      }
    })
    router.navigate({
      pathname: '/category/[id]',
      params: { id: firstCategoryID?.toString() || '', filteredCategory: JSON.stringify(CategoryArray || []) }
    })
  }

  if (data)
    return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollViewContent}>
          <View>
            <RNImage style={styles.bannerImage} contentFit='cover' url={data.marketBanners[0].serverImageUrl} />
            <TouchableOpacity onPress={() => setModalVisible(true)} activeOpacity={0.9} style={[styles.translateButton, { top: insets.top }]}>
              <MaterialCommunityIcons name="translate" size={20} color={Colors.white} />
            </TouchableOpacity>
            <View style={styles.headerContainer}>
              <View style={styles.headerContent}>
                <RNImage style={styles.iconImage} url={data.iconSmallImageUrl} />
                <Text numberOfLines={1} style={styles.headerTitle}>{data.name[currentLanguage]}</Text>
              </View>
              <View style={styles.headerAddress}>
                <Image style={styles.locationIcon} contentFit={'contain'} source={require("@assets/images/location.png")} />
                <Text numberOfLines={1} style={styles.headerAddressText}>{data.address[currentLanguage]}</Text>
              </View>
            </View>
          </View>

          <View style={styles.categoriesContainer}>
            <View style={styles.categoriesHeader}>
              <Text style={styles.categoriesTitle}>AVAILABLE CATEGORIES</Text>
              <TouchableOpacity onPress={onPressViewAll}>
                <Text style={styles.viewAllText}>View all</Text>
              </TouchableOpacity>
            </View>
            <ScrollView horizontal scrollEnabled={false}>
              <FlatList
                scrollEnabled={false}
                numColumns={3}
                data={data.marketCategories}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
              />
            </ScrollView>
          </View>
        </ScrollView>
        {isModalVisible &&
          <LanguageModal
            onClose={() => setModalVisible(false)}
          />
        }
      </View>
    )

};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: 80,
  },
  bannerImage: {
    height: verticalScale(220),
    width: width,
  },
  translateButton: {
    position: 'absolute',
    alignSelf: 'flex-end',
    padding: 10,
    backgroundColor: "rgba(54,46,48,0.4)",
    borderRadius: 40,
    right: 5,
  },
  headerContainer: {
    position: 'absolute',
    width: width - 20,
    backgroundColor: Colors.white,
    bottom: -90,
    zIndex: 9999,
    alignSelf: 'center',
    borderRadius: 10,
    padding: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconImage: {
    width: 50,
    height: 50,
    borderRadius: 20,
  },
  headerTitle: {
    fontFamily: FontFamily.RobotoBold,
    fontSize: moderateScale(21),
    color: Colors.darkBrown,
    marginLeft: 10,
  },
  headerAddress: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  locationIcon: {
    height: 20,
    width: 20,
  },
  headerAddressText: {
    fontFamily: FontFamily.SemiBold,
    fontSize: moderateScale(16),
    color: Colors.blue,
    marginLeft: 10,
  },
  categoriesContainer: {
    backgroundColor: Colors.white,
    paddingVertical: 10,
    marginTop: 100,
    shadowColor: Colors.purple,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 10,
  },
  categoriesHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 6,
    padding: 12,
  },
  categoriesTitle: {
    fontFamily: FontFamily.Bold,
    fontSize: moderateScale(18),
  },
  viewAllText: {
    fontFamily: FontFamily.Regular,
    fontSize: moderateScale(14),
  },
});

export default Category;

