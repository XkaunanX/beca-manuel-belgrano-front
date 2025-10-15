import axiosInstance from "@/lib/axios";
import { AcademicPlan } from "@/types/academic-plan";

const ENDPOINT = "/api/academic-plans";

export const academicPlanService = {
  getAll: async (): Promise<AcademicPlan[]> => {
    const res = await axiosInstance.get(ENDPOINT);
    return res.data;
  },

  getById: async (id: number): Promise<AcademicPlan> => {
    const res = await axiosInstance.get(`${ENDPOINT}/${id}`);
    return res.data;
  },

  create: async (data: Omit<AcademicPlan, "id">): Promise<AcademicPlan> => {
    const res = await axiosInstance.post(ENDPOINT, data);
    return res.data;
  },

  update: async (id: number, data: Partial<AcademicPlan>): Promise<AcademicPlan> => {
    const res = await axiosInstance.put(`${ENDPOINT}/${id}`, data);
    return res.data;
  },

  remove: async (id: number): Promise<void> => {
    await axiosInstance.delete(`${ENDPOINT}/${id}`);
  },
};
