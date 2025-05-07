export interface Service {
	id: string;
	name: string;
	description: string;
	category: string;
	createdAt: string;
	updatedAt: string;
}

export interface Criterion {
	id: string;
	name: string;
	description: string;
	weight: number;
}

export interface Rubric {
	id: string;
	name: string;
	description: string;
	criteria: Criterion[];
	createdAt: string;
	updatedAt: string;
}

export interface Score {
	criterionId: string;
	score: number;
	notes: string;
}

export interface Evaluation {
	id: string;
	serviceId: string;
	rubricId: string;
	scores: Score[];
	overallScore: number;
	notes: string;
	status: 'draft' | 'in_progress' | 'completed';
	createdAt: string;
	updatedAt: string;
}
