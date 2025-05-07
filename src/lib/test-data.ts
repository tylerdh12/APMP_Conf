import { Service, Rubric, Evaluation } from '@/types';

export const testServices: Service[] = [
	{
		id: '1',
		name: 'AI Content Generation',
		description:
			'AI-powered content generation service for proposals and documents',
		category: 'AI',
		createdAt: new Date('2024-01-01').toISOString(),
		updatedAt: new Date('2024-01-01').toISOString(),
	},
	{
		id: '2',
		name: 'Proposal Management System',
		description:
			'Comprehensive proposal management and tracking system',
		category: 'Software',
		createdAt: new Date('2024-01-02').toISOString(),
		updatedAt: new Date('2024-01-02').toISOString(),
	},
	{
		id: '3',
		name: 'Document Review Service',
		description:
			'Professional document review and editing service',
		category: 'Services',
		createdAt: new Date('2024-01-03').toISOString(),
		updatedAt: new Date('2024-01-03').toISOString(),
	},
];

export const testRubrics: Rubric[] = [
	{
		id: '1',
		name: 'AI Service Evaluation',
		description:
			'Evaluation criteria for AI-powered services',
		criteria: [
			{
				id: '1',
				name: 'Accuracy',
				description: 'How accurate are the results?',
				weight: 0.3,
			},
			{
				id: '2',
				name: 'Speed',
				description: 'How fast is the service?',
				weight: 0.2,
			},
			{
				id: '3',
				name: 'Cost',
				description: 'Is the service cost-effective?',
				weight: 0.2,
			},
			{
				id: '4',
				name: 'User Interface',
				description: 'How user-friendly is the interface?',
				weight: 0.15,
			},
			{
				id: '5',
				name: 'Support',
				description: 'Quality of customer support',
				weight: 0.15,
			},
		],
		createdAt: new Date('2024-01-01').toISOString(),
		updatedAt: new Date('2024-01-01').toISOString(),
	},
	{
		id: '2',
		name: 'Proposal System Evaluation',
		description:
			'Evaluation criteria for proposal management systems',
		criteria: [
			{
				id: '1',
				name: 'Features',
				description: 'Completeness of features',
				weight: 0.3,
			},
			{
				id: '2',
				name: 'Integration',
				description: 'Ease of integration with other tools',
				weight: 0.2,
			},
			{
				id: '3',
				name: 'Security',
				description: 'Security features and compliance',
				weight: 0.2,
			},
			{
				id: '4',
				name: 'Performance',
				description: 'System performance and reliability',
				weight: 0.15,
			},
			{
				id: '5',
				name: 'Support',
				description: 'Quality of technical support',
				weight: 0.15,
			},
		],
		createdAt: new Date('2024-01-02').toISOString(),
		updatedAt: new Date('2024-01-02').toISOString(),
	},
];

export const testEvaluations: Evaluation[] = [
	{
		id: '1',
		serviceId: '1',
		rubricId: '1',
		scores: [
			{
				criterionId: '1',
				score: 4,
				notes: 'Very accurate results',
			},
			{
				criterionId: '2',
				score: 5,
				notes: 'Extremely fast processing',
			},
			{
				criterionId: '3',
				score: 3,
				notes: 'Reasonable pricing',
			},
			{
				criterionId: '4',
				score: 4,
				notes: 'Intuitive interface',
			},
			{
				criterionId: '5',
				score: 4,
				notes: 'Responsive support team',
			},
		],
		overallScore: 4.0,
		notes:
			'Overall excellent service with room for improvement in pricing',
		status: 'completed',
		createdAt: new Date('2024-01-15').toISOString(),
		updatedAt: new Date('2024-01-15').toISOString(),
	},
	{
		id: '2',
		serviceId: '2',
		rubricId: '2',
		scores: [
			{
				criterionId: '1',
				score: 5,
				notes: 'Comprehensive feature set',
			},
			{
				criterionId: '2',
				score: 4,
				notes: 'Good integration capabilities',
			},
			{
				criterionId: '3',
				score: 5,
				notes: 'Excellent security features',
			},
			{
				criterionId: '4',
				score: 4,
				notes: 'Reliable performance',
			},
			{
				criterionId: '5',
				score: 3,
				notes: 'Support could be more responsive',
			},
		],
		overallScore: 4.2,
		notes: 'Strong system with minor support issues',
		status: 'completed',
		createdAt: new Date('2024-01-16').toISOString(),
		updatedAt: new Date('2024-01-16').toISOString(),
	},
];
