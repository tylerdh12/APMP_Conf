'use client';

import { RubricForm } from '@/components/rubrics/rubric-form';
import { apiClient } from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/api/config';
import { Rubric } from '@/lib/types';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function EditRubricPage({
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

	const handleSubmit = async (data: any) => {
		try {
			await apiClient.put(
				`${API_ENDPOINTS.RUBRICS}/${params.id}`,
				data
			);
			toast.success('Rubric updated successfully');
			router.push(`/rubrics/${params.id}`);
		} catch (error) {
			console.error('Error updating rubric:', error);
			toast.error('Failed to update rubric');
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
			<div>
				<h1 className='text-3xl font-bold tracking-tight'>
					Edit Rubric
				</h1>
				<p className='text-muted-foreground'>
					Update the evaluation rubric
				</p>
			</div>
			<div className='max-w-2xl'>
				<RubricForm
					onSubmit={handleSubmit}
					initialData={rubric}
				/>
			</div>
		</div>
	);
}
