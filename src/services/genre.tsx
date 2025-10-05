import axiosInstance from "@/lib/axios";
import { Genre } from "@/types/genre";

export const getGenres = async (): Promise<Genre[]> => {
  const res = await axiosInstance.get("/api/genres");
  return res.data;
};


