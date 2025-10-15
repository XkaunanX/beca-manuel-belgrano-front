import axiosInstance from "@/lib/axios";
import { BankBranch } from "@/types/bank_branches";

const ENDPOINT = "/api/bank-branches";

export const bankBranchService = {
  getAll: async (): Promise<BankBranch[]> => {
    const res = await axiosInstance.get(ENDPOINT);
    return res.data;
  },

  getByProvinceId: async (provinceId: number): Promise<BankBranch[]> => {
    const res = await axiosInstance.get(ENDPOINT, { params: { province_id: provinceId } });
    return res.data;
  },

  getById: async (id: number): Promise<BankBranch> => {
    const res = await axiosInstance.get(`${ENDPOINT}/${id}`);
    return res.data;
  },

  create: async (data: Omit<BankBranch, "id">): Promise<BankBranch> => {
    const res = await axiosInstance.post(ENDPOINT, data);
    return res.data;
  },

  update: async (id: number, data: Partial<BankBranch>): Promise<BankBranch> => {
    const res = await axiosInstance.put(`${ENDPOINT}/${id}`, data);
    return res.data;
  },

  remove: async (id: number): Promise<void> => {
    await axiosInstance.delete(`${ENDPOINT}/${id}`);
  },
};
