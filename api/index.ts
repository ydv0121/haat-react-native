import axios, { AxiosRequestConfig } from "axios";

type Props = {
  pathUrl: string;
  payload?: Record<string, any>;
};

const axiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      if (!config.headers) {
        config.headers = new axios.AxiosHeaders();
      }
      config.headers["Content-Type"] = "application/json";
      config.headers["Accept"] = "application/json";
      return config;
    } catch (error) {
      console.log("error", error);
      return Promise.reject(error);
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getResource = async ({ pathUrl }: Props) => {
  const { data } = await axiosInstance.get(pathUrl);
  return data;
};
