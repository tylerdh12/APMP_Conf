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
import { Service } from '@/lib/types';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function ServicesPage() {
	const router = useRouter();
	const [services, setServices] = useState<Service[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchServices = async () => {
			try {
				const response = await apiClient.get(
					API_ENDPOINTS.SERVICES
				);
				setServices(response.data);
			} catch (error) {
				console.error('Error fetching services:', error);
				toast.error('Failed to fetch services');
			} finally {
				setIsLoading(false);
			}
		};

		fetchServices();
	}, []);

	const handleDelete = async (id: string) => {
		try {
			await apiClient.delete(
				`${API_ENDPOINTS.SERVICES}/${id}`
			);
			setServices(
				services.filter((service) => service._id !== id)
			);
			toast.success('Service deleted successfully');
		} catch (error) {
			console.error('Error deleting service:', error);
			toast.error('Failed to delete service');
		}
	};

	return (
		<div className='space-y-6'>
			<div className='flex items-center justify-between'>
				<div>
					<h1 className='text-3xl font-bold tracking-tight'>
						Services
					</h1>
					<p className='text-muted-foreground'>
						Manage your AI and proposal-related services
					</p>
				</div>
				<Button
					onClick={() => router.push('/services/new')}
				>
					Add Service
				</Button>
			</div>
			<div className='rounded-md border'>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Name</TableHead>
							<TableHead>Type</TableHead>
							<TableHead>Features</TableHead>
							<TableHead>Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{isLoading ? (
							<TableRow>
								<TableCell
									colSpan={4}
									className='text-center'
								>
									Loading services...
								</TableCell>
							</TableRow>
						) : services.length === 0 ? (
							<TableRow>
								<TableCell
									colSpan={4}
									className='text-center'
								>
									No services found. Add your first service
									to get started.
								</TableCell>
							</TableRow>
						) : (
							services.map((service) => (
								<TableRow key={service._id}>
									<TableCell>{service.name}</TableCell>
									<TableCell>{service.type}</TableCell>
									<TableCell>
										{service.features.length} features
									</TableCell>
									<TableCell>
										<div className='flex items-center space-x-2'>
											<Button
												variant='outline'
												size='sm'
												onClick={() =>
													router.push(
														`/services/${service._id}`
													)
												}
											>
												View
											</Button>
											<Button
												variant='outline'
												size='sm'
												onClick={() =>
													router.push(
														`/services/${service._id}/edit`
													)
												}
											>
												Edit
											</Button>
											<Button
												variant='destructive'
												size='sm'
												onClick={() =>
													handleDelete(service._id)
												}
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
