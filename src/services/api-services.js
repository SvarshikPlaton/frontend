import axios from "axios";

const BASE_URL = "http://18.194.159.42:8081/api/";

const axiosInstance = axios.create({
    baseURL: BASE_URL,
});

export const TalentsService = {
    async getTalents(page, size) {
        try {
            const response = await axiosInstance.get(
                `talents?page=${page}&size=${size}`
            );
            return response?.data?.content;
        } catch (error) {
            console.log(error);
            return [];
        }
    },
    async getCountOfPages() {
        try {
            const response = await axiosInstance.get(`talents`);
            return response?.data?.total_pages;
        } catch (error) {
            console.log(error);
            return 0;
        }
    },
    async getTalent(id) {
        try {
            const response = await axiosInstance.get(`talents/${id}/proofs`);

            return response?.data;
        } catch (error) {
            console.log(error);
            return error;
        }
    },
};
