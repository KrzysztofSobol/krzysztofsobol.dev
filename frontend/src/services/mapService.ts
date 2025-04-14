import axiosInstance from "@/axiosConfig";
import { mapData, mapParameters } from "@/types/mapType.ts";

export const getCustomMap = async (parameters: mapParameters): Promise<mapData> => {
    const response = await axiosInstance.get<mapData>(`modifiedMapData`, { params: parameters });

    if (response.data) {
        response.data = decodeMapData(response.data);
    }

    return response.data;
};

export const decodeMapData = (encodedLines: string[]): string[] => {
    return encodedLines.map(line => {
        if (!line) return '';

        let decoded = '';
        let i = 0;

        while (i < line.length) {
            if (/\d/.test(line[i])) {
                let count = '';
                while (i < line.length && /\d/.test(line[i])) {
                    count += line[i];
                    i++;
                }

                const char = line[i];
                decoded += char.repeat(parseInt(count));
                i++;
            } else {
                decoded += line[i];
                i++;
            }
        }

        return decoded;
    });
};