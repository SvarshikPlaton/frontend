import axios from "axios";

const BASE_URL = "http://18.194.159.42:8081/api/"

const axiosInstance = axios.create({
    baseURL: BASE_URL
});

export const TalentsService = {
    async getTalents(page, size) {
        const response = await axiosInstance.get(`talents?page=${page}&size=${size}`);
        return response?.data?.content;
    },
	async getCountOfPages() {
        const response = await axiosInstance.get(`talents`);
        return response?.data?.total_pages;
    }
};