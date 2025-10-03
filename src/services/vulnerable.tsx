import axiosInstance from "@/lib/axios";
import { VulnerableGroup } from "@/types/vulnerable-group";

export const getVulnerableGroups = async (): Promise<VulnerableGroup[]> => {
  const res = await axiosInstance.get("/api/vulnerable-groups");
  return res.data;
};