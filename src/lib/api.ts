import axios from 'axios';
import { Service, Rubric, Evaluation } from '@/lib/types';
import {
	services,
	rubrics,
	evaluations,
} from './test-data';

export type CreateEvaluationData = {
	service: {
		_id: string;
		name: string;
	};
	rubric: {
		_id: string;
		name: string;
	};
	evaluator: string;
	scores: {
		criteriaId: string;
		score: number;
		comments?: string;
		evidence?: string;
	}[];
	strengths: string[];
	weaknesses: string[];
	recommendations: string[];
	status: 'draft' | 'in_progress' | 'completed';
	overallScore?: number;
};

type ApiEvaluation = Omit<
	Evaluation,
	'service' | 'rubric'
> & {
	service: string;
	rubric: string;
};

const api = axios.create({
	baseURL:
		process.env.NEXT_PUBLIC_API_URL ||
		'http://localhost:3001',
	headers: {
		'Content-Type': 'application/json',
	},
});

// Add response interceptor for error handling
api.interceptors.response.use(
	(response) => response,
	(error) => {
		console.error('API Error:', error);
		return Promise.reject(error);
	}
);

export const apiClient = {
	// Services
	getServices: async (): Promise<Service[]> => {
		try {
			const response = await api.get('/services');
			return response.data;
		} catch (error) {
			console.error('Error fetching services:', error);
			return [];
		}
	},

	getService: async (
		id: string
	): Promise<Service | null> => {
		try {
			const response = await api.get(`/services/${id}`);
			return response.data;
		} catch (error) {
			console.error(`Error fetching service ${id}:`, error);
			return null;
		}
	},

	createService: async (
		data: Omit<Service, '_id' | 'createdAt' | 'updatedAt'>
	): Promise<Service | null> => {
		try {
			const response = await api.post('/services', data);
			return response.data;
		} catch (error) {
			console.error('Error creating service:', error);
			return null;
		}
	},

	updateService: async (
		id: string,
		data: Partial<Service>
	): Promise<Service | null> => {
		try {
			const response = await api.put(
				`/services/${id}`,
				data
			);
			return response.data;
		} catch (error) {
			console.error(`Error updating service ${id}:`, error);
			return null;
		}
	},

	deleteService: async (id: string): Promise<boolean> => {
		try {
			await api.delete(`/services/${id}`);
			return true;
		} catch (error) {
			console.error(`Error deleting service ${id}:`, error);
			return false;
		}
	},

	// Rubrics
	getRubrics: async (): Promise<Rubric[]> => {
		try {
			const response = await api.get('/rubrics');
			return response.data;
		} catch (error) {
			console.error('Error fetching rubrics:', error);
			return [];
		}
	},

	getRubric: async (id: string): Promise<Rubric | null> => {
		try {
			const response = await api.get(`/rubrics/${id}`);
			return response.data;
		} catch (error) {
			console.error(`Error fetching rubric ${id}:`, error);
			return null;
		}
	},

	createRubric: async (
		data: Omit<Rubric, '_id' | 'createdAt' | 'updatedAt'>
	): Promise<Rubric | null> => {
		try {
			const response = await api.post('/rubrics', data);
			return response.data;
		} catch (error) {
			console.error('Error creating rubric:', error);
			return null;
		}
	},

	updateRubric: async (
		id: string,
		data: Partial<Rubric>
	): Promise<Rubric | null> => {
		try {
			const response = await api.put(
				`/rubrics/${id}`,
				data
			);
			return response.data;
		} catch (error) {
			console.error(`Error updating rubric ${id}:`, error);
			return null;
		}
	},

	deleteRubric: async (id: string): Promise<boolean> => {
		try {
			await api.delete(`/rubrics/${id}`);
			return true;
		} catch (error) {
			console.error(`Error deleting rubric ${id}:`, error);
			return false;
		}
	},

	// Evaluations
	getEvaluations: async (): Promise<Evaluation[]> => {
		try {
			const response = await api.get('/evaluations');
			return response.data;
		} catch (error) {
			console.error('Error fetching evaluations:', error);
			return [];
		}
	},

	getEvaluation: async (
		id: string
	): Promise<Evaluation | null> => {
		try {
			const response = await api.get(`/evaluations/${id}`);
			return response.data;
		} catch (error) {
			console.error(
				`Error fetching evaluation ${id}:`,
				error
			);
			return null;
		}
	},

	createEvaluation: async (
		data: CreateEvaluationData
	): Promise<Evaluation | null> => {
		try {
			// Transform the data to match the API's expected format
			const apiData: Omit<
				ApiEvaluation,
				'_id' | 'createdAt' | 'updatedAt'
			> = {
				service: data.service._id,
				rubric: data.rubric._id,
				evaluator: data.evaluator,
				scores: data.scores,
				overallScore: data.overallScore || 0,
				strengths: data.strengths,
				weaknesses: data.weaknesses,
				recommendations: data.recommendations,
				status: data.status,
			};

			const response = await api.post(
				'/evaluations',
				apiData
			);
			return response.data;
		} catch (error) {
			console.error('Error creating evaluation:', error);
			return null;
		}
	},

	updateEvaluation: async (
		id: string,
		data: Partial<CreateEvaluationData>
	): Promise<Evaluation | null> => {
		try {
			// Transform the data to match the API's expected format
			const apiData: Partial<ApiEvaluation> = {
				...(data.service && { service: data.service._id }),
				...(data.rubric && { rubric: data.rubric._id }),
				...(data.evaluator && {
					evaluator: data.evaluator,
				}),
				...(data.scores && { scores: data.scores }),
				...(data.overallScore && {
					overallScore: data.overallScore,
				}),
				...(data.strengths && {
					strengths: data.strengths,
				}),
				...(data.weaknesses && {
					weaknesses: data.weaknesses,
				}),
				...(data.recommendations && {
					recommendations: data.recommendations,
				}),
				...(data.status && { status: data.status }),
			};

			const response = await api.put(
				`/evaluations/${id}`,
				apiData
			);
			return response.data;
		} catch (error) {
			console.error(
				`Error updating evaluation ${id}:`,
				error
			);
			return null;
		}
	},

	deleteEvaluation: async (
		id: string
	): Promise<boolean> => {
		try {
			await api.delete(`/evaluations/${id}`);
			return true;
		} catch (error) {
			console.error(
				`Error deleting evaluation ${id}:`,
				error
			);
			return false;
		}
	},
};

// Services
export async function getServices(): Promise<Service[]> {
	return services;
}

export async function getService(
	id: string
): Promise<Service | undefined> {
	return services.find((service) => service._id === id);
}

export async function createService(
	service: Omit<Service, '_id' | 'createdAt' | 'updatedAt'>
): Promise<Service> {
	const newService: Service = {
		...service,
		_id: String(services.length + 1),
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	};
	services.push(newService);
	return newService;
}

// Rubrics
export async function getRubrics(): Promise<Rubric[]> {
	return rubrics;
}

export async function getRubric(
	id: string
): Promise<Rubric | undefined> {
	return rubrics.find((rubric) => rubric._id === id);
}

export async function createRubric(
	rubric: Omit<Rubric, '_id' | 'createdAt' | 'updatedAt'>
): Promise<Rubric> {
	const newRubric: Rubric = {
		...rubric,
		_id: String(rubrics.length + 1),
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	};
	rubrics.push(newRubric);
	return newRubric;
}

// Evaluations
export async function getEvaluations(): Promise<
	Evaluation[]
> {
	return evaluations;
}

export async function getEvaluation(
	id: string
): Promise<Evaluation | undefined> {
	return evaluations.find(
		(evaluation) => evaluation._id === id
	);
}

export async function createEvaluation(
	evaluation: Omit<
		Evaluation,
		'_id' | 'createdAt' | 'updatedAt'
	>
): Promise<Evaluation> {
	const newEvaluation: Evaluation = {
		...evaluation,
		_id: String(evaluations.length + 1),
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	};
	evaluations.push(newEvaluation);
	return newEvaluation;
}

export async function updateEvaluation(
	id: string,
	evaluation: Partial<Evaluation>
): Promise<Evaluation | undefined> {
	const index = evaluations.findIndex((e) => e._id === id);
	if (index === -1) return undefined;

	const updatedEvaluation = {
		...evaluations[index],
		...evaluation,
		updatedAt: new Date().toISOString(),
	};
	evaluations[index] = updatedEvaluation;
	return updatedEvaluation;
}
