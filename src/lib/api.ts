import axios from 'axios';
import { Service, Rubric, Evaluation } from '@/types';
import {
	testServices,
	testRubrics,
	testEvaluations,
} from './test-data';

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
		data: Omit<Service, 'id' | 'createdAt' | 'updatedAt'>
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
		data: Omit<Rubric, 'id' | 'createdAt' | 'updatedAt'>
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
		data: Omit<Evaluation, 'id' | 'createdAt' | 'updatedAt'>
	): Promise<Evaluation | null> => {
		try {
			const response = await api.post('/evaluations', data);
			return response.data;
		} catch (error) {
			console.error('Error creating evaluation:', error);
			return null;
		}
	},

	updateEvaluation: async (
		id: string,
		data: Partial<Evaluation>
	): Promise<Evaluation | null> => {
		try {
			const response = await api.put(
				`/evaluations/${id}`,
				data
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
	return testServices;
}

export async function getService(
	id: string
): Promise<Service | undefined> {
	return testServices.find((service) => service.id === id);
}

export async function createService(
	service: Omit<Service, 'id' | 'createdAt' | 'updatedAt'>
): Promise<Service> {
	const newService: Service = {
		...service,
		id: String(testServices.length + 1),
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	};
	testServices.push(newService);
	return newService;
}

// Rubrics
export async function getRubrics(): Promise<Rubric[]> {
	return testRubrics;
}

export async function getRubric(
	id: string
): Promise<Rubric | undefined> {
	return testRubrics.find((rubric) => rubric.id === id);
}

export async function createRubric(
	rubric: Omit<Rubric, 'id' | 'createdAt' | 'updatedAt'>
): Promise<Rubric> {
	const newRubric: Rubric = {
		...rubric,
		id: String(testRubrics.length + 1),
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	};
	testRubrics.push(newRubric);
	return newRubric;
}

// Evaluations
export async function getEvaluations(): Promise<
	Evaluation[]
> {
	return testEvaluations;
}

export async function getEvaluation(
	id: string
): Promise<Evaluation | undefined> {
	return testEvaluations.find(
		(evaluation) => evaluation.id === id
	);
}

export async function createEvaluation(
	evaluation: Omit<
		Evaluation,
		'id' | 'createdAt' | 'updatedAt'
	>
): Promise<Evaluation> {
	const newEvaluation: Evaluation = {
		...evaluation,
		id: String(testEvaluations.length + 1),
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	};
	testEvaluations.push(newEvaluation);
	return newEvaluation;
}

export async function updateEvaluation(
	id: string,
	evaluation: Partial<Evaluation>
): Promise<Evaluation | undefined> {
	const index = testEvaluations.findIndex(
		(e) => e.id === id
	);
	if (index === -1) return undefined;

	const updatedEvaluation = {
		...testEvaluations[index],
		...evaluation,
		updatedAt: new Date().toISOString(),
	};
	testEvaluations[index] = updatedEvaluation;
	return updatedEvaluation;
}
