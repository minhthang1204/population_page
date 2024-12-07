import axios from "axios";
import axiosInstance from "./axiosInstance";
import apiEndpoints from "./apiConfig";

// Định nghĩa kiểu dữ liệu cho phản hồi upload file
export interface UploadResponse {
    message: string;
    file: string; // Hoặc kiểu khác tùy theo cấu trúc dữ liệu trả về từ API
  }
export const uploadFile = async (file: File): Promise<UploadResponse> => {
    const formData = new FormData();
    formData.append('file', file);
  
    const response = await axios.post<UploadResponse>(apiEndpoints.uploadFile, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  
    return response.data;
  };
  