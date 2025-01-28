import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  View,
  ListRenderItem,
  FlatList,
  StyleSheet,
  Platform,
  Animated,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import Header from "components/Header";
import { Colors } from "@constants/Colors";
import Card from "components/CategoryCard/Card";
import { height, moderateScale, verticalScale, width } from "@utils/matrix";
import { FontFamily } from "@constants/Fonts";
import ProductCategory from "components/ProductCard";
import { useGetSubcategoryData } from "@api/queries/useGetCategory";
import { MarketCategory, MarketSubcategory, Product } from "@types";
import Carousel from "react-native-reanimated-carousel";
import { headerHeight } from "@constants/common";
import TabItem from "components/TabItem";
import { useLoader } from "context/LoaderContext";
import { useLanguage } from "context/LanguageContext";

let allTabWidth: number[] = [];

const SubCategory = () => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const { id, filteredCategory } = useLocalSearchParams();
  const [selectedSubCatId, setSelectedSubCatId] = useState(id);
  const productsListRef = useRef<FlatList<any>>(null);
  const categoriesListRef = useRef<FlatList<MarketSubcategory>>(null);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [subCategoryIndex, setSubCategoryIndex] = useState(0);
  const CategoryData = JSON.parse(filteredCategory as string);
  const { data, isLoading } = useGetSubcategoryData(Number(selectedSubCatId));
  const scrollX = useRef(new Animated.Value(0)).current;
  const [tabWidth, setTabWidth] = useState<number[]>([]);
  const carouselRef = useRef<any>(null);
  const { setLoading } = useLoader();
  const router = useRouter();
  const { currentLanguage } = useLanguage();

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);

  useEffect(() => {
    return () => {
      allTabWidth = [];
    };
  }, []);

  const firstHeaderTranslate = scrollY.interpolate({
    inputRange: [0, headerHeight],
    outputRange: [0, -headerHeight],
    extrapolate: "clamp",
  });

  const secondHeaderOpacity = scrollY.interpolate({
    inputRange: [0, headerHeight, headerHeight + 1],
    outputRange: [1, 1, 1],
    extrapolate: "clamp",
  });

  const tabBarAnimate = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: [0, -150],
    extrapolate: "clamp",
  });

  const onCardPress = (item: any, index: number) => {
    setSelectedCategory(index);
    setSelectedSubCatId(item.id);
    setSubCategoryIndex(0);
    setTabWidth([]);
    allTabWidth = [];
    productsListRef.current?.scrollToIndex({ index: 0 });
    carouselRef.current?.scrollTo({ index: 0, animated: 0 });
  };

  const renderItem: ListRenderItem<MarketCategory> = ({ item, index }) => (
    <Card
      title={item.name[currentLanguage]}
      image={item.serverImageUrl}
      onPress={() => onCardPress(item, index)}
      isSelected={index === selectedCategory}
    />
  );

  const renderItemProduct: ListRenderItem<Product> = ({ item }) => {
    if (item.type === "category") return null;
    return (
      <ProductCategory
        title={item.name[currentLanguage]}
        image={item.productImages[0]?.serverImageUrl}
        id={item.id}
        weight={item.weightToPresent ?? undefined}
        price={item.pricePerWeight ?? undefined}
        blurHash={item.productImages[0]?.blurhash}
      />
    );
  };

  const getItemLayout = useMemo(
    () => (_: ArrayLike<Product> | null | undefined, index: number) => ({
      length: verticalScale(196),
      offset: verticalScale(196) * index,
      index,
    }),
    []
  );

  const handleScroll = useCallback(
    (
      event: NativeSyntheticEvent<NativeScrollEvent>,
      index: number,
      isScrollable: boolean
    ) => {
      if (!isScrollable) return;

      const { contentOffset, contentSize, layoutMeasurement } =
        event.nativeEvent;

      if (contentOffset.y < -100 && index > 0) {
        carouselRef?.current?.scrollTo({ index: index - 1, animated: true });
      }

      if (
        contentOffset.y >=
          contentSize.height - layoutMeasurement.height + 100 &&
        data?.marketSubcategories &&
        index < data.marketSubcategories.length - 1
      ) {
        carouselRef.current?.scrollTo({ index: index + 1, animated: true });
      }
    },
    [data?.marketSubcategories]
  );

  const redirectToProduct = (index: number) => {
    setSubCategoryIndex(index);
    carouselRef?.current?.scrollTo({ index: index, animated: true });
  };

  useEffect(() => {
    Animated.spring(scrollX, {
      toValue: subCategoryIndex * (allTabWidth as number[])[subCategoryIndex],
      useNativeDriver: false,
      friction: 8,
      tension: 50,
    }).start();

    if (categoriesListRef.current) {
      categoriesListRef.current.scrollToIndex({
        index: subCategoryIndex,
        animated: true,
        viewPosition: 0.5,
      });
    }
  }, [subCategoryIndex]);

  const renderTabWidth = ({
    item,
    index,
  }: {
    item: MarketSubcategory;
    index: number;
  }) => (
    <TabItem
      item={item}
      index={index}
      subCategoryIndex={subCategoryIndex}
      tabWidth={tabWidth}
      allTabWidth={allTabWidth}
      setTabWidth={setTabWidth}
      scrollToIndex={redirectToProduct}
    />
  );

  const renderMainList = ({
    item,
    index,
  }: {
    index: number;
    item: MarketSubcategory;
  }) => {
    const isScrollable =
      item.products.length * verticalScale(196) > height - 200;
    const isFirstList = index === 0;
    return (
      <Animated.FlatList
        nestedScrollEnabled={Platform.OS === "android"}
        showsVerticalScrollIndicator={false}
        ref={productsListRef}
        style={{ paddingTop: 10, paddingHorizontal: 10 }}
        getItemLayout={getItemLayout}
        contentContainerStyle={{
          paddingBottom: 200,
        }}
        numColumns={3}
        data={item.products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItemProduct}
        onScroll={
          isFirstList
            ? Animated.event(
                [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                {
                  useNativeDriver: true,
                  listener: (event: NativeSyntheticEvent<NativeScrollEvent>) =>
                    handleScroll(event, index, isScrollable),
                }
              )
            : (event: NativeSyntheticEvent<NativeScrollEvent>) => {
                handleScroll(event, index, isScrollable);
              }
        }
        onEndReachedThreshold={16}
        bounces={isScrollable}
      />
    );
  };
  if(data)
  return (
    <View style={{ flex: 1 }}>
      <Header leftOnPress={() => router.back()} />
      <Animated.View
        style={[
          styles.headerContainer,
          {
            transform: [{ translateY: firstHeaderTranslate }],
          },
        ]}
      >
        <FlatList
          contentContainerStyle={styles.headerContent}
          horizontal
          data={CategoryData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          showsHorizontalScrollIndicator={false}
        />
      </Animated.View>
       <Animated.View
       style={[
         styles.tabBar,
         {
           opacity: secondHeaderOpacity,
           transform: [{ translateY: tabBarAnimate }],
         },
       ]}
     >
       <FlatList
         showsHorizontalScrollIndicator={false}
         ref={categoriesListRef}
         horizontal
         onScroll={Animated.event(
           [{ nativeEvent: { contentOffset: { x: scrollX } } }],
           { useNativeDriver: false }
         )}
         style={{ overflow: "visible" }}
         data={data?.marketSubcategories}
         keyExtractor={(item) => item.id.toString()}
         bounces={false}
         renderItem={renderTabWidth}
       />
     </Animated.View>
      <Animated.View
        style={{
          transform: [{ translateY: firstHeaderTranslate }],
          flex: 1,
        }}
      >
        <Carousel
          panGestureHandlerProps={{ activeOffsetX: [-10, 10] }}
          vertical
          ref={carouselRef}
          width={width}
          height={height}
          data={data?.marketSubcategories ?? []}
          renderItem={renderMainList}
          onSnapToItem={(index) => setSubCategoryIndex(index)}
          scrollAnimationDuration={500}
          loop={false}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: 10,
  },
  headerContainer: {
    paddingVertical: 15,
    backgroundColor: Colors.white,
    zIndex: 1,
  },
  title: {
    fontSize: moderateScale(14),
    color: Colors.brown,
    fontFamily: FontFamily.SemiBold,
  },
  header: {
    backgroundColor: Colors.white,
  },
  headerList: {
    backgroundColor: Colors.white,
  },
  headerContent: {
    marginHorizontal: 10,
  },
  scrollContent: {
    flexGrow: 1,
  },
  tabBar: {
    zIndex: 2,
    backgroundColor: Colors.white,
    height: 50,
  },
});

export default SubCategory;
