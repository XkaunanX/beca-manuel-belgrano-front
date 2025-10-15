import axiosInstance from "@/lib/axios";
import { Career } from "@/types/careers";

const ENDPOINT = "/api/careers";

export const careerService = {
  getAll: async (): Promise<Career[]> => {
    const res = await axiosInstance.get(ENDPOINT);
    return res.data;
  },

  getById: async (id: number): Promise<Career> => {
    const res = await axiosInstance.get(`${ENDPOINT}/${id}`);
    return res.data;
  },

  create: async (data: Omit<Career, "id">): Promise<Career> => {
    const res = await axiosInstance.post(ENDPOINT, data);
    return res.data;
  },

  update: async (id: number, data: Partial<Career>): Promise<Career> => {
    const res = await axiosInstance.put(`${ENDPOINT}/${id}`, data);
    return res.data;
  },

  remove: async (id: number): Promise<void> => {
    await axiosInstance.delete(`${ENDPOINT}/${id}`);
  },
};
