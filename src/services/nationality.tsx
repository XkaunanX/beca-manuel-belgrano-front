import axiosInstance from "@/lib/axios";
import { Nationality } from "@/types/nationality";

export const getNationalities = async (): Promise<Nationality[]> => {
  const res = await axiosInstance.get("/api/nationalities");
  return res.data;
};
