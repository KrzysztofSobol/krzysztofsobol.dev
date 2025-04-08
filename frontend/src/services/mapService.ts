import axiosInstance from "@/axiosConfig";
import { mapData, mapParameters } from "@/types/mapType.ts";

export const getCustomMap = async (parameters: mapParameters): Promise<mapData> => {
    const response = await axiosInstance.get<mapData>(`modifiedMapData`, { params: parameters });
    return response.data;
};