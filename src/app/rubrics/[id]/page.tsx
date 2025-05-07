'use client';

import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { apiClient } from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/api/config';
import { Rubric } from '@/lib/types';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function RubricDetailPage({
	params,
}: {
	params: { id: string };
}) {
	const router = useRouter();
	const [rubric, setRubric] = useState<Rubric | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchRubric = async () => {
			try {
				const response = await apiClient.get(
					`${API_ENDPOINTS.RUBRICS}/${params.id}`
				);
				setRubric(response.data);
			} catch (error) {
				console.error('Error fetching rubric:', error);
				toast.error('Failed to fetch rubric');
			} finally {
				setLoading(false);
			}
		};

		fetchRubric();
	}, [params.id]);

	const handleDelete = async () => {
		if (
			!confirm(
				'Are you sure you want to delete this rubric?'
			)
		) {
			return;
		}

		try {
			await apiClient.delete(
				`${API_ENDPOINTS.RUBRICS}/${params.id}`
			);
			toast.success('Rubric deleted successfully');
			router.push('/rubrics');
		} catch (error) {
			console.error('Error deleting rubric:', error);
			toast.error('Failed to delete rubric');
		}
	};

	if (loading) {
		return <div>Loading...</div>;
	}

	if (!rubric) {
		return <div>Rubric not found</div>;
	}

	return (
		<div className='space-y-6'>
			<div className='flex items-center justify-between'>
				<div>
					<h1 className='text-3xl font-bold tracking-tight'>
						{rubric.name}
					</h1>
					<p className='text-muted-foreground'>
						{rubric.description}
					</p>
				</div>
				<div className='flex items-center space-x-2'>
					<Button
						variant='outline'
						onClick={() =>
							router.push(`/rubrics/${params.id}/edit`)
						}
					>
						Edit
					</Button>
					<Button
						variant='destructive'
						onClick={handleDelete}
					>
						Delete
					</Button>
				</div>
			</div>

			<div className='grid gap-6'>
				<Card>
					<CardHeader>
						<CardTitle>Details</CardTitle>
					</CardHeader>
					<CardContent>
						<dl className='grid grid-cols-2 gap-4'>
							<div>
								<dt className='text-sm font-medium text-muted-foreground'>
									Service Type
								</dt>
								<dd>{rubric.serviceType}</dd>
							</div>
							<div>
								<dt className='text-sm font-medium text-muted-foreground'>
									Total Weight
								</dt>
								<dd>{rubric.totalWeight}</dd>
							</div>
							<div>
								<dt className='text-sm font-medium text-muted-foreground'>
									Created
								</dt>
								<dd>
									{new Date(
										rubric.createdAt
									).toLocaleDateString()}
								</dd>
							</div>
							<div>
								<dt className='text-sm font-medium text-muted-foreground'>
									Last Updated
								</dt>
								<dd>
									{new Date(
										rubric.updatedAt
									).toLocaleDateString()}
								</dd>
							</div>
						</dl>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Criteria</CardTitle>
					</CardHeader>
					<CardContent>
						<div className='space-y-6'>
							{rubric.criteria.map((criterion, index) => (
								<div
									key={index}
									className='space-y-4'
								>
									<div>
										<h3 className='font-medium'>
											{criterion.name}
										</h3>
										<p className='text-sm text-muted-foreground'>
											{criterion.description}
										</p>
										<p className='text-sm text-muted-foreground'>
											Weight: {criterion.weight}
										</p>
									</div>
									{criterion.subCriteria &&
										criterion.subCriteria.length > 0 && (
											<div className='ml-4 space-y-2'>
												{criterion.subCriteria.map(
													(subCriterion, subIndex) => (
														<div
															key={subIndex}
															className='space-y-2'
														>
															<h4 className='text-sm font-medium'>
																{subCriterion.name}
															</h4>
															<div className='space-y-1'>
																{subCriterion.scoringGuide.map(
																	(guide, guideIndex) => (
																		<div
																			key={guideIndex}
																			className='text-sm text-muted-foreground'
																		>
																			<span className='font-medium'>
																				{guide.score}:
																			</span>{' '}
																			{guide.description}
																		</div>
																	)
																)}
															</div>
														</div>
													)
												)}
											</div>
										)}
								</div>
							))}
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
