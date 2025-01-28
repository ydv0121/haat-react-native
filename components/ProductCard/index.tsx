import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { FontFamily } from "@constants/Fonts";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "@utils/matrix";
import React from "react";
import { Colors } from "@constants/Colors";
import { Image } from "expo-image";
import RNImage from "components/RNImage";

const { width } = Dimensions.get("window");
const cardWidth = (width - 40) / 3;
interface GroceryItem {
  id: number;
  title: string | null | undefined;
  image: any;
  weight?: string | undefined;
  price?: number | undefined;
  blurHash?: string;
}

const ProductCategory: React.FC<GroceryItem> = ({
  title,
  image,
  id,
  price,
  weight,
  blurHash,
}) => {
  return (
    <TouchableOpacity activeOpacity={0.9} style={styles.card}>
      <TouchableOpacity style={styles.addContainer}>
        <Image
          source={require("@assets/svgs/plus.svg")}
          style={{ height: 15, width: 15 }}
          contentFit="contain"
        />
      </TouchableOpacity>
      <View style={styles.imageConatiner}>
        <RNImage
          contentFit="contain"
          url={image}
          style={styles.image}
          placeholder={blurHash}
          defaultImage={require("@assets/images/logo.svg")}
        />
      </View>
      <View style={styles.content}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            style={{ height: 15, width: 15 }}
            contentFit="contain"
            source={require("@assets/svgs/currency.svg")}
          />
          <Text
            style={{
              color: Colors.black,
              fontFamily: FontFamily.SemiBold,
              fontSize: moderateScale(14),
              left: 1,
            }}
          >
            {price}
          </Text>
        </View>
        <Text numberOfLines={2} style={styles.title}>
          {title}
        </Text>
        <Text
          style={{
            color: Colors.grey,
            fontFamily: FontFamily.RobotoLight,
            fontSize: moderateScale(14),
            letterSpacing: 1,
          }}
        >
          {weight}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    margin: 5,
    width: horizontalScale(110),
    shadowColor: Colors.purple,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 10,
    borderWidth: 0.5,
    borderColor: "#CCCCCC",
    height: verticalScale(196),
  },
  imageConatiner: {
    height: 110,
    alignItems: "center",
    justifyContent: "center",
  },
  addContainer: {
    shadowColor: Colors.purple,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 10,
    right: 10,
    height: 30,
    width: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.white,
    alignSelf: "flex-end",
    top: 10,
    position: "absolute",
    zIndex: 9999,
  },
  content: {
    paddingHorizontal: 10,
    marginTop: 15,
  },
  title: {
    // flex: 1,
    fontSize: moderateScale(12),
    color: Colors.brown,
    fontFamily: "RobotoRegular",
    paddingVertical: 4,
  },
  image: {
    marginTop: 30,
    width: "100%",
    height: cardWidth / 1.7,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
});

export default ProductCategory;
