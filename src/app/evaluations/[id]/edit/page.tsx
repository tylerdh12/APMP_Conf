import { EvaluationForm } from '@/components/evaluations/EvaluationForm';
import { apiClient } from '@/lib/api';
import { notFound, redirect } from 'next/navigation';

interface EditEvaluationPageProps {
	params: {
		id: string;
	};
}

export default async function EditEvaluationPage({
	params,
}: EditEvaluationPageProps) {
	try {
		const [evaluation, services, rubrics] =
			await Promise.all([
				apiClient.getEvaluation(params.id),
				apiClient.getServices(),
				apiClient.getRubrics(),
			]);

		async function updateEvaluation(data: any) {
			'use server';
			try {
				await apiClient.updateEvaluation(params.id, data);
				redirect('/evaluations');
			} catch (error) {
				console.error('Error updating evaluation:', error);
				throw new Error('Failed to update evaluation');
			}
		}

		return (
			<div className='container py-6'>
				<h1 className='text-2xl font-bold mb-6'>
					Edit Evaluation
				</h1>
				<EvaluationForm
					services={services}
					rubrics={rubrics}
					onSubmit={updateEvaluation}
					initialData={evaluation}
				/>
			</div>
		);
	} catch (error) {
		notFound();
	}
}
