import axiosInstance from "@/lib/axios";
import { Province } from "@/types/province";

export const getProvinces = async (): Promise<Province[]> => {
  const res = await axiosInstance.get("/api/provinces");
  return res.data;
};
