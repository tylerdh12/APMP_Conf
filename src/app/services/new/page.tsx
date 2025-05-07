'use client';

import { ServiceForm } from '@/components/services/service-form';
import { apiClient } from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/api/config';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function NewServicePage() {
	const router = useRouter();

	const handleSubmit = async (data: any) => {
		try {
			await apiClient.post(API_ENDPOINTS.SERVICES, data);
			toast.success('Service created successfully');
			router.push('/services');
		} catch (error) {
			console.error('Error creating service:', error);
			toast.error('Failed to create service');
		}
	};

	return (
		<div className='space-y-6'>
			<div>
				<h1 className='text-3xl font-bold tracking-tight'>
					New Service
				</h1>
				<p className='text-muted-foreground'>
					Add a new service to the system
				</p>
			</div>
			<div className='max-w-2xl'>
				<ServiceForm onSubmit={handleSubmit} />
			</div>
		</div>
	);
}
