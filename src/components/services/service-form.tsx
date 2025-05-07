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
import { Service } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const serviceFormSchema = z.object({
	name: z.string().min(1, 'Name is required'),
	description: z.string().min(1, 'Description is required'),
	type: z.enum(['AI', 'Proposal', 'Hybrid']),
	features: z.array(
		z.object({
			name: z.string().min(1, 'Feature name is required'),
			description: z
				.string()
				.min(1, 'Feature description is required'),
			category: z.string().min(1, 'Category is required'),
		})
	),
	pricing: z.object({
		details: z
			.string()
			.min(1, 'Pricing details are required'),
		model: z.string().min(1, 'Pricing model is required'),
	}),
	integrationCapabilities: z.array(z.string()),
	support: z.object({
		channels: z.array(z.string()),
		sla: z.string().min(1, 'SLA is required'),
		documentation: z
			.string()
			.min(1, 'Documentation is required'),
	}),
});

type ServiceFormValues = z.infer<typeof serviceFormSchema>;

interface ServiceFormProps {
	onSubmit: (data: ServiceFormValues) => void;
	initialData?: Partial<ServiceFormValues>;
}

export function ServiceForm({
	onSubmit,
	initialData,
}: ServiceFormProps) {
	const form = useForm<ServiceFormValues>({
		resolver: zodResolver(serviceFormSchema),
		defaultValues: {
			name: initialData?.name || '',
			description: initialData?.description || '',
			type: initialData?.type || 'AI',
			features: initialData?.features || [],
			pricing: initialData?.pricing || {
				details: '',
				model: '',
			},
			integrationCapabilities:
				initialData?.integrationCapabilities || [],
			support: initialData?.support || {
				channels: [],
				sla: '',
				documentation: '',
			},
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
									placeholder='Enter service name'
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
									placeholder='Enter service description'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='type'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Type</FormLabel>
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
					<h3 className='text-lg font-medium'>Features</h3>
					{form.watch('features').map((_, index) => (
						<div
							key={index}
							className='space-y-4 p-4 border rounded-lg'
						>
							<FormField
								control={form.control}
								name={`features.${index}.name`}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Feature Name</FormLabel>
										<FormControl>
											<Input
												placeholder='Enter feature name'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name={`features.${index}.description`}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Description</FormLabel>
										<FormControl>
											<Textarea
												placeholder='Enter feature description'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name={`features.${index}.category`}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Category</FormLabel>
										<FormControl>
											<Input
												placeholder='Enter category'
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
									const features =
										form.getValues('features');
									features.splice(index, 1);
									form.setValue('features', features);
								}}
							>
								Remove Feature
							</Button>
						</div>
					))}

					<Button
						type='button'
						onClick={() => {
							const features = form.getValues('features');
							form.setValue('features', [
								...features,
								{ name: '', description: '', category: '' },
							]);
						}}
					>
						Add Feature
					</Button>
				</div>

				<div className='space-y-4'>
					<h3 className='text-lg font-medium'>Pricing</h3>
					<FormField
						control={form.control}
						name='pricing.details'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Details</FormLabel>
								<FormControl>
									<Textarea
										placeholder='Enter pricing details'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='pricing.model'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Model</FormLabel>
								<FormControl>
									<Input
										placeholder='Enter pricing model'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<div className='space-y-4'>
					<h3 className='text-lg font-medium'>
						Integration Capabilities
					</h3>
					{form
						.watch('integrationCapabilities')
						.map((_, index) => (
							<div
								key={index}
								className='flex gap-2'
							>
								<FormField
									control={form.control}
									name={`integrationCapabilities.${index}`}
									render={({ field }) => (
										<FormItem className='flex-1'>
											<FormControl>
												<Input
													placeholder='Enter integration capability'
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
										const capabilities = form.getValues(
											'integrationCapabilities'
										);
										capabilities.splice(index, 1);
										form.setValue(
											'integrationCapabilities',
											capabilities
										);
									}}
								>
									Remove
								</Button>
							</div>
						))}

					<Button
						type='button'
						onClick={() => {
							const capabilities = form.getValues(
								'integrationCapabilities'
							);
							form.setValue('integrationCapabilities', [
								...capabilities,
								'',
							]);
						}}
					>
						Add Integration Capability
					</Button>
				</div>

				<div className='space-y-4'>
					<h3 className='text-lg font-medium'>Support</h3>
					<FormField
						control={form.control}
						name='support.channels'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Channels</FormLabel>
								<FormControl>
									<Input
										placeholder='Enter support channels (comma-separated)'
										value={field.value.join(', ')}
										onChange={(e) => {
											const channels = e.target.value
												.split(',')
												.map((channel) => channel.trim())
												.filter(Boolean);
											field.onChange(channels);
										}}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='support.sla'
						render={({ field }) => (
							<FormItem>
								<FormLabel>SLA</FormLabel>
								<FormControl>
									<Input
										placeholder='Enter SLA'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='support.documentation'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Documentation</FormLabel>
								<FormControl>
									<Textarea
										placeholder='Enter documentation details'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<Button type='submit'>Save Service</Button>
			</form>
		</Form>
	);
}
