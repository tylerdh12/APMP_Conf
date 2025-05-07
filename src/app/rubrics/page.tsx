'use client';

import { Button } from '@/components/ui/button';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { apiClient } from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/api/config';
import { Rubric } from '@/lib/types';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function RubricsPage() {
	const router = useRouter();
	const [rubrics, setRubrics] = useState<Rubric[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchRubrics = async () => {
			try {
				const response = await apiClient.get(
					API_ENDPOINTS.RUBRICS
				);
				setRubrics(response.data);
			} catch (error) {
				console.error('Error fetching rubrics:', error);
				toast.error('Failed to fetch rubrics');
			} finally {
				setLoading(false);
			}
		};

		fetchRubrics();
	}, []);

	const handleDelete = async (id: string) => {
		try {
			await apiClient.delete(
				`${API_ENDPOINTS.RUBRICS}/${id}`
			);
			setRubrics(
				rubrics.filter((rubric) => rubric._id !== id)
			);
			toast.success('Rubric deleted successfully');
		} catch (error) {
			console.error('Error deleting rubric:', error);
			toast.error('Failed to delete rubric');
		}
	};

	return (
		<div className='space-y-6'>
			<div className='flex items-center justify-between'>
				<div>
					<h1 className='text-3xl font-bold tracking-tight'>
						Rubrics
					</h1>
					<p className='text-muted-foreground'>
						Manage your evaluation rubrics
					</p>
				</div>
				<Button onClick={() => router.push('/rubrics/new')}>
					Add Rubric
				</Button>
			</div>

			<div className='rounded-md border'>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Name</TableHead>
							<TableHead>Service Type</TableHead>
							<TableHead>Criteria Count</TableHead>
							<TableHead>Total Weight</TableHead>
							<TableHead>Created</TableHead>
							<TableHead>Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{loading ? (
							<TableRow>
								<TableCell
									colSpan={5}
									className='text-center'
								>
									Loading rubrics...
								</TableCell>
							</TableRow>
						) : rubrics.length === 0 ? (
							<TableRow>
								<TableCell
									colSpan={5}
									className='text-center'
								>
									No rubrics found. Add your first rubric to
									get started.
								</TableCell>
							</TableRow>
						) : (
							rubrics.map((rubric) => (
								<TableRow
									key={rubric._id}
									className='cursor-pointer'
									onClick={() =>
										router.push(`/rubrics/${rubric._id}`)
									}
								>
									<TableCell>{rubric.name}</TableCell>
									<TableCell>
										{rubric.serviceType}
									</TableCell>
									<TableCell>
										{rubric.criteria.length} criteria
									</TableCell>
									<TableCell>
										{rubric.totalWeight}
									</TableCell>
									<TableCell>
										{new Date(
											rubric.createdAt
										).toLocaleDateString()}
									</TableCell>
									<TableCell>
										<div className='flex items-center space-x-2'>
											<Button
												variant='outline'
												size='sm'
												onClick={(e) => {
													e.stopPropagation();
													router.push(
														`/rubrics/${rubric._id}/edit`
													);
												}}
											>
												Edit
											</Button>
											<Button
												variant='destructive'
												size='sm'
												onClick={(e) => {
													e.stopPropagation();
													handleDelete(rubric._id);
												}}
											>
												Delete
											</Button>
										</div>
									</TableCell>
								</TableRow>
							))
						)}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}
