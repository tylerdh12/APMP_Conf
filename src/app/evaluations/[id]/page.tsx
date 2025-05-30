import { EvaluationDetail } from '@/components/evaluations/EvaluationDetail';
import { apiClient } from '@/lib/api';
import { notFound } from 'next/navigation';

interface EvaluationPageProps {
	params: {
		id: string;
	};
}

export default async function EvaluationPage({
	params,
}: EvaluationPageProps) {
	const [evaluation, service, rubric] = await Promise.all([
		apiClient.getEvaluation(params.id),
		apiClient.getService(params.id),
		apiClient.getRubric(params.id),
	]);

	if (!evaluation || !service || !rubric) {
		notFound();
	}

	return (
		<div className='container py-6'>
			<EvaluationDetail
				evaluation={evaluation}
				service={service}
				rubric={rubric}
			/>
		</div>
	);
}
