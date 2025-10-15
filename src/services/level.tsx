import axiosInstance from "@/lib/axios";
import { Level } from "@/types/levels";

const ENDPOINT = "/api/levels";

export const levelService = {
  getAll: async (): Promise<Level[]> => {
    const res = await axiosInstance.get(ENDPOINT);
    return res.data;
  },

  getById: async (id: number): Promise<Level> => {
    const res = await axiosInstance.get(`${ENDPOINT}/${id}`);
    return res.data;
  },

  create: async (data: Omit<Level, "id">): Promise<Level> => {
    const res = await axiosInstance.post(ENDPOINT, data);
    return res.data;
  },

  update: async (id: number, data: Partial<Level>): Promise<Level> => {
    const res = await axiosInstance.put(`${ENDPOINT}/${id}`, data);
    return res.data;
  },

  remove: async (id: number): Promise<void> => {
    await axiosInstance.delete(`${ENDPOINT}/${id}`);
  },
};
