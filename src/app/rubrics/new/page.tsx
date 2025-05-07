'use client';

import { RubricForm } from '@/components/rubrics/rubric-form';
import { apiClient } from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/api/config';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function NewRubricPage() {
	const router = useRouter();

	const handleSubmit = async (data: any) => {
		try {
			await apiClient.post(API_ENDPOINTS.RUBRICS, data);
			toast.success('Rubric created successfully');
			router.push('/rubrics');
		} catch (error) {
			console.error('Error creating rubric:', error);
			toast.error('Failed to create rubric');
		}
	};

	return (
		<div className='space-y-6'>
			<div>
				<h1 className='text-3xl font-bold tracking-tight'>
					New Rubric
				</h1>
				<p className='text-muted-foreground'>
					Create a new evaluation rubric
				</p>
			</div>
			<div className='max-w-2xl'>
				<RubricForm onSubmit={handleSubmit} />
			</div>
		</div>
	);
}
