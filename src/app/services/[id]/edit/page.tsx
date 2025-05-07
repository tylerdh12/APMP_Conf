'use client';

import { ServiceForm } from '@/components/services/service-form';
import { apiClient } from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/api/config';
import { Service } from '@/lib/types';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function EditServicePage({
	params,
}: {
	params: { id: string };
}) {
	const router = useRouter();
	const [service, setService] = useState<Service | null>(
		null
	);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchService = async () => {
			try {
				const response = await apiClient.get(
					`${API_ENDPOINTS.SERVICES}/${params.id}`
				);
				setService(response.data);
			} catch (error) {
				console.error('Error fetching service:', error);
				toast.error('Failed to fetch service details');
			} finally {
				setIsLoading(false);
			}
		};

		fetchService();
	}, [params.id]);

	const handleSubmit = async (data: any) => {
		try {
			await apiClient.put(
				`${API_ENDPOINTS.SERVICES}/${params.id}`,
				data
			);
			toast.success('Service updated successfully');
			router.push(`/services/${params.id}`);
		} catch (error) {
			console.error('Error updating service:', error);
			toast.error('Failed to update service');
		}
	};

	if (isLoading) {
		return (
			<div className='flex items-center justify-center min-h-[400px]'>
				<p className='text-muted-foreground'>
					Loading service details...
				</p>
			</div>
		);
	}

	if (!service) {
		return (
			<div className='flex items-center justify-center min-h-[400px]'>
				<p className='text-muted-foreground'>
					Service not found
				</p>
			</div>
		);
	}

	return (
		<div className='space-y-6'>
			<div>
				<h1 className='text-3xl font-bold tracking-tight'>
					Edit Service
				</h1>
				<p className='text-muted-foreground'>
					Update the service details
				</p>
			</div>
			<div className='max-w-2xl'>
				<ServiceForm
					onSubmit={handleSubmit}
					initialData={service}
				/>
			</div>
		</div>
	);
}
