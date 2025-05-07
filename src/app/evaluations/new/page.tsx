'use client';

import { EvaluationForm } from '@/components/evaluations/EvaluationForm';
import { apiClient } from '@/lib/api';
import { redirect } from 'next/navigation';

export default async function NewEvaluationPage() {
	const [services, rubrics] = await Promise.all([
		apiClient.getServices(),
		apiClient.getRubrics(),
	]);

	async function createEvaluation(data: any) {
		'use server';
		try {
			await apiClient.createEvaluation(data);
			redirect('/evaluations');
		} catch (error) {
			console.error('Error creating evaluation:', error);
			throw new Error('Failed to create evaluation');
		}
	}

	return (
		<div className='container py-6'>
			<h1 className='text-2xl font-bold mb-6'>
				New Evaluation
			</h1>
			<EvaluationForm
				services={services}
				rubrics={rubrics}
				onSubmit={createEvaluation}
			/>
		</div>
	);
}
