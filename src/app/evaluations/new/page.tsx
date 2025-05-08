'use client';

import { EvaluationForm } from '@/components/evaluations/EvaluationForm';
import { apiClient } from '@/lib/api';
import { createEvaluation } from '@/app/actions/evaluations';

export default async function NewEvaluationPage() {
	const [services, rubrics] = await Promise.all([
		apiClient.getServices(),
		apiClient.getRubrics(),
	]);

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
