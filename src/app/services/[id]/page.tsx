'use client';

import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { apiClient } from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/api/config';
import { Service } from '@/lib/types';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function ServiceDetailPage({
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
			<div className='flex items-center justify-between'>
				<div>
					<h1 className='text-3xl font-bold tracking-tight'>
						{service.name}
					</h1>
					<p className='text-muted-foreground'>
						{service.description}
					</p>
				</div>
				<div className='flex items-center space-x-2'>
					<Button
						variant='outline'
						onClick={() =>
							router.push(`/services/${service._id}/edit`)
						}
					>
						Edit Service
					</Button>
					<Button
						variant='outline'
						onClick={() => router.push('/services')}
					>
						Back to Services
					</Button>
				</div>
			</div>

			<div className='grid gap-6 md:grid-cols-2'>
				<Card>
					<CardHeader>
						<CardTitle>Service Details</CardTitle>
						<CardDescription>
							Basic information about the service
						</CardDescription>
					</CardHeader>
					<CardContent className='space-y-4'>
						<div>
							<h3 className='font-medium'>Type</h3>
							<p className='text-muted-foreground'>
								{service.type}
							</p>
						</div>
						<div>
							<h3 className='font-medium'>Pricing</h3>
							<p className='text-muted-foreground'>
								{service.pricing.model}
							</p>
							<p className='text-muted-foreground'>
								{service.pricing.details}
							</p>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Features</CardTitle>
						<CardDescription>
							Key features and capabilities
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className='space-y-4'>
							{service.features.map((feature, index) => (
								<div
									key={index}
									className='border-b pb-4 last:border-0'
								>
									<h3 className='font-medium'>
										{feature.name}
									</h3>
									<p className='text-muted-foreground'>
										{feature.description}
									</p>
									<p className='text-sm text-muted-foreground'>
										Category: {feature.category}
									</p>
								</div>
							))}
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Integration Capabilities</CardTitle>
						<CardDescription>
							Available integration options
						</CardDescription>
					</CardHeader>
					<CardContent>
						<ul className='list-disc list-inside space-y-2'>
							{service.integrationCapabilities.map(
								(capability, index) => (
									<li
										key={index}
										className='text-muted-foreground'
									>
										{capability}
									</li>
								)
							)}
						</ul>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Support</CardTitle>
						<CardDescription>
							Support and documentation details
						</CardDescription>
					</CardHeader>
					<CardContent className='space-y-4'>
						<div>
							<h3 className='font-medium'>
								Support Channels
							</h3>
							<ul className='list-disc list-inside space-y-2'>
								{service.support.channels.map(
									(channel, index) => (
										<li
											key={index}
											className='text-muted-foreground'
										>
											{channel}
										</li>
									)
								)}
							</ul>
						</div>
						<div>
							<h3 className='font-medium'>SLA</h3>
							<p className='text-muted-foreground'>
								{service.support.sla}
							</p>
						</div>
						<div>
							<h3 className='font-medium'>Documentation</h3>
							<p className='text-muted-foreground'>
								{service.support.documentation}
							</p>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
