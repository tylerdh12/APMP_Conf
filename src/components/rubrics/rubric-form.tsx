import { zodResolver } from '@hookform/resolvers/zod';
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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Rubric } from '@/lib/types';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const scoringGuideSchema = z.object({
	score: z.number().min(0).max(10),
	description: z.string().min(1, 'Description is required'),
});

const subCriteriaSchema = z.object({
	name: z.string().min(1, 'Name is required'),
	description: z.string().min(1, 'Description is required'),
	scoringGuide: z
		.array(scoringGuideSchema)
		.min(1, 'At least one scoring guide is required'),
});

const criteriaSchema = z.object({
	name: z.string().min(1, 'Name is required'),
	description: z.string().min(1, 'Description is required'),
	weight: z.number().min(0).max(100),
	subCriteria: z
		.array(subCriteriaSchema)
		.min(1, 'At least one sub-criteria is required'),
});

const rubricFormSchema = z.object({
	name: z.string().min(1, 'Name is required'),
	description: z.string().min(1, 'Description is required'),
	serviceType: z.enum(['AI', 'Proposal', 'Hybrid']),
	criteria: z
		.array(criteriaSchema)
		.min(1, 'At least one criteria is required'),
});

type RubricFormValues = z.infer<typeof rubricFormSchema>;

interface RubricFormProps {
	onSubmit: (data: RubricFormValues) => void;
	initialData?: Partial<RubricFormValues>;
}

export function RubricForm({
	onSubmit,
	initialData,
}: RubricFormProps) {
	const form = useForm<RubricFormValues>({
		resolver: zodResolver(rubricFormSchema),
		defaultValues: {
			name: initialData?.name || '',
			description: initialData?.description || '',
			serviceType: initialData?.serviceType || 'AI',
			criteria: initialData?.criteria || [],
		},
	});

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='space-y-8'
			>
				<FormField
					control={form.control}
					name='name'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input
									placeholder='Enter rubric name'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='description'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Description</FormLabel>
							<FormControl>
								<Textarea
									placeholder='Enter rubric description'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='serviceType'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Service Type</FormLabel>
							<Select
								onValueChange={field.onChange}
								defaultValue={field.value}
							>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder='Select service type' />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									<SelectItem value='AI'>AI</SelectItem>
									<SelectItem value='Proposal'>
										Proposal
									</SelectItem>
									<SelectItem value='Hybrid'>
										Hybrid
									</SelectItem>
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className='space-y-4'>
					<h3 className='text-lg font-medium'>Criteria</h3>
					{form
						.watch('criteria')
						.map((_, criteriaIndex) => (
							<div
								key={criteriaIndex}
								className='space-y-4 p-4 border rounded-lg'
							>
								<FormField
									control={form.control}
									name={`criteria.${criteriaIndex}.name`}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Criteria Name</FormLabel>
											<FormControl>
												<Input
													placeholder='Enter criteria name'
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name={`criteria.${criteriaIndex}.description`}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Description</FormLabel>
											<FormControl>
												<Textarea
													placeholder='Enter criteria description'
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name={`criteria.${criteriaIndex}.weight`}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Weight</FormLabel>
											<FormControl>
												<Input
													type='number'
													min={0}
													max={100}
													placeholder='Enter weight (0-100)'
													{...field}
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

								<div className='space-y-4'>
									<h4 className='text-sm font-medium'>
										Sub-Criteria
									</h4>
									{form
										.watch(
											`criteria.${criteriaIndex}.subCriteria`
										)
										.map((_, subCriteriaIndex) => (
											<div
												key={subCriteriaIndex}
												className='space-y-4 p-4 border rounded-lg'
											>
												<FormField
													control={form.control}
													name={`criteria.${criteriaIndex}.subCriteria.${subCriteriaIndex}.name`}
													render={({ field }) => (
														<FormItem>
															<FormLabel>
																Sub-Criteria Name
															</FormLabel>
															<FormControl>
																<Input
																	placeholder='Enter sub-criteria name'
																	{...field}
																/>
															</FormControl>
															<FormMessage />
														</FormItem>
													)}
												/>

												<FormField
													control={form.control}
													name={`criteria.${criteriaIndex}.subCriteria.${subCriteriaIndex}.description`}
													render={({ field }) => (
														<FormItem>
															<FormLabel>
																Description
															</FormLabel>
															<FormControl>
																<Textarea
																	placeholder='Enter sub-criteria description'
																	{...field}
																/>
															</FormControl>
															<FormMessage />
														</FormItem>
													)}
												/>

												<div className='space-y-4'>
													<h5 className='text-sm font-medium'>
														Scoring Guide
													</h5>
													{form
														.watch(
															`criteria.${criteriaIndex}.subCriteria.${subCriteriaIndex}.scoringGuide`
														)
														.map((_, guideIndex) => (
															<div
																key={guideIndex}
																className='space-y-4 p-4 border rounded-lg'
															>
																<FormField
																	control={form.control}
																	name={`criteria.${criteriaIndex}.subCriteria.${subCriteriaIndex}.scoringGuide.${guideIndex}.score`}
																	render={({ field }) => (
																		<FormItem>
																			<FormLabel>
																				Score
																			</FormLabel>
																			<FormControl>
																				<Input
																					type='number'
																					min={0}
																					max={10}
																					placeholder='Enter score (0-10)'
																					{...field}
																					onChange={(e) =>
																						field.onChange(
																							Number(
																								e.target
																									.value
																							)
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
																	name={`criteria.${criteriaIndex}.subCriteria.${subCriteriaIndex}.scoringGuide.${guideIndex}.description`}
																	render={({ field }) => (
																		<FormItem>
																			<FormLabel>
																				Description
																			</FormLabel>
																			<FormControl>
																				<Textarea
																					placeholder='Enter score description'
																					{...field}
																				/>
																			</FormControl>
																			<FormMessage />
																		</FormItem>
																	)}
																/>

																<Button
																	type='button'
																	variant='destructive'
																	onClick={() => {
																		const scoringGuide =
																			form.getValues(
																				`criteria.${criteriaIndex}.subCriteria.${subCriteriaIndex}.scoringGuide`
																			);
																		scoringGuide.splice(
																			guideIndex,
																			1
																		);
																		form.setValue(
																			`criteria.${criteriaIndex}.subCriteria.${subCriteriaIndex}.scoringGuide`,
																			scoringGuide
																		);
																	}}
																>
																	Remove Score
																</Button>
															</div>
														))}

													<Button
														type='button'
														onClick={() => {
															const scoringGuide =
																form.getValues(
																	`criteria.${criteriaIndex}.subCriteria.${subCriteriaIndex}.scoringGuide`
																);
															form.setValue(
																`criteria.${criteriaIndex}.subCriteria.${subCriteriaIndex}.scoringGuide`,
																[
																	...scoringGuide,
																	{
																		score: 0,
																		description: '',
																	},
																]
															);
														}}
													>
														Add Score
													</Button>
												</div>

												<Button
													type='button'
													variant='destructive'
													onClick={() => {
														const subCriteria =
															form.getValues(
																`criteria.${criteriaIndex}.subCriteria`
															);
														subCriteria.splice(
															subCriteriaIndex,
															1
														);
														form.setValue(
															`criteria.${criteriaIndex}.subCriteria`,
															subCriteria
														);
													}}
												>
													Remove Sub-Criteria
												</Button>
											</div>
										))}

									<Button
										type='button'
										onClick={() => {
											const subCriteria = form.getValues(
												`criteria.${criteriaIndex}.subCriteria`
											);
											form.setValue(
												`criteria.${criteriaIndex}.subCriteria`,
												[
													...subCriteria,
													{
														name: '',
														description: '',
														scoringGuide: [
															{ score: 0, description: '' },
														],
													},
												]
											);
										}}
									>
										Add Sub-Criteria
									</Button>
								</div>

								<Button
									type='button'
									variant='destructive'
									onClick={() => {
										const criteria =
											form.getValues('criteria');
										criteria.splice(criteriaIndex, 1);
										form.setValue('criteria', criteria);
									}}
								>
									Remove Criteria
								</Button>
							</div>
						))}

					<Button
						type='button'
						onClick={() => {
							const criteria = form.getValues('criteria');
							form.setValue('criteria', [
								...criteria,
								{
									name: '',
									description: '',
									weight: 0,
									subCriteria: [
										{
											name: '',
											description: '',
											scoringGuide: [
												{ score: 0, description: '' },
											],
										},
									],
								},
							]);
						}}
					>
						Add Criteria
					</Button>
				</div>

				<Button type='submit'>Save Rubric</Button>
			</form>
		</Form>
	);
}
