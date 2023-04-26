import axios from "axios";
import { decode as base64_decode, encode as base64_encode } from "base-64";
import { useCookies } from "react-cookie";

const BASE_URL = "http://18.194.159.42:8081/api/v2/";

const axiosInstance = axios.create({
    baseURL: BASE_URL,
});

export const TalentsService = {
    async getTalents(page, size) {
        try {
            const response = await axiosInstance.get(
                `talents?page=${page}&size=${size}`
            );
            return response?.data;
        } catch (error) {
            console.log(error);
            return [];
        }
    },

    async getTalent(id, token) {
        const headers = {
            Authorization: `Bearer ${token}`,
        };
        try {
            const response = await axiosInstance.get(`talents/${id}`, {
                headers,
            });
            return response?.data;
        } catch (error) {
            console.log(error);
            return error;
        }
    },
    async login(login, password) {
        const authString = `${login}:${password}`;
        const encodedAuthString = base64_encode(authString);
        const headers = {
            Authorization: `Basic ${encodedAuthString}`,
        };
        try {
            const response = await axiosInstance.post(
                `talents/login`,
                {},
                { headers }
            );
            return response?.data;
        } catch (error) {
            throw error;
        }
    },
    async register(newUser) {
        try {
            const response = await axiosInstance.post(`talents/register`, {
                ...newUser,
            });
            return response?.data;
        } catch (error) {
            throw error;
        }
    },
    async getNewToken(token) {
        const headers = {
            Authorization: `Bearer ${token}`,
        };
        try {
            const response = await axiosInstance.post(
                "talents/login",
                {},
                { headers }
            );
            console.log(response?.data?.token);
            return response?.data?.token;
        } catch (error) {
            console.log(error);
            return error;
        }
    },
    async getAllProofs(page = 0, size = 5, orderBy = "asc") {
        try {
            const response = await axiosInstance.get(
                `talents/proofs?page=${page}&size=${size}&order-by=${orderBy}`
            );

            return response?.data;
        } catch (error) {
            console.log(error);
            return error;
        }
    },
    async getProofs(id, token) {
        const headers = {
            Authorization: `Bearer ${token}`,
        };
        try {
            const response = await axiosInstance.get(`talents/${id}/proofs`, {
                headers,
            });

            return response?.data.proofs.content;
        } catch (error) {
            console.log(error);
            return error;
        }
    },
    async editTalent(id, editedUser, token) {
        const headers = {
            Authorization: `Bearer ${token}`,
        };
        try {
            const response = await axiosInstance.patch(
                `talents/${id}`,
                editedUser,
                {
                    headers,
                }
            );

            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
    async editProof(id, idProof, editedProof, token) {
        const headers = {
            Authorization: `Bearer ${token}`,
        };
        try {
            const response = await axiosInstance.patch(
                `talents/${id}/proofs/${idProof}`,
                editedProof,
                {
                    headers,
                }
            );

            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
    async deleteTalent(id, token) {
        const headers = {
            Authorization: `Bearer ${token}`,
        };
        const response = await axiosInstance.delete(`talents/${id}`, {
            headers,
        });
        return response;
    },
    async addProof(proof, id, token) {
        const headers = {
            Authorization: `Bearer ${token}`,
        };
        const response = await axiosInstance.post(
            `talents/${id}/proofs`,
            proof,
            {
                headers,
            }
        );
        return response;
    },
};
