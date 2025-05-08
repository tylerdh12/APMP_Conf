'use server';

import { redirect } from 'next/navigation';
import { apiClient, CreateEvaluationData } from '@/lib/api';
import { Score } from '@/lib/types';

function calculateOverallScore(scores: Score[]): number {
	if (scores.length === 0) return 0;
	const total = scores.reduce(
		(sum, score) => sum + score.score,
		0
	);
	return Number((total / scores.length).toFixed(2));
}

export async function createEvaluation(
	data: CreateEvaluationData
) {
	try {
		const overallScore = calculateOverallScore(data.scores);
		await apiClient.createEvaluation({
			...data,
			overallScore,
		});
		redirect('/evaluations');
	} catch (error) {
		console.error('Error creating evaluation:', error);
		throw new Error('Failed to create evaluation');
	}
}

export async function updateEvaluation(
	id: string,
	data: Partial<CreateEvaluationData>
) {
	try {
		let overallScore = undefined;
		if (data.scores) {
			overallScore = calculateOverallScore(data.scores);
		}
		await apiClient.updateEvaluation(id, {
			...data,
			...(overallScore !== undefined && { overallScore }),
		});
		redirect('/evaluations');
	} catch (error) {
		console.error('Error updating evaluation:', error);
		throw new Error('Failed to update evaluation');
	}
}
