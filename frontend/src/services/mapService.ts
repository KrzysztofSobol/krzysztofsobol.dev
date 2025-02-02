import axiosInstance from "@/axiosConfig";
import {mapData, mapParameters} from "@/types/mapType.ts";

export const getCustomMap = async (parameters: mapParameters): Promise<mapData> => {
    try{
        const response = await axiosInstance.get<mapData>(`modifiedMapData`,{params: parameters});
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch map data');
    }
};