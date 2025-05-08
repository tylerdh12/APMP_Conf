import {
	Service,
	Rubric,
	Evaluation,
	Criteria,
} from './types';

export const services: Service[] = [
	{
		_id: '1',
		name: 'ProposalAI',
		description:
			'AI-powered content generation service for proposals and documents',
		type: 'AI',
		features: [
			{
				name: 'Content Generation',
				description:
					'AI-powered content generation for proposals',
				category: 'AI',
			},
		],
		pricing: {
			details: 'Subscription-based',
			model: 'Monthly',
		},
		integrationCapabilities: ['API', 'Web Interface'],
		support: {
			channels: ['Email', 'Chat'],
			sla: '24/7',
			documentation: 'Comprehensive',
		},
		createdAt: new Date('2024-01-01').toISOString(),
		updatedAt: new Date('2024-01-01').toISOString(),
	},
	{
		_id: '2',
		name: 'ProposalPro',
		description:
			'Professional proposal management and automation platform',
		type: 'Proposal',
		features: [
			{
				name: 'Proposal Management',
				description: 'End-to-end proposal management',
				category: 'Management',
			},
		],
		pricing: {
			details: 'Enterprise pricing',
			model: 'Annual',
		},
		integrationCapabilities: ['API', 'SSO'],
		support: {
			channels: ['Email', 'Phone', 'Chat'],
			sla: 'Business hours',
			documentation: 'Enterprise',
		},
		createdAt: new Date('2024-01-02').toISOString(),
		updatedAt: new Date('2024-01-02').toISOString(),
	},
	{
		_id: '3',
		name: 'DocReview',
		description:
			'Professional document review and editing service',
		type: 'Hybrid',
		features: [
			{
				name: 'Document Review',
				description:
					'AI-assisted document review and editing',
				category: 'Review',
			},
		],
		pricing: {
			details: 'Pay-per-use',
			model: 'Usage-based',
		},
		integrationCapabilities: [
			'API',
			'Web Interface',
			'Desktop App',
		],
		support: {
			channels: [
				'Email',
				'Phone',
				'Chat',
				'Support Portal',
			],
			sla: '24/7',
			documentation: 'Comprehensive',
		},
		createdAt: new Date('2024-01-03').toISOString(),
		updatedAt: new Date('2024-01-03').toISOString(),
	},
];

export const rubrics: Rubric[] = [
	{
		_id: '1',
		name: 'AI Service Evaluation',
		description:
			'Evaluation criteria for AI-powered services',
		serviceType: 'AI',
		criteria: [
			{
				_id: '1',
				name: 'AI Capabilities',
				description:
					'Assessment of AI features and capabilities',
				weight: 0.4,
				subCriteria: [
					{
						name: 'Content Generation',
						description:
							'Quality and accuracy of AI-generated content',
						scoringGuide: [
							{ score: 5, description: 'Excellent' },
							{ score: 3, description: 'Good' },
							{ score: 1, description: 'Poor' },
						],
					},
				],
			},
			{
				_id: '2',
				name: 'Integration',
				description:
					'Ease of integration with existing systems',
				weight: 0.3,
				subCriteria: [
					{
						name: 'API Support',
						description: 'Quality and documentation of API',
						scoringGuide: [
							{ score: 5, description: 'Excellent' },
							{ score: 3, description: 'Good' },
							{ score: 1, description: 'Poor' },
						],
					},
				],
			},
		],
		totalWeight: 1.0,
		createdAt: new Date('2024-01-01').toISOString(),
		updatedAt: new Date('2024-01-01').toISOString(),
	},
	{
		_id: '2',
		name: 'Proposal Service Evaluation',
		description:
			'Evaluation criteria for proposal management systems',
		serviceType: 'Proposal',
		criteria: [
			{
				_id: '1',
				name: 'Features',
				description: 'Completeness of features',
				weight: 0.4,
				subCriteria: [
					{
						name: 'Core Features',
						description:
							'Essential proposal management features',
						scoringGuide: [
							{ score: 5, description: 'Excellent' },
							{ score: 3, description: 'Good' },
							{ score: 1, description: 'Poor' },
						],
					},
				],
			},
			{
				_id: '2',
				name: 'Usability',
				description: 'Ease of use and user experience',
				weight: 0.3,
				subCriteria: [
					{
						name: 'User Interface',
						description:
							'Quality and intuitiveness of the interface',
						scoringGuide: [
							{ score: 5, description: 'Excellent' },
							{ score: 3, description: 'Good' },
							{ score: 1, description: 'Poor' },
						],
					},
				],
			},
		],
		totalWeight: 1.0,
		createdAt: new Date('2024-01-02').toISOString(),
		updatedAt: new Date('2024-01-02').toISOString(),
	},
];

export const evaluations: Evaluation[] = [
	{
		_id: '1',
		service: services[0],
		rubric: rubrics[0],
		evaluator: 'John Doe',
		scores: [
			{
				criteriaId: '1',
				score: 4,
				comments: 'Strong AI capabilities',
				evidence: 'Test results show 95% accuracy',
			},
			{
				criteriaId: '2',
				score: 3,
				comments: 'Good API documentation',
				evidence:
					'Successfully integrated with test system',
			},
		],
		overallScore: 3.5,
		strengths: [
			'Strong AI capabilities',
			'Good documentation',
		],
		weaknesses: ['Limited customization options'],
		recommendations: [
			'Add more customization options',
			'Improve API response time',
		],
		status: 'completed',
		createdAt: new Date('2024-01-15').toISOString(),
		updatedAt: new Date('2024-01-15').toISOString(),
	},
	{
		_id: '2',
		service: services[1],
		rubric: rubrics[1],
		evaluator: 'Jane Smith',
		scores: [
			{
				criteriaId: '1',
				score: 5,
				comments: 'Comprehensive feature set',
				evidence: 'All required features present',
			},
			{
				criteriaId: '2',
				score: 4,
				comments: 'Intuitive interface',
				evidence: 'User testing shows high satisfaction',
			},
		],
		overallScore: 4.5,
		strengths: [
			'Complete feature set',
			'User-friendly interface',
		],
		weaknesses: [
			'Steep learning curve for advanced features',
		],
		recommendations: [
			'Add more training materials',
			'Improve onboarding process',
		],
		status: 'completed',
		createdAt: new Date('2024-01-16').toISOString(),
		updatedAt: new Date('2024-01-16').toISOString(),
	},
];
