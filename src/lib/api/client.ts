import axios from 'axios';
import { API_BASE_URL } from './config';

export const apiClient = axios.create({
	baseURL: API_BASE_URL,
	headers: {
		'Content-Type': 'application/json',
	},
});

export type ApiResponse<T> = {
	data: T;
	message?: string;
	error?: string;
};

export const handleApiError = (error: unknown): string => {
	if (axios.isAxiosError(error)) {
		return error.response?.data?.message || error.message;
	}
	return 'An unexpected error occurred';
};
