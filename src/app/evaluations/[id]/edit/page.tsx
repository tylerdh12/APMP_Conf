import { notFound } from 'next/navigation';
import { EvaluationForm } from '@/components/evaluations/EvaluationForm';
import { apiClient } from '@/lib/api';
import { updateEvaluation } from '@/app/actions/evaluations';

interface EditEvaluationPageProps {
	params: {
		id: string;
	};
}

export default async function EditEvaluationPage({
	params,
}: EditEvaluationPageProps) {
	const [evaluation, services, rubrics] = await Promise.all(
		[
			apiClient.getEvaluation(params.id),
			apiClient.getServices(),
			apiClient.getRubrics(),
		]
	);

	if (!evaluation) {
		notFound();
	}

	const handleUpdate = async (data: any) => {
		await updateEvaluation(params.id, data);
	};

	return (
		<div className='container py-6'>
			<h1 className='text-2xl font-bold mb-6'>
				Edit Evaluation
			</h1>
			<EvaluationForm
				services={services}
				rubrics={rubrics}
				initialData={evaluation}
				onSubmit={handleUpdate}
			/>
		</div>
	);
}
