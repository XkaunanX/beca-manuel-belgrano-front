import axiosInstance from "@/lib/axios";
import { CivilStatus } from "@/types/civil-status";

export const getCivilStatuses = async (): Promise<CivilStatus[]> => {
  const res = await axiosInstance.get("/api/civil-statuses");
  return res.data;
};
