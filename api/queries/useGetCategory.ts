import { endpoints } from "@constants/endpoints";
import { getResource } from "@api/index";
import { MarketData } from "types";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@api/queryKeys";
import { MARKET_ID } from "@constants/common";

export const getCategory = async (catId: number): Promise<MarketData> => {
  if (!catId) {
    throw new Error("Category ID is required");
  }
  const data = await getResource({
    pathUrl: `${endpoints.getCagtegory}/${catId}`,
  });
  return data;
};

export const useGetCategoryData = (catId: number) => {
  const query = useQuery({
    queryKey: [queryKeys.GET_CATEGORY, catId],
    queryFn: () => getCategory(catId),
  });
  return query;
};
export const getSubcategory = async (subCatId: number): Promise<MarketData> => {
  if (!subCatId) {
    throw new Error("Sub Category ID is required");
  }
  const data = await getResource({
    pathUrl: `${endpoints.getCagtegory}/${MARKET_ID}/categories/${subCatId}`,
  });
  return data;
};

export const useGetSubcategoryData = (subCatId: number) => {
  const query = useQuery({
    queryKey: [queryKeys.GET_SUB_CATEGORY, subCatId],
    queryFn: () => getSubcategory(subCatId),
  });
  return query;
};
