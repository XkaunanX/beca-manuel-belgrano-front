import axiosInstance from "@/lib/axios";
import { Institution } from "@/types/institution";

export const getInstitutions = async (): Promise<Institution[]> => {
  const res = await axiosInstance.get("/api/institutions");
  return res.data;
};
