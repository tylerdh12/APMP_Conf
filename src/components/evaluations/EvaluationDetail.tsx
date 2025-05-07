import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Evaluation, Service, Rubric } from '@/types';
import { formatDate } from '@/lib/utils';

interface EvaluationDetailProps {
	evaluation: Evaluation;
	service: Service;
	rubric: Rubric;
}

export function EvaluationDetail({
	evaluation,
	service,
	rubric,
}: EvaluationDetailProps) {
	return (
		<div className='space-y-6'>
			<div className='flex justify-between items-center'>
				<h2 className='text-2xl font-bold'>
					Evaluation Details
				</h2>
				<div className='flex space-x-2'>
					<Link href={`/evaluations/${evaluation.id}/edit`}>
						<Button>Edit Evaluation</Button>
					</Link>
					<Link href='/evaluations'>
						<Button variant='outline'>Back to List</Button>
					</Link>
				</div>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Basic Information</CardTitle>
				</CardHeader>
				<CardContent className='space-y-4'>
					<div className='grid grid-cols-2 gap-4'>
						<div>
							<h3 className='font-medium'>Service</h3>
							<p>{service.name}</p>
						</div>
						<div>
							<h3 className='font-medium'>Rubric</h3>
							<p>{rubric.name}</p>
						</div>
						<div>
							<h3 className='font-medium'>Status</h3>
							<span
								className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
									evaluation.status === 'completed'
										? 'bg-green-100 text-green-800'
										: evaluation.status === 'in_progress'
										? 'bg-yellow-100 text-yellow-800'
										: 'bg-gray-100 text-gray-800'
								}`}
							>
								{evaluation.status}
							</span>
						</div>
						<div>
							<h3 className='font-medium'>Created</h3>
							<p>{formatDate(evaluation.createdAt)}</p>
						</div>
						<div>
							<h3 className='font-medium'>Updated</h3>
							<p>{formatDate(evaluation.updatedAt)}</p>
						</div>
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Criteria Scores</CardTitle>
				</CardHeader>
				<CardContent className='space-y-6'>
					{rubric.criteria.map((criterion) => {
						const score = evaluation.scores.find(
							(s) => s.criterionId === criterion.id
						);
						return (
							<div
								key={criterion.id}
								className='space-y-2'
							>
								<h3 className='font-medium'>
									{criterion.name}
								</h3>
								<div className='grid grid-cols-2 gap-4'>
									<div>
										<h4 className='text-sm font-medium'>
											Score
										</h4>
										<p>{score?.score || 'Not scored'}</p>
									</div>
									<div>
										<h4 className='text-sm font-medium'>
											Weight
										</h4>
										<p>{criterion.weight}</p>
									</div>
									{score?.comments && (
										<div className='col-span-2'>
											<h4 className='text-sm font-medium'>
												Comments
											</h4>
											<p>{score.comments}</p>
										</div>
									)}
									{score?.evidence && (
										<div className='col-span-2'>
											<h4 className='text-sm font-medium'>
												Evidence
											</h4>
											<p>{score.evidence}</p>
										</div>
									)}
								</div>
							</div>
						);
					})}
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Additional Information</CardTitle>
				</CardHeader>
				<CardContent className='space-y-4'>
					{evaluation.strengths && (
						<div>
							<h3 className='font-medium'>Strengths</h3>
							<p>{evaluation.strengths}</p>
						</div>
					)}
					{evaluation.weaknesses && (
						<div>
							<h3 className='font-medium'>Weaknesses</h3>
							<p>{evaluation.weaknesses}</p>
						</div>
					)}
					{evaluation.recommendations && (
						<div>
							<h3 className='font-medium'>
								Recommendations
							</h3>
							<p>{evaluation.recommendations}</p>
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
}
