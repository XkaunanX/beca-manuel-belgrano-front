import axiosInstance from "@/lib/axios";
import { Unit } from "@/types/units";

const ENDPOINT = "/api/units";

export const unitService = {
  getAll: async (): Promise<Unit[]> => {
    const res = await axiosInstance.get(ENDPOINT);
    return res.data;
  },

  getById: async (id: number): Promise<Unit> => {
    const res = await axiosInstance.get(`${ENDPOINT}/${id}`);
    return res.data;
  },

  create: async (data: Omit<Unit, "id">): Promise<Unit> => {
    const res = await axiosInstance.post(ENDPOINT, data);
    return res.data;
  },

  update: async (id: number, data: Partial<Unit>): Promise<Unit> => {
    const res = await axiosInstance.put(`${ENDPOINT}/${id}`, data);
    return res.data;
  },

  remove: async (id: number): Promise<void> => {
    await axiosInstance.delete(`${ENDPOINT}/${id}`);
  },
};
