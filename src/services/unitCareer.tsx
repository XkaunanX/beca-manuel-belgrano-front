import axiosInstance from "@/lib/axios";
import { UnitCareer } from "@/types/unit_career";

const ENDPOINT = "/api/unit-career";

export const unitCareerService = {
  getAll: async (): Promise<UnitCareer[]> => {
    const res = await axiosInstance.get(ENDPOINT);
    return res.data;
  },

  getById: async (id: number): Promise<UnitCareer> => {
    const res = await axiosInstance.get(`${ENDPOINT}/${id}`);
    return res.data;
  },

  create: async (data: Omit<UnitCareer, "id">): Promise<UnitCareer> => {
    const res = await axiosInstance.post(ENDPOINT, data);
    return res.data;
  },

  update: async (id: number, data: Partial<UnitCareer>): Promise<UnitCareer> => {
    const res = await axiosInstance.put(`${ENDPOINT}/${id}`, data);
    return res.data;
  },

  remove: async (id: number): Promise<void> => {
    await axiosInstance.delete(`${ENDPOINT}/${id}`);
  },
};
