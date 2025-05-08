import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	Evaluation,
	Service,
	Rubric,
	Score,
} from '@/lib/types';
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
					<Link
						href={`/evaluations/${evaluation._id}/edit`}
					>
						<Button>Edit Evaluation</Button>
					</Link>
					<Link href='/evaluations'>
						<Button variant='outline'>Back to List</Button>
					</Link>
				</div>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Service Information</CardTitle>
				</CardHeader>
				<CardContent className='space-y-4'>
					<div>
						<h3 className='font-medium'>Name</h3>
						<p>{service.name}</p>
					</div>
					<div>
						<h3 className='font-medium'>Description</h3>
						<p>{service.description}</p>
					</div>
					<div>
						<h3 className='font-medium'>Type</h3>
						<p>{service.type}</p>
					</div>
					<div>
						<h3 className='font-medium'>Support</h3>
						<p>{service.support.channels.join(', ')}</p>
					</div>
					<div>
						<h3 className='font-medium'>Status</h3>
						<p>{evaluation.status}</p>
					</div>
					<div>
						<h3 className='font-medium'>Created</h3>
						<p>{formatDate(evaluation.createdAt)}</p>
					</div>
					<div>
						<h3 className='font-medium'>Last Updated</h3>
						<p>{formatDate(evaluation.updatedAt)}</p>
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Criteria Scores</CardTitle>
				</CardHeader>
				<CardContent className='space-y-6'>
					{rubric.criteria.map((criterion, index) => {
						const score = evaluation.scores.find(
							(s) => s.criteriaId === criterion._id
						);
						return (
							<div
								key={index}
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
							<p>{evaluation.strengths.join('\n')}</p>
						</div>
					)}
					{evaluation.weaknesses && (
						<div>
							<h3 className='font-medium'>Weaknesses</h3>
							<p>{evaluation.weaknesses.join('\n')}</p>
						</div>
					)}
					{evaluation.recommendations && (
						<div>
							<h3 className='font-medium'>
								Recommendations
							</h3>
							<p>{evaluation.recommendations.join('\n')}</p>
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
}
