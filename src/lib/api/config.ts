export const API_BASE_URL =
	process.env.NEXT_PUBLIC_API_URL ||
	'http://localhost:5001/api';

export const API_ENDPOINTS = {
	SERVICES: `${API_BASE_URL}/services`,
	RUBRICS: `${API_BASE_URL}/rubrics`,
	EVALUATIONS: `${API_BASE_URL}/evaluations`,
} as const;

export type ApiEndpoint = keyof typeof API_ENDPOINTS;
