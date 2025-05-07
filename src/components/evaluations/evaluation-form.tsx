'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { useEffect, useState } from 'react';
import { apiClient } from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/api/config';
import {
	Service,
	Rubric,
	Evaluation,
	Criteria,
} from '@/lib/types';
import { toast } from 'sonner';

const evaluationSchema = z.object({
	service: z.string().min(1, 'Service is required'),
	rubric: z.string().min(1, 'Rubric is required'),
	scores: z.array(
		z.object({
			criteriaId: z.string(),
			score: z.number().min(0).max(5),
			comments: z.string().optional(),
			evidence: z.string().optional(),
		})
	),
	strengths: z.string(),
	weaknesses: z.string(),
	recommendations: z.string(),
	status: z.enum(['draft', 'completed']),
});

type EvaluationFormValues = z.infer<
	typeof evaluationSchema
>;

interface EvaluationFormProps {
	onSubmit: (data: EvaluationFormValues) => void;
	initialData?: Evaluation;
}

export function EvaluationForm({
	onSubmit,
	initialData,
}: EvaluationFormProps) {
	const [services, setServices] = useState<Service[]>([]);
	const [rubrics, setRubrics] = useState<Rubric[]>([]);
	const [selectedRubric, setSelectedRubric] =
		useState<Rubric | null>(null);
	const [loading, setLoading] = useState(true);

	const form = useForm<EvaluationFormValues>({
		resolver: zodResolver(evaluationSchema),
		defaultValues: {
			service: initialData?.service?._id || '',
			rubric: initialData?.rubric?._id || '',
			scores:
				initialData?.scores?.map((score) => ({
					criteriaId: score.criteriaId,
					score: score.score,
					comments: score.comments || '',
					evidence: score.evidence || '',
				})) || [],
			strengths: (initialData?.strengths || []).join('\n'),
			weaknesses: (initialData?.weaknesses || []).join(
				'\n'
			),
			recommendations: (
				initialData?.recommendations || []
			).join('\n'),
			status:
				initialData?.status === 'in_progress'
					? 'draft'
					: (initialData?.status as
							| 'draft'
							| 'completed') || 'draft',
		},
	});

	useEffect(() => {
		const fetchData = async () => {
			try {
				const [servicesRes, rubricsRes] = await Promise.all(
					[
						apiClient.get(API_ENDPOINTS.SERVICES),
						apiClient.get(API_ENDPOINTS.RUBRICS),
					]
				);
				setServices(servicesRes.data);
				setRubrics(rubricsRes.data);

				if (initialData?.rubric?._id) {
					const rubric = rubricsRes.data.find(
						(r: Rubric) => r._id === initialData.rubric._id
					);
					setSelectedRubric(rubric || null);
				}
			} catch (error) {
				console.error('Error fetching data:', error);
				toast.error('Failed to fetch services and rubrics');
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [initialData?.rubric?._id]);

	const handleRubricChange = async (rubricId: string) => {
		try {
			const response = await apiClient.get(
				`${API_ENDPOINTS.RUBRICS}/${rubricId}`
			);
			const rubric = response.data;
			setSelectedRubric(rubric);

			// Initialize scores for each criteria
			const scores = rubric.criteria.map(
				(criterion: Criteria, index: number) => ({
					criteriaId: `${index}`,
					score: 0,
					comments: '',
					evidence: '',
				})
			);

			form.setValue('scores', scores);
		} catch (error) {
			console.error('Error fetching rubric:', error);
			toast.error('Failed to fetch rubric details');
		}
	};

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='space-y-8'
			>
				<FormField
					control={form.control}
					name='service'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Service</FormLabel>
							<Select
								onValueChange={field.onChange}
								defaultValue={field.value}
							>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder='Select a service' />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{services.map((service) => (
										<SelectItem
											key={service._id}
											value={service._id}
										>
											{service.name}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='rubric'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Rubric</FormLabel>
							<Select
								onValueChange={(value) => {
									field.onChange(value);
									handleRubricChange(value);
								}}
								defaultValue={field.value}
							>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder='Select a rubric' />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{rubrics.map((rubric) => (
										<SelectItem
											key={rubric._id}
											value={rubric._id}
										>
											{rubric.name}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>

				{selectedRubric && (
					<div className='space-y-6'>
						<h3 className='text-lg font-medium'>
							Criteria Scores
						</h3>
						{selectedRubric.criteria.map(
							(criterion: Criteria, index) => (
								<div
									key={index}
									className='space-y-4 p-4 border rounded-lg'
								>
									<div>
										<h4 className='font-medium'>
											{criterion.name}
										</h4>
										<p className='text-sm text-muted-foreground'>
											{criterion.description}
										</p>
										<p className='text-sm text-muted-foreground'>
											Weight: {criterion.weight}
										</p>
									</div>

									<FormField
										control={form.control}
										name={`scores.${index}.score`}
										render={({ field }) => (
											<FormItem>
												<FormLabel>Score (0-5)</FormLabel>
												<FormControl>
													<Input
														type='number'
														min={0}
														max={5}
														{...field}
														onChange={(e) =>
															field.onChange(
																parseInt(e.target.value)
															)
														}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name={`scores.${index}.comments`}
										render={({ field }) => (
											<FormItem>
												<FormLabel>Comments</FormLabel>
												<FormControl>
													<Textarea {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name={`scores.${index}.evidence`}
										render={({ field }) => (
											<FormItem>
												<FormLabel>Evidence</FormLabel>
												<FormControl>
													<Textarea {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
							)
						)}
					</div>
				)}

				<FormField
					control={form.control}
					name='strengths'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Strengths</FormLabel>
							<FormControl>
								<Textarea {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='weaknesses'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Weaknesses</FormLabel>
							<FormControl>
								<Textarea {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='recommendations'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Recommendations</FormLabel>
							<FormControl>
								<Textarea {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='status'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Status</FormLabel>
							<Select
								onValueChange={field.onChange}
								defaultValue={field.value}
							>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder='Select status' />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									<SelectItem value='draft'>
										Draft
									</SelectItem>
									<SelectItem value='completed'>
										Completed
									</SelectItem>
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className='flex justify-end space-x-2'>
					<Button type='submit'>Save Evaluation</Button>
				</div>
			</form>
		</Form>
	);
}
