import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';
import { toast } from 'sonner';
import {
	Service,
	Rubric,
	Evaluation,
	Criterion,
} from '@/types';
import { useState } from 'react';

const evaluationSchema = z.object({
	serviceId: z.string().min(1, 'Service is required'),
	rubricId: z.string().min(1, 'Rubric is required'),
	scores: z.array(
		z.object({
			criterionId: z.string(),
			score: z.number().min(0).max(5),
			comments: z.string().optional(),
			evidence: z.string().optional(),
		})
	),
	strengths: z.string().optional(),
	weaknesses: z.string().optional(),
	recommendations: z.string().optional(),
	status: z.enum(['draft', 'in_progress', 'completed']),
});

type EvaluationFormProps = {
	services: Service[];
	rubrics: Rubric[];
	onSubmit: (
		data: z.infer<typeof evaluationSchema>
	) => void;
	initialData?: Evaluation;
};

export function EvaluationForm({
	services,
	rubrics,
	onSubmit,
	initialData,
}: EvaluationFormProps) {
	const [loading, setLoading] = useState(false);
	const form = useForm<z.infer<typeof evaluationSchema>>({
		resolver: zodResolver(evaluationSchema),
		defaultValues: initialData || {
			serviceId: '',
			rubricId: '',
			scores: [],
			strengths: '',
			weaknesses: '',
			recommendations: '',
			status: 'draft',
		},
	});

	const selectedRubric = rubrics.find(
		(r) => r.id === form.watch('rubricId')
	);

	if (loading) {
		return (
			<div className='flex items-center justify-center p-8'>
				<Spinner size='lg' />
			</div>
		);
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='space-y-8'
			>
				<Card>
					<CardHeader>
						<CardTitle>Evaluation Details</CardTitle>
					</CardHeader>
					<CardContent className='space-y-4'>
						<FormField
							control={form.control}
							name='serviceId'
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
													key={service.id}
													value={service.id}
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
							name='rubricId'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Rubric</FormLabel>
									<Select
										onValueChange={field.onChange}
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
													key={rubric.id}
													value={rubric.id}
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
					</CardContent>
				</Card>

				{selectedRubric && (
					<Card>
						<CardHeader>
							<CardTitle>Criteria Scores</CardTitle>
						</CardHeader>
						<CardContent className='space-y-4'>
							{selectedRubric.criteria.map(
								(criterion, index) => (
									<div
										key={criterion.id}
										className='space-y-4'
									>
										<h3 className='font-medium'>
											{criterion.name}
										</h3>
										<div className='grid gap-4'>
											<FormField
												control={form.control}
												name={`scores.${index}.score`}
												render={({ field }) => (
													<FormItem>
														<FormLabel>
															Score (0-5)
														</FormLabel>
														<FormControl>
															<Input
																type='number'
																min={0}
																max={5}
																value={field.value || ''}
																onChange={(e) =>
																	field.onChange(
																		Number(e.target.value)
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
															<Textarea
																value={field.value || ''}
																onChange={field.onChange}
															/>
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
															<Textarea
																value={field.value || ''}
																onChange={field.onChange}
															/>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
										</div>
									</div>
								)
							)}
						</CardContent>
					</Card>
				)}

				<Card>
					<CardHeader>
						<CardTitle>Additional Information</CardTitle>
					</CardHeader>
					<CardContent className='space-y-4'>
						<FormField
							control={form.control}
							name='strengths'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Strengths</FormLabel>
									<FormControl>
										<Textarea
											value={field.value || ''}
											onChange={field.onChange}
										/>
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
										<Textarea
											value={field.value || ''}
											onChange={field.onChange}
										/>
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
										<Textarea
											value={field.value || ''}
											onChange={field.onChange}
										/>
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
											<SelectItem value='in_progress'>
												In Progress
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
					</CardContent>
				</Card>

				<Button
					type='submit'
					className='w-full'
				>
					{initialData
						? 'Update Evaluation'
						: 'Create Evaluation'}
				</Button>
			</form>
		</Form>
	);
}
