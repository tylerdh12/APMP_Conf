export interface Service {
	_id: string;
	id?: string; // For backward compatibility
	name: string;
	description: string;
	type: 'AI' | 'Proposal' | 'Hybrid';
	features: {
		name: string;
		description: string;
		category: string;
	}[];
	pricing: {
		details: string;
		model: string;
	};
	integrationCapabilities: string[];
	support: {
		channels: string[];
		sla: string;
		documentation: string;
	};
	createdAt: string;
	updatedAt: string;
}

export interface Criteria {
	_id: string;
	id?: string; // For backward compatibility
	name: string;
	description: string;
	weight: number;
	subCriteria: {
		name: string;
		description: string;
		scoringGuide: {
			score: number;
			description: string;
		}[];
	}[];
}

export interface Rubric {
	_id: string;
	id?: string; // For backward compatibility
	name: string;
	description: string;
	serviceType: 'AI' | 'Proposal' | 'Hybrid';
	criteria: Criteria[];
	totalWeight: number;
	createdAt: string;
	updatedAt: string;
}

export interface Score {
	criteriaId: string;
	score: number;
	comments?: string;
	evidence?: string;
}

export interface Evaluation {
	_id: string;
	id?: string; // For backward compatibility
	service: Service;
	serviceId?: string; // For backward compatibility
	rubric: Rubric;
	rubricId?: string; // For backward compatibility
	evaluator: string;
	scores: Score[];
	overallScore: number;
	strengths: string[];
	weaknesses: string[];
	recommendations: string[];
	notes?: string; // For backward compatibility
	status: 'draft' | 'in_progress' | 'completed';
	createdAt: string;
	updatedAt: string;
}
